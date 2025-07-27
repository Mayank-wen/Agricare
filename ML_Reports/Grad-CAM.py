import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt
import cv2
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import load_model
from tensorflow.keras.layers import Layer, GlobalAveragePooling2D, Reshape, Conv1D, Activation, Multiply

# --- ECA Layer (must be defined for custom model loading) ---
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

# --- Load the trained model with ECA ---
with tf.keras.utils.custom_object_scope({'ECALayer': ECALayer}):
    model = load_model("final_model_eca.keras")

# --- Preprocessing function ---
def preprocess_image(img_path, target_size=(224, 224)):
    img = image.load_img(img_path, target_size=target_size)
    img_array = image.img_to_array(img) / 255.0
    return np.expand_dims(img_array, axis=0), img

# --- Grad-CAM heatmap generation ---
def make_gradcam_heatmap(img_array, model, last_conv_layer_name="Conv_1", pred_index=None):
    grad_model = tf.keras.models.Model(
        [model.inputs], [model.get_layer(last_conv_layer_name).output, model.output]
    )
    with tf.GradientTape() as tape:
        conv_outputs, predictions = grad_model(img_array)
        if pred_index is None:
            pred_index = tf.argmax(predictions[0])
        class_channel = predictions[:, pred_index]
    grads = tape.gradient(class_channel, conv_outputs)
    pooled_grads = tf.reduce_mean(grads, axis=(0, 1, 2))
    conv_outputs = conv_outputs[0]
    heatmap = conv_outputs @ pooled_grads[..., tf.newaxis]
    heatmap = tf.squeeze(heatmap)
    heatmap = tf.maximum(heatmap, 0) / tf.math.reduce_max(heatmap + tf.keras.backend.epsilon())
    return heatmap.numpy()

# --- Overlay heatmap on image ---
def display_gradcam(img_path, model, last_conv_layer_name="Conv_1", alpha=0.4):
    img_array, original_img = preprocess_image(img_path)
    heatmap = make_gradcam_heatmap(img_array, model, last_conv_layer_name)

    heatmap = cv2.resize(heatmap, (original_img.size[0], original_img.size[1]))
    heatmap = np.uint8(255 * heatmap)
    heatmap_color = cv2.applyColorMap(heatmap, cv2.COLORMAP_JET)

    superimposed_img = heatmap_color * alpha + np.array(original_img)
    superimposed_img = np.uint8(superimposed_img)

    # Display
    plt.figure(figsize=(8, 4))
    plt.subplot(1, 2, 1)
    plt.title("Original Image")
    plt.imshow(original_img)
    plt.axis("off")

    plt.subplot(1, 2, 2)
    plt.title("Grad-CAM")
    plt.imshow(superimposed_img)
    plt.axis("off")

    plt.tight_layout()
    plt.show()

# --- Example Usage ---
display_gradcam("train/Apple Black rot/AppleBlackRot(4).JPG", model, last_conv_layer_name="Conv_1")
