# Suplementa: Personal Shopper de suplementos deportivos

## Contexto

Proyecto universitario: artefacto de ecommerce para la materia "Introducción a la Tecnología y Cultura Digital" (Licenciatura en Negocios Digitales, Universidad ORT Uruguay). Corresponde a la propuesta "El Personal Shopper (Nicho Específico)".

Lo desarrolla una sola persona que está aprendiendo a programar y a usar Claude Code. Se presenta con una demo en vivo, publicada con un link (GitHub Pages).

**Problema:** elegir suplementos deportivos es difícil para quien no tiene conocimientos, y los productos están repartidos entre varias tiendas online uruguayas.

**Solución:** una web que hace un cuestionario, identifica hasta 2 categorías de suplementos adecuadas al perfil y muestra productos reales de tiendas uruguayas, cada uno con un botón "Ver en tienda". Es orientación comercial e informativa: no reemplaza a un profesional de la salud.

## Reglas para trabajar en este proyecto

- Responder siempre en español.
- Antes de crear o modificar un archivo, explicar brevemente qué se va a hacer y por qué.
- Hacer cambios chicos, de a uno. No adelantarse a pasos que no se pidieron.
- No agregar funcionalidades que no estén en esta especificación.
- Si algo de esta especificación es ambiguo, preguntar antes de decidir.
- Código simple, claro y fácil de explicar en una defensa oral. Comentarios en español.
- No ejecutar comandos de Git salvo que se pida explícitamente.
- No inventar productos, precios ni links.

## Restricciones técnicas

- Web estática: solo HTML, CSS y JavaScript "vanilla" (sin frameworks, sin npm, sin servidor, sin base de datos, sin APIs externas).
- Tiene que funcionar abriendo `index.html` en el navegador y publicándose tal cual en GitHub Pages.
- Diseño responsive (que se vea bien en computadora y en celular).
- No usar fotos de las tiendas (derechos de autor). Usar íconos o ilustraciones simples.

## Estructura de archivos propuesta

- `index.html`: la página (inicio, cuestionario y resultado).
- `styles.css`: el diseño visual.
- `catalogo.js`: los productos (datos).
- `reglas.js`: la lógica de recomendación (tabla de decisión y reglas).
- `app.js`: la navegación entre pantallas y lo que se muestra.

## Pantallas

1. **Inicio:** título, breve descripción, botón "Comenzar" y aviso de salud.
2. **Cuestionario:** una pregunta por pantalla, barra de progreso ("Paso X de 9"), botones "Anterior" y "Siguiente". Todas las preguntas son obligatorias: no se puede avanzar sin responder.
3. **Resultado:** resumen del perfil, avisos que correspondan, hasta 2 categorías con su explicación, y los productos de cada categoría con precio, tienda y botón "Ver en tienda".
4. Al pie del resultado, siempre: "Las sugerencias de esta herramienta son de carácter informativo y comercial y no sustituyen el asesoramiento de un médico, nutricionista u otro profesional de la salud."

## Cuestionario (9 preguntas, en este orden)

1. **¿Qué edad tenés?** Menor de 18 años / 18 a 25 / 26 a 35 / 36 a 45 / 46 a 60 / Más de 60
2. **¿Tenés alguna condición médica, tomás medicación o existe alguna situación particular por la que debas consultar con un profesional antes de consumir suplementos?** Sí / No / Prefiero no responder
3. **¿Con qué género te identificás?** Masculino / Femenino / Prefiero no indicar
4. **¿Qué actividad física o deporte practicás principalmente?** Musculación / gimnasio, Running, Ciclismo, CrossFit / entrenamiento funcional, Deportes de equipo, Otro
5. **¿Cuántas veces entrenás por semana?** 1 a 2 / 3 a 4 / 5 o más
6. **¿Cuál es tu objetivo principal?** Ganar masa muscular, Mejorar el rendimiento, Mejorar la recuperación, Aumentar la resistencia, Complementar mi alimentación, Otro
7. **¿Qué experiencia tenés con suplementos?** Principiante (nunca usé) / Intermedio (usé alguno) / Avanzado (uso habitualmente)
8. **¿Tenés alguna preferencia o restricción alimentaria?** Ninguna, Vegetariana, Vegana, Sin lactosa, Otra
9. **¿Cuál es tu presupuesto aproximado?** Hasta $1.000 / Entre $1.000 y $2.000 / Entre $2.000 y $3.000 / Más de $3.000 / No tengo un presupuesto definido

Edad y género son datos de contexto: no cambian por sí solos la recomendación.

En las tablas, "Mejorar rendimiento" equivale a "Mejorar el rendimiento" y "Complementar alimentación" equivale a "Complementar mi alimentación". En pantalla se usa siempre el texto de la pregunta.

## Reglas de seguridad (se aplican primero)

- **Menor de 18:** mostrar un cartel que diga que estos productos no se recomiendan para menores de 18 años y que la consulta debe hacerse con un adulto responsable y un profesional de la salud. El usuario puede seguir igual.
- **Condición médica = Sí:** mostrar las mismas categorías que saldrían según sus respuestas (incluida la regla de frecuencia), con su explicación, pero **sin productos**, y recomendar consultar a un profesional antes de consumir suplementos.
- **Condición médica = Prefiero no responder:** flujo normal, con el aviso de salud destacado arriba del resultado.

## Tabla de decisión (actividad + objetivo → máximo 2 categorías)

| Actividad | Objetivo | Categoría 1 | Categoría 2 |
|---|---|---|---|
| Musculación / gimnasio | Ganar masa muscular | Proteína en polvo | Creatina |
| Musculación / gimnasio | Mejorar rendimiento | Creatina | Proteína en polvo |
| Musculación / gimnasio | Mejorar recuperación | Proteína en polvo | Recuperación deportiva |
| Running | Aumentar resistencia | Electrolitos / hidratación | Carbohidratos / energía |
| Running | Mejorar rendimiento | Carbohidratos / energía | Electrolitos / hidratación |
| Running | Mejorar recuperación | Recuperación deportiva | Proteína en polvo |
| Ciclismo | Aumentar resistencia | Carbohidratos / energía | Electrolitos / hidratación |
| Ciclismo | Mejorar rendimiento | Carbohidratos / energía | Electrolitos / hidratación |
| Ciclismo | Mejorar recuperación | Recuperación deportiva | Proteína en polvo |
| CrossFit / funcional | Ganar masa muscular | Proteína en polvo | Creatina |
| CrossFit / funcional | Mejorar rendimiento | Creatina | Carbohidratos / energía |
| CrossFit / funcional | Mejorar recuperación | Proteína en polvo | Recuperación deportiva |
| Deportes de equipo | Mejorar rendimiento | Carbohidratos / energía | Electrolitos / hidratación |
| Deportes de equipo | Mejorar recuperación | Recuperación deportiva | Proteína en polvo |
| Cualquier actividad | Complementar alimentación | Proteína en polvo | Barras / snacks proteicos |

La fila "Cualquier actividad" también aplica a la actividad "Otro" (por ejemplo, "Otro" + "Complementar alimentación"), sin el mensaje de orientación general.

**Si la combinación no está en la tabla** (incluye actividad "Otro" con cualquier objetivo que no sea "Complementar alimentación"), decide solo el objetivo, y el resultado agrega: "Esta es una orientación general según tu objetivo". Ese mensaje aparece solo cuando se usa esta tabla de respaldo.

| Objetivo | Categoría 1 | Categoría 2 |
|---|---|---|
| Ganar masa muscular | Proteína en polvo | Creatina |
| Mejorar rendimiento | Creatina | Carbohidratos / energía |
| Mejorar recuperación | Recuperación deportiva | Proteína en polvo |
| Aumentar resistencia | Electrolitos / hidratación | Carbohidratos / energía |
| Complementar alimentación / Otro | Proteína en polvo | Barras / snacks proteicos |

## Reglas secundarias

- **Vegana:** la categoría "Proteína en polvo" se reemplaza por "Proteína vegetal".
- **Sin lactosa:** en la categoría de proteína se muestran los productos de "Proteína vegetal" y la isolate "Baja en lactosa"; las whey que "Contienen" lactosa se ocultan. Primero se aplica el filtro de presupuesto y después se ordena: primero sin lactosa, luego baja en lactosa, y dentro de cada grupo del más barato al más caro. Si ninguno de los compatibles entra en el presupuesto, se muestra el más económico de los compatibles con la etiqueta "Supera tu presupuesto" (nunca uno con lactosa).
- **Vegetariana:** no cambia nada.
- **Otra:** se agrega la nota "Revisá la etiqueta de cada producto según tu restricción".
- **Barras / snacks proteicos con vegana o sin lactosa:** como el catálogo no informa esos datos, la categoría muestra "No encontramos opciones compatibles con tu preferencia en nuestro catálogo", sin productos.
- **Frecuencia 1 a 2 veces:** mostrar solo la Categoría 1 (soluciones más simples).
- **Frecuencia 5 o más:** se mantienen las categorías y se agrega una nota sobre la importancia de la recuperación y la hidratación.
- **Experiencia:** cambia solo la explicación. Principiante: texto simple. Intermedio y avanzado: texto más detallado. Los textos de explicación los redacta Claude, en tono informativo y sin promesas de salud, y se revisan antes de darlos por buenos.
- **Presupuesto:** no cambia las categorías, solo los productos. Se filtra cada producto por separado y se muestran los de precio menor o igual al tope del rango, del más barato al más caro. Con "Más de $3.000" o "No tengo un presupuesto definido" se muestran todos. Si en una categoría ninguno entra, se muestra el más económico con la etiqueta "Supera tu presupuesto".

## Catálogo

Los precios son de referencia: mostrar "Precio de referencia, relevado el [fecha]". La fecha se define en un solo lugar en `catalogo.js`, con valor inicial "octubre de 2026". Los links de cada producto están pendientes de verificar: mientras un producto no tenga link, el botón "Ver en tienda" queda deshabilitado, en gris, con el texto "Link pendiente". No inventar links.

Los productos en promoción muestran el precio con una etiqueta chica "Promoción".

| Categoría | Producto | Tienda | Precio | Vegano | Lactosa |
|---|---|---|---|---|---|
| Proteína en polvo | 100% Whey 2 lb ENA Vainilla | Wikimúsculos | $3.290 | No | Contiene |
| Proteína en polvo | Whey Protein True Made 2 lb ENA | Wikimúsculos | $3.690 | No | Contiene |
| Proteína en polvo | Whey Protein Sylab 400 g | El Túnel | $940 | No | Contiene |
| Proteína en polvo | Whey Protein Sylab 800 g | El Túnel | $1.565 | No | Contiene |
| Proteína en polvo | Platinum 100% Whey Isolate 930 g | Farmashop | $3.122 | No | Baja en lactosa |
| Proteína vegetal | Power Vegan Protein Cibeles | Wikimúsculos | $3.400 | Sí | Sin lactosa |
| Proteína vegetal | Vegan Protein Vitalabs 454 g Vainilla | Wikimúsculos | $2.390 | Sí | Sin lactosa |
| Proteína vegetal | Vegan Protein Vitalabs 907 g Vainilla | Wikimúsculos | $4.290 | Sí | Sin lactosa |
| Creatina | Creatina Monohidrato Sylab 120 g | Wikimúsculos | $760 | | |
| Creatina | Creatina Celsius 120 g | Farmashop | $717 | | |
| Creatina | Creatina Celsius 400 g | Farmashop | $1.998 | | |
| Electrolitos / hidratación | Electrolitos Lytos 180 g | Farmashop | $1.590 | | |
| Electrolitos / hidratación | Power Drink Naranja 500 g | El Túnel | $1.235 | | |
| Carbohidratos / energía | Hammer Gel 33 g | El Túnel | $184 | | |
| Carbohidratos / energía | Ena Energy Gel Limón 40 g | El Túnel | $120 | | |
| Recuperación deportiva | BCAA 1400 Sylab 60 cápsulas | El Túnel | $584 | | |
| Recuperación deportiva | Glutamina 100% Pure Glutamine 300 g Gold Nutrition | Wikimúsculos | $2.090 | | |
| Barras / snacks proteicos | Protein Bar ENA caja x16 | Wikimúsculos | $627 (promoción) | No informado | No informado |

## Diseño visual

Referencia: mockups del grupo (nombre "Suplementa", estilo limpio, fondo claro, acentos en azul, botón principal verde "Comenzar", tarjetas para opciones y productos). Los mockups se van a compartir más adelante, al trabajar el diseño.
