# AutoParts Pro

Prototipo de un catálogo interactivo de repuestos de coches. Elige el modelo y el sistema, selecciona una pieza desde el esquema o la lista y pulsa **+ Cotizar** para guardar la cotización.

Incluye Citroën C3, Dacia Sandero y Renault Clio, con piezas de motor, frenos ABS, suspensión delantera y transmisión. Las fichas de los coches, las especificaciones de los repuestos y los precios en euros son de ejemplo. Verifica la compatibilidad antes de usar el catálogo para una compra.

## Ejecutar en local

Necesitas Node.js 20.17 o posterior y npm. Desde la carpeta del proyecto, ejecuta:

```bash
npm ci
npm start
```

Abre [el catálogo](http://localhost:3000). Express crea `repuestos.db` si todavía no existe. Después de cotizar, puedes consultar los registros en [la API local](http://localhost:3000/api/cotizaciones).

## Publicar en Netlify

Importa el repositorio desde GitHub en Netlify. El archivo `netlify.toml` configura `npm run build` y la carpeta `dist` como directorio de publicación.

El sitio publicado usa una función de Netlify para cargar el catálogo y guardar cotizaciones en Netlify Blobs. Puedes consultar las cotizaciones publicadas desde el panel del proyecto en **Data & Storage → Blobs → cotizaciones**. La base SQLite de tu equipo se queda en local.
