// app.js
// Navegación entre pantallas (inicio, cuestionario, categorías y productos) y lo que se muestra.
// Usa FECHA_RELEVAMIENTO (de catalogo.js) y recomendar() (de reglas.js),
// que se cargan antes que este archivo.

// =====================================================================
// DATOS: las 9 preguntas del cuestionario
// =====================================================================
// clave: nombre de la respuesta que espera recomendar()
// etiqueta: texto corto para el resumen del perfil
// opciones: textos exactamente iguales a los que usa reglas.js
const PREGUNTAS = [
  {
    clave: "edad",
    etiqueta: "Edad",
    texto: "¿Qué edad tenés?",
    opciones: ["Menor de 18 años", "18 a 25", "26 a 35", "36 a 45", "46 a 60", "Más de 60"]
  },
  {
    clave: "condicion",
    etiqueta: "Condición médica o medicación",
    texto: "¿Tenés alguna condición médica, tomás medicación o existe alguna situación particular por la que debas consultar con un profesional antes de consumir suplementos?",
    opciones: ["Sí", "No", "Prefiero no responder"]
  },
  {
    clave: "genero",
    etiqueta: "Género",
    texto: "¿Con qué género te identificás?",
    opciones: ["Masculino", "Femenino", "Prefiero no indicar"]
  },
  {
    clave: "actividad",
    etiqueta: "Actividad",
    texto: "¿Qué actividad física o deporte practicás principalmente?",
    opciones: ["Musculación / gimnasio", "Running", "Ciclismo", "CrossFit / entrenamiento funcional", "Deportes de equipo", "Otro"]
  },
  {
    clave: "frecuencia",
    etiqueta: "Entrenamientos por semana",
    texto: "¿Cuántas veces entrenás por semana?",
    opciones: ["1 a 2", "3 a 4", "5 o más"]
  },
  {
    clave: "objetivo",
    etiqueta: "Objetivo",
    texto: "¿Cuál es tu objetivo principal?",
    opciones: ["Ganar masa muscular", "Mejorar el rendimiento", "Mejorar la recuperación", "Aumentar la resistencia", "Complementar mi alimentación", "Otro"]
  },
  {
    clave: "experiencia",
    etiqueta: "Experiencia con suplementos",
    texto: "¿Qué experiencia tenés con suplementos?",
    opciones: ["Principiante (nunca usé)", "Intermedio (usé alguno)", "Avanzado (uso habitualmente)"]
  },
  {
    clave: "preferencia",
    etiqueta: "Preferencia alimentaria",
    texto: "¿Tenés alguna preferencia o restricción alimentaria?",
    opciones: ["Ninguna", "Vegetariana", "Vegana", "Sin lactosa", "Otra"]
  },
  {
    clave: "presupuesto",
    etiqueta: "Presupuesto",
    texto: "¿Cuál es tu presupuesto aproximado?",
    opciones: ["Hasta $1.000", "Entre $1.000 y $2.000", "Entre $2.000 y $3.000", "Más de $3.000", "No tengo un presupuesto definido"]
  }
];

// Íconos de la pregunta de actividad física (SVG dibujado en el código).
// La clave es el texto exacto de la opción; solo se usa para mostrar el ícono,
// no cambia la respuesta que se guarda. Usan "currentColor" para tomar el azul del CSS.
const SVG_INICIO = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
const SVG_FIN = "</svg>";

const ICONOS_ACTIVIDAD = {
  // Pesa (mancuerna)
  "Musculación / gimnasio": SVG_INICIO +
    '<path d="M6 7v10M3 9v6M18 7v10M21 9v6M6 12h12"/>' + SVG_FIN,
  // Persona corriendo
  "Running": SVG_INICIO +
    '<circle cx="15" cy="4" r="2" fill="currentColor" stroke="none"/>' +
    '<path d="M13 7l-3 6M10 13l-3 3H4M10 13l4 3-1 5M8 9l4-2 3 3 3 1"/>' + SVG_FIN,
  // Bicicleta
  "Ciclismo": SVG_INICIO +
    '<circle cx="5.5" cy="16" r="3.5"/><circle cx="18.5" cy="16" r="3.5"/>' +
    '<path d="M5.5 16L9 9h6l3.5 7M9 9l3 7 3-7M12 16H5.5M8 7h3M15 9l-1-3h2"/>' + SVG_FIN,
  // Pesa rusa
  "CrossFit / entrenamiento funcional": SVG_INICIO +
    '<circle cx="12" cy="15" r="6"/><path d="M8.5 10.5V7a3.5 3.5 0 0 1 7 0v3.5"/>' + SVG_FIN,
  // Grupo de personas
  "Deportes de equipo": SVG_INICIO +
    '<circle cx="12" cy="7" r="3"/><path d="M6 20v-1a6 6 0 0 1 12 0v1"/>' +
    '<circle cx="5" cy="9" r="2"/><path d="M1 18v-1a4 4 0 0 1 4-4"/>' +
    '<circle cx="19" cy="9" r="2"/><path d="M23 18v-1a4 4 0 0 0-4-4"/>' + SVG_FIN,
  // Tres puntos
  "Otro": SVG_INICIO +
    '<circle cx="5" cy="12" r="1.8" fill="currentColor" stroke="none"/>' +
    '<circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none"/>' +
    '<circle cx="19" cy="12" r="1.8" fill="currentColor" stroke="none"/>' + SVG_FIN
};

// Imagen de cada categoría (archivos de la carpeta img). Se usa en las tarjetas
// de categoría y en las de producto: cada producto muestra la imagen de su categoría.
// La clave es la categoría exacta de catalogo.js; son solo visuales.
const IMAGENES_CATEGORIA = {
  "Proteína en polvo": "img/proteina-polvo.png",
  "Proteína vegetal": "img/proteina-vegetal.png",
  "Creatina": "img/creatina.png",
  "Electrolitos / hidratación": "img/electrolitos.png",
  "Carbohidratos / energía": "img/carbohidratos.png",
  "Recuperación deportiva": "img/recuperacion.jpg",
  "Barras / snacks proteicos": "img/barras.jpg"
};

// =====================================================================
// ESTADO
// =====================================================================

let pasoActual = 0;   // índice de la pregunta que se está mostrando (0 a 8)
let respuestas = {};  // ejemplo: { edad: "18 a 25", condicion: "No", ... }
let resultadoActual = null; // lo que devolvió recomendar() la última vez (se reutiliza al ver productos)

// =====================================================================
// ELEMENTOS DE LA PÁGINA
// =====================================================================

const seccionInicio = document.getElementById("inicio");
const seccionCuestionario = document.getElementById("cuestionario");
const seccionResultado = document.getElementById("resultado");
const seccionProductos = document.getElementById("productos");

const textoProgreso = document.getElementById("texto-progreso");
const barraProgreso = document.getElementById("barra-progreso");
const textoPregunta = document.getElementById("texto-pregunta");
const contenedorOpciones = document.getElementById("opciones");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const pasosFila = document.querySelectorAll("#fila-pasos li");

const avisoDestacado = document.getElementById("aviso-destacado");
const resumenPerfil = document.getElementById("resumen-perfil");
const contenedorAvisos = document.getElementById("avisos");
const contenedorCategorias = document.getElementById("categorias");

const nombreCategoria = document.getElementById("nombre-categoria");
const mensajeProductos = document.getElementById("mensaje-productos");
const listaProductos = document.getElementById("lista-productos");
const textoFecha = document.getElementById("texto-fecha");

// =====================================================================
// FUNCIONES AUXILIARES
// =====================================================================

// Crea un elemento HTML con texto y clase (ambos opcionales)
function crear(etiqueta, texto, clase) {
  const elemento = document.createElement(etiqueta);
  if (texto) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

// Muestra una sola sección y oculta las demás
function mostrarSeccion(seccion) {
  seccionInicio.hidden = true;
  seccionCuestionario.hidden = true;
  seccionResultado.hidden = true;
  seccionProductos.hidden = true;
  seccion.hidden = false;
  window.scrollTo(0, 0);
}

// Crea la imagen de una categoría, con texto alternativo y la clase que define su tamaño
function crearImagenCategoria(nombreCategoria, clase) {
  const imagen = document.createElement("img");
  imagen.src = IMAGENES_CATEGORIA[nombreCategoria];
  imagen.alt = "Imagen ilustrativa de " + nombreCategoria;
  imagen.className = clase;
  return imagen;
}

// Formatea el precio: 3290 → "$3.290"
// Se usa "de-DE" porque separa los miles con punto también en números de 4 cifras.
function formatearPrecio(precio) {
  return "$" + precio.toLocaleString("de-DE");
}

// =====================================================================
// CUESTIONARIO
// =====================================================================

// Dibuja la pregunta del paso actual
function mostrarPregunta() {
  const pregunta = PREGUNTAS[pasoActual];

  // Progreso
  textoProgreso.textContent = "Paso " + (pasoActual + 1) + " de " + PREGUNTAS.length;
  barraProgreso.value = pasoActual + 1;

  // Fila de pasos: los anteriores quedan "completado", el actual "actual"
  // y los que faltan quedan sin clase (se ven en gris)
  pasosFila.forEach((paso, indice) => {
    paso.classList.toggle("completado", indice < pasoActual);
    paso.classList.toggle("actual", indice === pasoActual);
  });

  // Texto de la pregunta
  textoPregunta.textContent = pregunta.texto;

  // Opciones (una por renglón, con botón de radio)
  contenedorOpciones.innerHTML = "";
  pregunta.opciones.forEach((opcion) => {
    const label = crear("label", "", "opcion");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "opcion";
    input.value = opcion;
    // Si ya se había respondido (por ejemplo, al volver con "Anterior"), queda marcada
    input.checked = respuestas[pregunta.clave] === opcion;

    // Al elegir una opción se guarda la respuesta y se habilita "Siguiente"
    input.addEventListener("change", () => {
      respuestas[pregunta.clave] = opcion;
      botonSiguiente.disabled = false;
    });

    label.append(input);

    // Solo en la pregunta de actividad: ícono arriba del texto (es solo visual)
    if (pregunta.clave === "actividad") {
      label.classList.add("opcion-con-icono");
      const icono = crear("span", "", "icono-opcion");
      icono.innerHTML = ICONOS_ACTIVIDAD[opcion];
      label.append(icono);
    }

    label.append(" " + opcion);
    contenedorOpciones.append(label);
  });

  // Botones: "Anterior" no se usa en el paso 1; "Siguiente" solo si hay respuesta
  botonAnterior.disabled = pasoActual === 0;
  botonSiguiente.disabled = respuestas[pregunta.clave] === undefined;
}

function irAnterior() {
  if (pasoActual > 0) {
    pasoActual--;
    mostrarPregunta();
  }
}

function irSiguiente() {
  if (pasoActual < PREGUNTAS.length - 1) {
    pasoActual++;
    mostrarPregunta();
  } else {
    // Era la última pregunta: se muestra el resultado
    mostrarResultado();
  }
}

// =====================================================================
// RESULTADO
// =====================================================================

// Tarjeta de un producto
function crearProducto(producto, superaPresupuesto) {
  const tarjeta = crear("div", "", "producto");

  // Imagen de la categoría del producto, arriba del nombre
  tarjeta.append(crearImagenCategoria(producto.categoria, "imagen-producto"));

  tarjeta.append(crear("h4", producto.nombre));
  tarjeta.append(crear("p", "Tienda: " + producto.tienda));

  // Precio, con la etiqueta "Promoción" si corresponde
  const precio = crear("p", formatearPrecio(producto.precio), "precio");
  if (producto.promocion) {
    precio.append(" ", crear("span", "Promoción", "etiqueta"));
  }
  tarjeta.append(precio);

  if (superaPresupuesto) {
    tarjeta.append(crear("p", "Supera tu presupuesto", "etiqueta etiqueta-presupuesto"));
  }

  // Botón "Ver en tienda" (abre otra pestaña) o "Link pendiente" deshabilitado
  if (producto.link) {
    const enlace = crear("a", "Ver en tienda", "boton-tienda");
    enlace.href = producto.link;
    enlace.target = "_blank";
    enlace.rel = "noopener";
    tarjeta.append(enlace);
  } else {
    const boton = crear("button", "Link pendiente", "boton-tienda");
    boton.type = "button";
    boton.disabled = true;
    tarjeta.append(boton);
  }

  return tarjeta;
}

// Tarjeta de una categoría: imagen, número, nombre, explicación y botón "Ver opciones".
// "indice" es la posición de la categoría (0 o 1) dentro del resultado.
function crearCategoria(categoria, indice) {
  const tarjeta = crear("article", "", "categoria");

  // Imagen de la categoría, a la izquierda del texto
  tarjeta.append(crearImagenCategoria(categoria.nombre, "imagen-categoria"));

  // Texto de la tarjeta (el número lo pone el CSS delante del nombre)
  const texto = crear("div", "", "texto-categoria");
  texto.append(crear("h3", categoria.nombre));
  texto.append(crear("p", categoria.explicacion));

  // "Ver opciones" solo si se muestran productos (no aparece con condición médica "Sí")
  if (resultadoActual.mostrarProductos) {
    const boton = crear("button", "Ver opciones", "boton-opciones");
    boton.type = "button";
    boton.addEventListener("click", () => mostrarProductos(indice));
    texto.append(boton);
  }

  tarjeta.append(texto);
  return tarjeta;
}

// Calcula la recomendación y dibuja la pantalla de categorías
function mostrarResultado() {
  const resultado = recomendar(respuestas);
  resultadoActual = resultado; // se guarda para usarlo en la pantalla de productos

  // Resumen del perfil en una sola línea:
  // actividad · frecuencia · objetivo (y la preferencia, si no es "Ninguna")
  const partesResumen = [
    respuestas.actividad,
    respuestas.frecuencia + " veces por semana",
    "Objetivo: " + respuestas.objetivo
  ];
  if (respuestas.preferencia !== "Ninguna") {
    partesResumen.push(respuestas.preferencia);
  }
  resumenPerfil.textContent = partesResumen.join(" · ");

  // Avisos: el de "Prefiero no responder" va destacado arriba; el resto, en la lista
  avisoDestacado.hidden = true;
  contenedorAvisos.innerHTML = "";
  resultado.avisos.forEach((aviso) => {
    if (aviso === TEXTO_CONDICION_NO_RESPONDE) {
      avisoDestacado.textContent = aviso;
      avisoDestacado.hidden = false;
    } else {
      contenedorAvisos.append(crear("p", aviso, "aviso"));
    }
  });

  // Tarjetas de categoría con su explicación
  contenedorCategorias.innerHTML = "";
  resultado.categorias.forEach((categoria, indice) => {
    contenedorCategorias.append(crearCategoria(categoria, indice));
  });

  mostrarSeccion(seccionResultado);
}

// =====================================================================
// PRODUCTOS DE UNA CATEGORÍA
// =====================================================================

// Dibuja la pantalla de productos de la categoría elegida con "Ver opciones".
// No vuelve a llamar a recomendar(): usa el resultado ya guardado.
function mostrarProductos(indice) {
  const categoria = resultadoActual.categorias[indice];

  nombreCategoria.textContent = categoria.nombre;

  // Mensaje de "no encontramos opciones compatibles" (si existe)
  mensajeProductos.textContent = categoria.mensaje;
  mensajeProductos.hidden = !categoria.mensaje;

  // Tarjetas de producto
  listaProductos.innerHTML = "";
  categoria.productos.forEach((producto) => {
    listaProductos.append(crearProducto(producto, categoria.superaPresupuesto));
  });

  // Fecha de relevamiento de precios
  textoFecha.textContent = "Precio de referencia, relevado en " + FECHA_RELEVAMIENTO;

  mostrarSeccion(seccionProductos);
}

// Vuelve a la pantalla de categorías (ya está dibujada, no se recalcula)
function volverACategorias() {
  mostrarSeccion(seccionResultado);
}

// =====================================================================
// INICIO Y REINICIO
// =====================================================================

function comenzar() {
  pasoActual = 0;
  mostrarPregunta();
  mostrarSeccion(seccionCuestionario);
}

// Vuelve al paso 1 del cuestionario SIN borrar las respuestas:
// cada pregunta aparece con su opción marcada y "Siguiente" habilitado.
// Al terminar el cuestionario, irSiguiente() recalcula el resultado.
function editarRespuestas() {
  pasoActual = 0;
  mostrarPregunta();
  mostrarSeccion(seccionCuestionario);
}

// Borra las respuestas y vuelve a la pantalla de inicio
function volverAEmpezar() {
  respuestas = {};
  resultadoActual = null;
  pasoActual = 0;
  mostrarSeccion(seccionInicio);
}

// =====================================================================
// EVENTOS DE LOS BOTONES
// =====================================================================

document.getElementById("boton-comenzar").addEventListener("click", comenzar);
botonAnterior.addEventListener("click", irAnterior);
botonSiguiente.addEventListener("click", irSiguiente);
document.getElementById("boton-reiniciar").addEventListener("click", volverAEmpezar);
document.getElementById("boton-editar").addEventListener("click", editarRespuestas);
document.getElementById("boton-volver-categorias").addEventListener("click", volverACategorias);
