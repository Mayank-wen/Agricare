import tensorflowjs as tfjs
from tensorflow.keras.models import load_model

# Load Keras model
model = load_model("mobilenetv2_eca_model_final.keras")

# Convert and save
tfjs.converters.save_keras_model(model, "tfjs_model")
