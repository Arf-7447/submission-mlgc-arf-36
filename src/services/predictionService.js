// predictionService.js
import tf from '@tensorflow/tfjs-node';
import InputError from '../errors/InputError.js';

async function classifyImage(model, imageBuffer) {
  try {
    const tensor = tf.node
      .decodeJpeg(imageBuffer)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const scores = await prediction.data();
    const predictionScore = Math.max(...scores) * 100;
    const result = predictionScore > 50 ? 'Cancer' : 'Non-cancer';
    const suggestion = result === 'Cancer' ? 'Segera periksa ke dokter!' : 'Penyakit kanker tidak terdeteksi.';

    return { predictionScore, result, suggestion };
  } catch (error) {
    throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
  }
}

export { classifyImage };
