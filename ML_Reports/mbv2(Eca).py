import tensorflow as tf
import matplotlib.pyplot as plt
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D, Dropout, BatchNormalization, Conv2D, ReLU, Multiply, Reshape, Conv1D, Activation
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam
import numpy as np
import os

# --- ECA Module ---
class ECALayer(tf.keras.layers.Layer):
    def __init__(self, gamma=2, b=1, **kwargs):
        super(ECALayer, self).__init__(**kwargs)
        self.gamma = gamma
        self.b = b

    def build(self, input_shape):
        channels = input_shape[-1]
        t = int(abs((np.log2(channels) + self.b) / self.gamma))
        k = t if t % 2 else t + 1
        self.global_avg_pool = GlobalAveragePooling2D()
        self.reshape = Reshape((channels, 1))
        self.conv1d = Conv1D(1, kernel_size=k, padding='same', use_bias=False)
        self.activation = Activation('sigmoid')
        self.multiply = Multiply()

    def call(self, inputs):
        x = self.global_avg_pool(inputs)
        x = self.reshape(x)
        x = self.conv1d(x)
        x = self.activation(x)
        x = tf.reshape(x, [-1, 1, 1, x.shape[1]])
        return self.multiply([inputs, x])

# --- Paths and Hyperparameters ---
data_dir = "train"  # Use only the train directory
img_size = (224, 224)
batch_size = 16
initial_epochs = 20
fine_tune_epochs = 10
validation_split = 0.2

# --- Data Generators with Split ---
train_datagen = ImageDataGenerator(
    rescale=1./255,
    rotation_range=30,
    zoom_range=0.3,
    width_shift_range=0.1,
    height_shift_range=0.1,
    horizontal_flip=True,
    brightness_range=[0.8, 1.2],
    validation_split=validation_split
)

train_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    shuffle=True
)

val_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='validation',
    shuffle=False
)

# --- Model Definition ---
base_model = MobileNetV2(input_shape=img_size + (3,), include_top=False, weights='imagenet')
base_model.trainable = False

x = base_model.output
x = Conv2D(256, (3, 3), padding='same')(x)
x = BatchNormalization()(x)
x = ReLU()(x)
x = ECALayer()(x)
x = GlobalAveragePooling2D()(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)
x = Dense(256, activation='relu')(x)
x = BatchNormalization()(x)
x = Dropout(0.3)(x)
predictions = Dense(train_generator.num_classes, activation='softmax')(x)

model = Model(inputs=base_model.input, outputs=predictions)

# --- Callbacks ---
earlystop_cb = tf.keras.callbacks.EarlyStopping(patience=5, restore_best_weights=True)
lr_schedule_cb = tf.keras.callbacks.ReduceLROnPlateau(monitor='loss', factor=0.5, patience=2, verbose=1, min_lr=1e-6)
checkpoint_cb = tf.keras.callbacks.ModelCheckpoint("best_mobilenetv2_eca_model.keras", save_best_only=True, monitor='val_loss')

# --- Compile for Initial Training ---
model.compile(
    optimizer=Adam(learning_rate=1e-4),
    loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
    metrics=['accuracy']
)


history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=initial_epochs,
    callbacks=[earlystop_cb, lr_schedule_cb, checkpoint_cb]
)

# --- Fine-Tune ---
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=Adam(learning_rate=1e-5),
    loss=tf.keras.losses.CategoricalCrossentropy(label_smoothing=0.1),
    metrics=['accuracy']
)

fine_tune_history = model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=fine_tune_epochs,
    callbacks=[earlystop_cb, lr_schedule_cb, checkpoint_cb]
)

# --- Save Final Model ---
model.save("mobilenetv2_eca_model_final.keras")
print("✅ Final model saved as 'mobilenetv2_eca_model_final.keras'")

# --- Combine Training History ---
def merge_histories(h1, h2):
    return {
        'accuracy': h1.history['accuracy'] + h2.history['accuracy'],
        'val_accuracy': h1.history['val_accuracy'] + h2.history['val_accuracy'],
        'loss': h1.history['loss'] + h2.history['loss'],
        'val_loss': h1.history['val_loss'] + h2.history['val_loss'],
    }

full_history = merge_histories(history, fine_tune_history)

# --- Plot Accuracy and Loss ---
plt.figure(figsize=(14, 5))

plt.subplot(1, 2, 1)
plt.plot(full_history['accuracy'], label='Train Acc')
plt.plot(full_history['val_accuracy'], label='Val Acc')
plt.title('Model Accuracy Over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Accuracy')
plt.legend()
plt.grid(True)

plt.subplot(1, 2, 2)
plt.plot(full_history['loss'], label='Train Loss')
plt.plot(full_history['val_loss'], label='Val Loss')
plt.title('Model Loss Over Epochs')
plt.xlabel('Epoch')
plt.ylabel('Loss')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.savefig("training_curves_eca.png")
plt.show()

# --- Predictions on Validation Set ---
val_generator.reset()
pred_probs = model.predict(val_generator, verbose=1)
pred_classes = np.argmax(pred_probs, axis=1)

class_labels = list(val_generator.class_indices.keys())
plt.figure(figsize=(10, 5))
plt.hist(pred_classes, bins=np.arange(len(class_labels) + 1) - 0.5, rwidth=0.8, edgecolor='black')
plt.xticks(ticks=np.arange(len(class_labels)), labels=class_labels, rotation=90)
plt.title("Predicted Class Distribution on Validation Set")
plt.xlabel("Class")
plt.ylabel("Frequency")
plt.grid(True)
plt.tight_layout()
plt.savefig("predicted_class_distribution_eca.png")
plt.show()
class_indices = train_generator.class_indices
class_names = list(class_indices.keys())
print("\nClass Names and their Indices:")
for class_name, index in class_indices.items():
    print(f"Class {index}: {class_name}") 