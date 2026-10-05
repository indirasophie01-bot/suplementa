# Suplementa

## 1. Qué es Suplementa

Suplementa es un "personal shopper" web de suplementos deportivos. A través de un cuestionario de 9 preguntas identifica hasta 2 categorías de suplementos adecuadas al perfil de la persona y muestra productos de tiendas online uruguayas, cada uno con un botón "Ver en tienda". Es una orientación comercial e informativa: no reemplaza a un profesional de la salud.

**Demo:** https://indirasophie01-bot.github.io/suplementa/

## 2. Contexto académico

Proyecto desarrollado para la materia **Introducción a la Tecnología y Cultura Digital**, de la **Licenciatura en Negocios Digitales**, **Universidad ORT Uruguay**, 2026. Corresponde a la propuesta "El Personal Shopper (Nicho Específico)".

## 3. Cómo usarlo

1. En la pantalla de inicio, tocar **Comenzar**.
2. Responder las 9 preguntas del cuestionario (todas son obligatorias). Se puede volver atrás con **Anterior**.
3. Ver el resultado: resumen del perfil, avisos que correspondan y hasta 2 categorías recomendadas con su explicación.
4. Ver los productos de cada categoría con precio, tienda y botón **Ver en tienda**.
5. Si se quiere cambiar algo, usar **Editar respuestas**.

## 4. Cómo ejecutarlo en una computadora desde cero

No requiere instalar nada: es una página web estática.

1. Descargar el repositorio de una de estas dos formas:
   - Desde GitHub: botón **Code** → **Download ZIP**, y descomprimir el archivo.
   - Con Git: `git clone https://github.com/indirasophie01-bot/suplementa.git`
2. Abrir el archivo `index.html` con cualquier navegador (doble clic).

## 5. Estructura de archivos

- `index.html`: la página, con las pantallas de inicio, cuestionario y resultado.
- `styles.css`: el diseño visual (colores, tarjetas, versión para celular).
- `catalogo.js`: los datos de los productos y la fecha del relevamiento de precios.
- `reglas.js`: la lógica de recomendación (tablas de decisión, reglas de seguridad y reglas secundarias).
- `app.js`: la navegación entre pantallas y lo que se muestra en cada una.
- `pruebas.html`: página de pruebas automáticas de las reglas de recomendación.
- `img/`: la imagen de portada y las imágenes de cada categoría.
- `CLAUDE.md`: la especificación del proyecto y las reglas de trabajo con Claude Code.

## 6. Cómo probar las reglas

Abrir `pruebas.html` en el navegador. La página ejecuta 12 casos de prueba sobre la lógica de `reglas.js` (por ejemplo: preferencia vegana, sin lactosa, frecuencia, presupuesto, menor de 18 y condición médica) y muestra ✅ o ❌ en cada uno, junto con el total de casos aprobados.

## 7. Cómo actualizar precios y links

Todo se edita en `catalogo.js`:

- **Precios:** cambiar el valor `precio` de cada producto (número en pesos uruguayos, sin signo ni puntos).
- **Links:** reemplazar `link: null` por el link real entre comillas, por ejemplo `link: "https://..."`. Mientras un producto tenga `link: null`, el botón aparece en gris con el texto "Link pendiente".
- **Fecha del relevamiento:** cambiar `FECHA_RELEVAMIENTO` (por ejemplo, `"octubre de 2026"`). Se define en un solo lugar y se muestra en el resultado.

## 8. Tecnologías

- HTML, CSS y JavaScript, sin frameworks ni librerías.
- Publicado en GitHub Pages.
- Desarrollado con Claude Code.

## 9. Imágenes

La imagen de portada viene del mockup del grupo. Las imágenes de cada categoría fueron generadas con herramientas de IA o tomadas de Pexels con licencia libre, sin marcas reales. No se usan fotos de las tiendas.

## 10. Aviso

Las sugerencias de esta herramienta son de carácter informativo y comercial y no sustituyen el asesoramiento de un médico, nutricionista u otro profesional de la salud.
