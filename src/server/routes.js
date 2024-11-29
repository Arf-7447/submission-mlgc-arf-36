//  routes.js
import controller from './controller.js';

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: controller.handlePrediction,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
      },
    },
  },
  {
    path: '/predict/histories',
    method: 'GET',
    handler: controller.getPredictionHistory,
  },
];

export default routes;
