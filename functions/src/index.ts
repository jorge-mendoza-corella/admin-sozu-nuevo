import { onRequest } from 'firebase-functions/v2/https';

// Define tu función de Firebase
export const api = onRequest((req, res) => {
  res.send({ message: 'Hello from Firebase and Nuxt with Nitro!' });
});
