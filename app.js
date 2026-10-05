// app.js
// Navegación entre pantallas (inicio, cuestionario y resultado) y lo que se muestra.
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

// Íconos de las tarjetas de producto, uno por categoría (SVG dibujado en el código).
// Van en el lugar donde el mockup tiene la foto. La clave es la categoría
// exacta del producto en catalogo.js; son solo visuales.
const ICONOS_CATEGORIA = {
  // Frasco grande
  "Proteína en polvo": SVG_INICIO +
    '<rect x="7" y="2" width="10" height="4" rx="1"/>' +
    '<rect x="5" y="6" width="14" height="16" rx="2"/><path d="M5 11h14M5 17h14"/>' + SVG_FIN,
  // Hoja
  "Proteína vegetal": SVG_INICIO +
    '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/>' +
    '<path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>' + SVG_FIN,
  // Frasco chico
  "Creatina": SVG_INICIO +
    '<rect x="8" y="5" width="8" height="3" rx="1"/>' +
    '<rect x="7" y="8" width="10" height="12" rx="2"/><path d="M7 13h10"/>' + SVG_FIN,
  // Gota
  "Electrolitos / hidratación": SVG_INICIO +
    '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>' + SVG_FIN,
  // Rayo
  "Carbohidratos / energía": SVG_INICIO +
    '<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>' + SVG_FIN,
  // Luna (descanso y recuperación)
  "Recuperación deportiva": SVG_INICIO +
    '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>' + SVG_FIN,
  // Barra con envoltorio
  "Barras / snacks proteicos": SVG_INICIO +
    '<rect x="2" y="8" width="20" height="8" rx="2"/><path d="M6 8v8M18 8v8"/>' + SVG_FIN
};

// =====================================================================
// ESTADO
// =====================================================================

let pasoActual = 0;   // índice de la pregunta que se está mostrando (0 a 8)
let respuestas = {};  // ejemplo: { edad: "18 a 25", condicion: "No", ... }

// =====================================================================
// ELEMENTOS DE LA PÁGINA
// =====================================================================

const seccionInicio = document.getElementById("inicio");
const seccionCuestionario = document.getElementById("cuestionario");
const seccionResultado = document.getElementById("resultado");

const textoProgreso = document.getElementById("texto-progreso");
const barraProgreso = document.getElementById("barra-progreso");
const textoPregunta = document.getElementById("texto-pregunta");
const contenedorOpciones = document.getElementById("opciones");
const botonAnterior = document.getElementById("boton-anterior");
const botonSiguiente = document.getElementById("boton-siguiente");
const pasosLista = document.querySelectorAll("#lista-pasos li");

const avisoDestacado = document.getElementById("aviso-destacado");
const resumenPerfil = document.getElementById("resumen-perfil");
const contenedorAvisos = document.getElementById("avisos");
const contenedorCategorias = document.getElementById("categorias");
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

// Muestra una sola sección y oculta las otras dos
function mostrarSeccion(seccion) {
  seccionInicio.hidden = true;
  seccionCuestionario.hidden = true;
  seccionResultado.hidden = true;
  seccion.hidden = false;
  window.scrollTo(0, 0);
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

  // Lista de pasos: los anteriores quedan "completado", el actual "actual"
  // y los que faltan quedan sin clase (se ven en gris)
  pasosLista.forEach((paso, indice) => {
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

  // Ícono de la categoría arriba del nombre (en lugar de una foto)
  const icono = crear("div", "", "icono-producto");
  icono.innerHTML = ICONOS_CATEGORIA[producto.categoria];
  tarjeta.append(icono);

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

// Bloque de una categoría: nombre, explicación, mensaje y productos
function crearCategoria(categoria) {
  const bloque = crear("article", "", "categoria");

  bloque.append(crear("h3", categoria.nombre));
  bloque.append(crear("p", categoria.explicacion));

  // Mensaje de "no encontramos opciones compatibles" (si existe)
  if (categoria.mensaje) {
    bloque.append(crear("p", categoria.mensaje, "mensaje"));
  }

  categoria.productos.forEach((producto) => {
    bloque.append(crearProducto(producto, categoria.superaPresupuesto));
  });

  return bloque;
}

// Calcula la recomendación y dibuja la pantalla de resultado
function mostrarResultado() {
  const resultado = recomendar(respuestas);

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

  // Categorías con su explicación y productos
  contenedorCategorias.innerHTML = "";
  resultado.categorias.forEach((categoria) => {
    contenedorCategorias.append(crearCategoria(categoria));
  });

  // Fecha de relevamiento de precios (solo si se muestran productos)
  textoFecha.textContent = "Precio de referencia, relevado en " + FECHA_RELEVAMIENTO;
  textoFecha.hidden = !resultado.mostrarProductos;

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

// Borra las respuestas y vuelve a la pantalla de inicio
function volverAEmpezar() {
  respuestas = {};
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
