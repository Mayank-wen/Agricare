const tf = require("@tensorflow/tfjs-node");

const path = require("path");
const jimp = require("jimp");

// Custom ECA Layer definition
class ECALayer extends tf.layers.Layer {
  constructor(config) {
    super(config);
    this.gamma = config.gamma || 2;
    this.b = config.b || 1;
  }

  build(inputShape) {
    const channels = inputShape[inputShape.length - 1];
    const t = Math.floor(Math.abs((Math.log2(channels) + this.b) / this.gamma));
    this.k = t % 2 === 0 ? t + 1 : t;

    this.globalAvgPool = tf.layers.globalAveragePooling2d({
      dataFormat: "channelsLast",
    });

    this.conv1d = tf.layers.conv1d({
      filters: 1,
      kernelSize: this.k,
      padding: "same",
      useBias: false,
      activation: "sigmoid",
      kernelInitializer: "glorotUniform",
    });

    this.built = true;
    super.build(inputShape);
  }

  call(inputs) {
    return tf.tidy(() => {
      // Handle inputs being array or tensor
      const inputTensor = Array.isArray(inputs) ? inputs[0] : inputs;

      // Log shape for debugging
      console.log("ECA layer input shape:", inputTensor.shape);

      // Validate shape after ensuring tensor
      if (
        !(inputTensor instanceof tf.Tensor) ||
        inputTensor.shape.length !== 4
      ) {
        throw new Error(`Invalid input tensor shape: ${inputTensor.shape}`);
      }

      // Extract dimensions safely
      const [batch, height, width, channels] = inputTensor.shape;

      // Global average pooling
      let x = this.globalAvgPool.apply(inputTensor);
      console.log("After GAP shape:", x.shape);

      // Reshape for conv1d
      x = tf.reshape(x, [batch, channels, 1]);
      console.log("Before conv1d shape:", x.shape);

      // Apply 1D convolution
      x = this.conv1d.apply(x);
      console.log("After conv1d shape:", x.shape);

      // Reshape for multiplication
      x = tf.reshape(x, [batch, 1, 1, channels]);
      console.log("Before multiplication shape:", x.shape);

      // Element-wise multiply
      return tf.mul(inputTensor, x);
    });
  }

  computeOutputShape(inputShape) {
    return inputShape;
  }

  getConfig() {
    const config = super.getConfig();
    Object.assign(config, {
      gamma: this.gamma,
      b: this.b,
    });
    return config;
  }

  static get className() {
    return "ECALayer";
  }
}

// Register the custom layer
tf.serialization.registerClass(ECALayer);

// Update MODEL_PATH to point to converted model
const MODEL_PATH = path.join(__dirname, "model.json");

const diseaseMap = {
  0: {
    name: "Apple Black rot",
    treatment:
      "1. Prune and destroy infected branches\n2. Apply appropriate fungicide\n3. Avoid overhead irrigation\n4. Keep tree well pruned for airflow\n5. Remove fallen fruit and debris",
  },
  1: {
    name: "Apple Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  2: {
    name: "Apple Scab",
    treatment:
      "1. Apply fungicide during early growing season\n2. Remove fallen leaves\n3. Use resistant varieties\n4. Prune for air circulation\n5. Avoid wetting foliage",
  },
  3: {
    name: "Bell pepper Bacterial spot",
    treatment:
      "1. Remove infected plants\n2. Use copper-based sprays\n3. Avoid working in wet fields\n4. Use disease-free seeds\n5. Rotate crops annually",
  },
  4: {
    name: "Bell pepper Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  5: {
    name: "Cedar apple rust",
    treatment:
      "1. Remove galls from cedar trees\n2. Apply fungicides to apple trees\n3. Plant resistant varieties\n4. Increase air circulation\n5. Avoid planting near cedar trees",
  },
  6: {
    name: "Citrus Black spot",
    treatment:
      "1. Remove infected fruit\n2. Apply protective fungicides\n3. Ensure proper drainage\n4. Use resistant varieties\n5. Prune for airflow",
  },
  7: {
    name: "Citrus Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  8: {
    name: "Citrus canker",
    treatment:
      "1. Remove and destroy infected plant parts\n2. Use copper-based bactericides\n3. Disinfect tools\n4. Control leaf miners\n5. Avoid overhead watering",
  },
  9: {
    name: "Citrus greening",
    treatment:
      "1. Remove and destroy infected trees\n2. Control psyllid insects\n3. Use disease-free nursery stock\n4. Monitor regularly\n5. Implement area-wide management",
  },
  10: {
    name: "Corn Common rust",
    treatment:
      "1. Use resistant varieties\n2. Apply fungicides if needed\n3. Rotate crops\n4. Monitor early signs\n5. Maintain healthy soil",
  },
  11: {
    name: "Corn Gray leaf spot",
    treatment:
      "1. Apply fungicides preventively\n2. Rotate crops\n3. Use resistant hybrids\n4. Avoid excessive irrigation\n5. Remove crop debris",
  },
  12: {
    name: "Corn Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  13: {
    name: "Corn Northern Leaf Blight",
    treatment:
      "1. Use resistant varieties\n2. Apply fungicides at early stage\n3. Rotate crops\n4. Remove infected residues\n5. Maintain spacing",
  },
  14: {
    name: "Grape Black Measles",
    treatment:
      "1. Remove symptomatic canes\n2. Avoid overhead irrigation\n3. Apply fungicides\n4. Maintain proper pruning\n5. Improve soil drainage",
  },
  15: {
    name: "Grape Black rot",
    treatment:
      "1. Remove infected mummies\n2. Apply fungicides during early bloom\n3. Prune to increase airflow\n4. Avoid wet foliage\n5. Clean fallen debris",
  },
  16: {
    name: "Grape Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  17: {
    name: "Grape Isariopsis Leaf Spot",
    treatment:
      "1. Prune infected leaves\n2. Apply fungicides\n3. Improve ventilation\n4. Avoid excessive nitrogen\n5. Monitor disease progression",
  },
  18: {
    name: "Peach Bacterial spot",
    treatment:
      "1. Remove infected twigs and fruit\n2. Apply copper-based sprays\n3. Use resistant varieties\n4. Avoid overhead irrigation\n5. Prune for airflow",
  },
  19: {
    name: "Peach Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  20: {
    name: "Potato Early blight",
    treatment:
      "1. Remove infected leaves\n2. Apply copper fungicides\n3. Practice crop rotation\n4. Ensure good drainage\n5. Space plants adequately",
  },
  21: {
    name: "Potato Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  22: {
    name: "Potato Late blight",
    treatment:
      "1. Remove and destroy infected plants\n2. Apply systemic fungicides\n3. Avoid overhead watering\n4. Improve air circulation\n5. Rotate crops",
  },
  23: {
    name: "Tomato Bacterial spot",
    treatment:
      "1. Remove infected leaves\n2. Use copper sprays\n3. Avoid working in wet plants\n4. Use certified seeds\n5. Rotate crops",
  },
  24: {
    name: "Tomato Early blight",
    treatment:
      "1. Prune affected leaves\n2. Apply fungicides\n3. Avoid wetting leaves\n4. Rotate crops\n5. Ensure proper spacing",
  },
  25: {
    name: "Tomato Healthy",
    treatment: "The plant appears healthy. Continue regular maintenance.",
  },
  26: {
    name: "Tomato Late blight",
    treatment:
      "1. Remove and destroy infected plants\n2. Apply protective fungicides\n3. Avoid overhead irrigation\n4. Improve drainage\n5. Grow resistant varieties",
  },
  27: {
    name: "Tomato Leaf Mold",
    treatment:
      "1. Remove infected foliage\n2. Increase air circulation\n3. Apply sulfur-based fungicide\n4. Avoid leaf wetness\n5. Space plants well",
  },
  28: {
    name: "Tomato Mosaic virus",
    treatment:
      "1. Remove infected plants\n2. Disinfect tools regularly\n3. Avoid tobacco products\n4. Control insect vectors\n5. Use resistant seeds",
  },
  29: {
    name: "Tomato Septoria leaf spot",
    treatment:
      "1. Prune infected leaves\n2. Apply fungicides\n3. Avoid overhead watering\n4. Rotate crops annually\n5. Mulch to prevent soil splash",
  },
  30: {
    name: "Tomato Spider mites",
    treatment:
      "1. Spray with miticides or insecticidal soap\n2. Increase humidity\n3. Prune heavily infested leaves\n4. Introduce natural predators\n5. Water adequately",
  },
  31: {
    name: "Tomato Target Spot",
    treatment:
      "1. Apply appropriate fungicide\n2. Improve air circulation\n3. Remove infected foliage\n4. Avoid excessive watering\n5. Monitor regularly",
  },
  32: {
    name: "Tomato Yellow Leaf Curl Virus",
    treatment:
      "1. Remove infected plants\n2. Control whiteflies\n3. Use reflective mulches\n4. Plant resistant varieties\n5. Avoid planting near infected crops",
  },
};

class ModelService {
  constructor() {
    this.model = null;
  }

  async loadModel() {
    try {
      console.log("Loading model from:", MODEL_PATH);
      this.model = await tf.loadLayersModel(`file://${MODEL_PATH}`, {
        strict: false,
        customObjects: { ECALayer: ECALayer },
      });
      console.log("Model loaded successfully");
      return true;
    } catch (error) {
      console.error("Error loading model:", error);
      throw new Error(`Failed to load model: ${error.message}`);
    }
  }

  async preprocessImage(imageBuffer) {
    try {
      if (!imageBuffer) {
        throw new Error("No image buffer provided");
      }

      console.log("Starting image preprocessing...");
      console.log("Image buffer size:", imageBuffer.length);

      // Read image
      const image = await jimp.read(imageBuffer);
      console.log(
        "Original dimensions:",
        image.bitmap.width,
        "x",
        image.bitmap.height
      );

      // Resize
      image.resize(224, 224);
      console.log(
        "Resized dimensions:",
        image.bitmap.width,
        "x",
        image.bitmap.height
      );

      // Convert to tensor array
      const imageData = new Float32Array(224 * 224 * 3);
      let idx = 0;

      // Scan pixels
      for (let y = 0; y < image.bitmap.height; y++) {
        for (let x = 0; x < image.bitmap.width; x++) {
          const pixel = jimp.intToRGBA(image.getPixelColor(x, y));
          imageData[idx++] = pixel.r / 255.0;
          imageData[idx++] = pixel.g / 255.0;
          imageData[idx++] = pixel.b / 255.0;
        }
      }

      // Create and reshape tensor
      const tensor = tf.tensor4d(imageData, [1, 224, 224, 3]);
      console.log("Tensor shape:", tensor.shape);

      // Ensure correct shape
      const reshapedTensor = tensor.reshape([1, 224, 224, 3]);
      console.log("Reshaped tensor:", reshapedTensor.shape);

      return reshapedTensor;
    } catch (error) {
      console.error("Error in preprocessing:", error);
      throw new Error(`Failed to preprocess image: ${error.message}`);
    }
  }

  async predict(imageBuffer) {
    try {
      console.log("Starting prediction process...");

      if (!this.model) {
        await this.loadModel();
      }

      // Process image using tf.node utilities
      let imgTensor = tf.node.decodeImage(imageBuffer, 3);
      imgTensor = tf.image.resizeBilinear(imgTensor, [224, 224]);
      imgTensor = imgTensor.div(255.0);

      // Add batch dimension if missing
      if (imgTensor.shape.length === 3) {
        imgTensor = imgTensor.expandDims(0); // shape: [1, 224, 224, 3]
      }

      console.log("Input tensor shape before prediction:", imgTensor.shape);

      // Use tf.tidy for better memory management
      const result = tf.tidy(() => {
        const prediction = this.model.predict(imgTensor);
        const results = Array.from(prediction.dataSync());
        const predictedClass = results.indexOf(Math.max(...results));
        const confidence = Math.max(...results);

        return {
          predictedClass,
          confidence,
          results,
        };
      });

      // Clean up tensors
      tf.dispose(imgTensor);

      if (!diseaseMap[result.predictedClass]) {
        throw new Error(`Invalid prediction class: ${result.predictedClass}`);
      }

      // Return prediction result
      return {
        disease: diseaseMap[result.predictedClass].name,
        confidence: result.confidence.toFixed(4),
        treatment: diseaseMap[result.predictedClass].treatment,
      };
    } catch (error) {
      console.error("Error in prediction:", error);
      throw new Error(`Failed to process image: ${error.message}`);
    }
  }
}

// Add error handler
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise);
  console.error("Reason:", reason);
});

module.exports = new ModelService();
