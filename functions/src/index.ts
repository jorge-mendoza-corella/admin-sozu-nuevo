const functions = require('firebase-functions');
const { Nuxt } = require('nuxt');
const admin = require('firebase-admin');

// Inicializa Firebase Admin
admin.initializeApp();

const config = {
  dev: false,  // Para producción
  buildDir: 'nuxt-dist'  // Directorio de salida de la compilación Nuxt.js
};

// Inicia Nuxt.js
const nuxt = new Nuxt(config);

exports.ssr = functions.https.onRequest(async (req, res) => {
  await nuxt.ready();
  nuxt.render(req, res);
});
