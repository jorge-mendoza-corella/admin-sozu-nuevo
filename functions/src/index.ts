import { defineEventHandler, readBody } from 'h3';  // Mantén el uso de 'h3'
import { createNuxt } from 'nuxt3';  // Usa el paquete correcto para crear la app Nuxt

// Crea la instancia de Nuxt
export const nuxtApp = defineEventHandler(async (event) => {
    const nuxt = await createNuxt({
        rootDir: './',  // Ruta a tu app Nuxt
        dev: false  // Modo de producción
    });

    // Renderiza la ruta solicitada
    const response = await nuxt.renderRoute(event.req.url, {
        req: event.req,
        res: event.res
    });

    event.res.statusCode = response.statusCode;
    event.res.end(response.html);
});
