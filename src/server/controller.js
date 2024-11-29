import { classifyImage } from '../services/predictionService.js';
import { savePrediction, getPredictionHistory } from '../services/dataService.js';
import crypto from 'crypto';

async function handlePrediction(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { predictionScore, result, suggestion } = await classifyImage(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id,
    result,
    suggestion,
    // predictionScore, not used
    createdAt,
  };

  await savePrediction(id, data);
  return h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data,
  }).code(201);
}

async function getPredictionHistoryHandler(request, h) {
  const history = await getPredictionHistory();
  return h.response({
    status: 'success',
    data: history,
  }).code(200);
}

export default { handlePrediction, getPredictionHistory: getPredictionHistoryHandler };
