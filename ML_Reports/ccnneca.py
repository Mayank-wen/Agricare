    import tensorflow as tf
    import matplotlib.pyplot as plt
    import numpy as np
    import math
    from tensorflow.keras.models import Model
    from tensorflow.keras.layers import (Input, Conv2D, MaxPooling2D, Dense, Dropout,
                                        BatchNormalization, LeakyReLU, GlobalAveragePooling2D,
                                        Reshape, multiply, Conv1D)
    from tensorflow.keras.optimizers import Adam
    from tensorflow.keras.preprocessing.image import ImageDataGenerator
    from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
    from sklearn.metrics import classification_report, confusion_matrix
    import seaborn as sns

    # ========================
    # ECA Attention Block
    # ========================
    def eca_block(input_feature, gamma=2, b=1):
        channels = input_feature.shape[-1]
        t = int(abs((math.log(channels, 2) + b) / gamma))
        k = t if t % 2 else t + 1

        avg_pool = GlobalAveragePooling2D()(input_feature)
        avg_pool = Reshape((channels, 1))(avg_pool)

        conv1d = Conv1D(1, kernel_size=k, padding='same', activation='sigmoid')(avg_pool)
        conv1d = Reshape((1, 1, channels))(conv1d)

        return multiply([input_feature, conv1d])

    # ========================
    # Custom CNN with ECA
    # ========================
    def build_custom_cnn_with_eca(input_shape=(160, 160, 3), num_classes=33):
        inputs = Input(shape=input_shape)
        x = inputs

        for filters, drop_rate in zip([32, 64, 128, 256, 256], [0.25, 0.3, 0.4, 0.4, 0.5]):
            x = Conv2D(filters, (3, 3), padding='same')(x)
            x = BatchNormalization()(x)
            x = LeakyReLU()(x)
            x = eca_block(x)
            x = MaxPooling2D()(x)
            x = Dropout(drop_rate)(x)

        x = GlobalAveragePooling2D()(x)
        x = Dense(512)(x)
        x = BatchNormalization()(x)
        x = LeakyReLU()(x)
        x = Dropout(0.5)(x)
        outputs = Dense(num_classes, activation='softmax')(x)

        return Model(inputs, outputs)

    IMG_SIZE = (160, 160)
    BATCH_SIZE = 16
    NUM_CLASSES = 33
    EPOCHS = 50
    TRAIN_DIR = 'train'  # folder structure: train/class_x/...
    MODEL_PATH = 'best_model_eca.keras'

    train_datagen = ImageDataGenerator(
        rescale=1./255,
        rotation_range=20,
        zoom_range=0.2,
        horizontal_flip=True,
        vertical_flip=True,
        brightness_range=[0.8, 1.2],
        validation_split=0.2
    )

    train_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=True,
        subset='training'
    )

    val_generator = train_datagen.flow_from_directory(
        TRAIN_DIR,
        target_size=IMG_SIZE,
        batch_size=BATCH_SIZE,
        class_mode='categorical',
        shuffle=False,
        subset='validation'
    )

    model = build_custom_cnn_with_eca(input_shape=(160, 160, 3), num_classes=NUM_CLASSES)
    model.compile(optimizer=Adam(learning_rate=1e-4), loss='categorical_crossentropy', metrics=['accuracy'])

    callbacks = [
        EarlyStopping(patience=5, restore_best_weights=True, monitor='val_loss'),
        ModelCheckpoint(MODEL_PATH, monitor='val_accuracy', save_best_only=True)
    ]

    history = model.fit(
        train_generator,
        validation_data=val_generator,
        epochs=EPOCHS,
        callbacks=callbacks
    )

    model.save('final_model_eca.keras')

    # ========================
    # Plot Training Curves
    # ========================
    plt.figure(figsize=(12, 5))

    plt.subplot(1, 2, 1)
    plt.plot(history.history['accuracy'], label='Train Acc')
    plt.plot(history.history['val_accuracy'], label='Val Acc')
    plt.title('Model Accuracy')
    plt.xlabel('Epoch')
    plt.ylabel('Accuracy')
    plt.legend()

    plt.subplot(1, 2, 2)
    plt.plot(history.history['loss'], label='Train Loss')
    plt.plot(history.history['val_loss'], label='Val Loss')
    plt.title('Model Loss')
    plt.xlabel('Epoch')
    plt.ylabel('Loss')
    plt.legend()

    plt.tight_layout()
    plt.show()

    # ========================
    # Class-wise Predictions
    # ========================
    # Predict on validation data
    val_generator.reset()
    preds = model.predict(val_generator, verbose=1)
    y_pred = np.argmax(preds, axis=1)
    y_true = val_generator.classes
    class_labels = list(val_generator.class_indices.keys())

    # Classification Report
    print(classification_report(y_true, y_pred, target_names=class_labels))

    # Confusion Matrix Heatmap
    cm = confusion_matrix(y_true, y_pred)
    plt.figure(figsize=(12, 10))
    sns.heatmap(cm, annot=False, cmap='Blues', xticklabels=class_labels, yticklabels=class_labels)
    plt.title('Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('Actual')
    plt.xticks(rotation=90)
    plt.yticks(rotation=0)
    plt.tight_layout()
    plt.show()

    # Class-wise prediction count
    pred_counts = np.bincount(y_pred, minlength=NUM_CLASSES)

    plt.figure(figsize=(12, 5))
    plt.bar(range(NUM_CLASSES), pred_counts, tick_label=class_labels)
    plt.title('Class-wise Prediction Counts')
    plt.xticks(rotation=90)
    plt.ylabel('Prediction Count')
    plt.tight_layout()
    plt.show()  