import * as functions from 'firebase-functions';
import { Nuxt } from 'nuxt';
import * as admin from 'firebase-admin';

// Inicializa Firebase Admin
admin.initializeApp();

const config = {
  dev: false, // Para producción
  buildDir: 'nuxt-dist', // Directorio de salida de la compilación Nuxt.js
};

// Inicia Nuxt.js
const nuxt = new Nuxt(config);

export const ssr = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});
