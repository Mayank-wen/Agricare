 import pandas as pd
  import numpy as np
  import time
  import threading
  from sklearn.model_selection import train_test_split, StratifiedKFold, RandomizedSearchCV
  from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
  from sklearn.preprocessing import StandardScaler, LabelEncoder
  from imblearn.over_sampling import SMOTE
  from xgboost import XGBClassifier, plot_importance
  import matplotlib.pyplot as plt
  import seaborn as sns

  # === Helper: Logging and Spinner ===
  def log(msg):
      print(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg}")

  def spinner(msg="Processing"):
      import itertools, sys
      stop_flag = {"run": True}
      def animate():
          for c in itertools.cycle('|/-\\'):
              if not stop_flag["run"]:
                  break
              print(f'\r{msg} {c}', end='', flush=True)
              time.sleep(0.1)
          print('\r', end='', flush=True)
      t = threading.Thread(target=animate)
      t.start()
      return lambda: stop_flag.update({"run": False})

  # === Load dataset ===
  try:
      from google.colab import files
      uploaded = files.upload()
      import io
      df = pd.read_csv(io.BytesIO(uploaded[next(iter(uploaded))]))
  except ImportError:
      df = pd.read_csv("/mnt/data/merged_crop_recommendation.csv")

  log("Dataset loaded successfully.")

  # Features and target
  X = df.drop('label', axis=1)
  y = df['label']

  # Encode target classes
  le = LabelEncoder()
  y_encoded = le.fit_transform(y)

  log("Target encoding completed.")

  # Normalize features
  scaler = StandardScaler()
  X_scaled = scaler.fit_transform(X)
  log("Feature scaling completed.")

  # SMOTE to balance classes
  log("Starting SMOTE...")
  smote = SMOTE(random_state=42)
  X_resampled, y_resampled = smote.fit_resample(X_scaled, y_encoded)
  log("SMOTE completed.")

  # Split data
  log("Splitting data...")
  X_train, X_test, y_train, y_test = train_test_split(
      X_resampled, y_resampled, test_size=0.2, stratify=y_resampled, random_state=42
  )
  log("Data split completed.")

  # XGBoost Classifier (GPU-enabled)
  xgb = XGBClassifier(
      objective='multi:softmax',
      num_class=len(np.unique(y_encoded)),
      eval_metric='mlogloss',
      use_label_encoder=False,
      tree_method='gpu_hist',
      predictor='gpu_predictor',
      random_state=42
  )

  # Smaller Hyperparameter grid
  params = {
      'n_estimators': [50, 100, 150],
      'max_depth': [4, 6, 8],
      'learning_rate': [0.05, 0.1, 0.2],
      'subsample': [0.8, 1],
      'colsample_bytree': [0.8, 1],
      'gamma': [0, 0.1],
      'reg_alpha': [0, 0.01],
      'reg_lambda': [1, 1.5]
  }

  # Stratified K-Folds
  skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

  # Randomized Search
  random_search = RandomizedSearchCV(
      estimator=xgb,
      param_distributions=params,
      n_iter=30,  # Only 30 random combinations
      cv=skf,
      n_jobs=-1,
      verbose=10,
      random_state=42
  )

  # Fit model with timer and spinner
  log("Starting RandomizedSearchCV fitting...")
  start_time = time.time()
  stop_spinner = spinner("RandomizedSearchCV running")
  random_search.fit(X_train, y_train)
  stop_spinner()
  end_time = time.time()
  log(f"RandomizedSearchCV completed in {(end_time - start_time)/60:.2f} minutes.")

  # Predict
  log("Predicting on test set...")
  y_pred = random_search.predict(X_test)

  # Evaluation
  log("Evaluation Results:")
  print("Best Parameters:", random_search.best_params_)
  print("Test Accuracy:", accuracy_score(y_test, y_pred))
  print("\nClassification Report:\n", classification_report(y_test, y_pred, target_names=le.classes_))

  # Confusion Matrix
  cm = confusion_matrix(y_test, y_pred)
  plt.figure(figsize=(14, 10))
  sns.heatmap(cm, xticklabels=le.classes_, yticklabels=le.classes_, annot=True, fmt='d', cmap='Blues')
  plt.title('Confusion Matrix')
  plt.xlabel('Predicted')
  plt.ylabel('Actual')
  plt.xticks(rotation=90)
  plt.yticks(rotation=0)
  plt.tight_layout()
  plt.show()

  # Feature Importance
  plt.figure(figsize=(10, 8))
  plot_importance(random_search.best_estimator_, importance_type='gain', max_num_features=10)
  plt.title('Top 10 Important Features')
  plt.tight_layout()
  plt.show()

  # Save Model
  try:
      model_save_path = '/content/drive/MyDrive/xgb_crop_recommendation_model.json'
      random_search.best_estimator_.save_model(model_save_path)
      log(f"Model saved to Google Drive at: {model_save_path}")
  except ImportError:
      model_save_path = 'xgb_crop_recommendation_model.json'
      random_search.best_estimator_.save_model(model_save_path)
      log(f"Model saved locally at: {model_save_path}")
