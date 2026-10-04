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

    label.append(input, " " + opcion);
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

  // Resumen del perfil: cada pregunta con la respuesta elegida
  resumenPerfil.innerHTML = "";
  PREGUNTAS.forEach((pregunta) => {
    resumenPerfil.append(crear("li", pregunta.etiqueta + ": " + respuestas[pregunta.clave]));
  });

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
