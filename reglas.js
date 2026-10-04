// reglas.js
// Lógica de recomendación de Suplementa.
// Recibe las respuestas del cuestionario y devuelve el resultado armado
// (avisos, categorías, explicaciones y productos). No toca la pantalla:
// eso lo hace app.js. Usa la lista CATALOGO definida en catalogo.js,
// que se carga antes que este archivo.

// =====================================================================
// DATOS
// =====================================================================

// Tabla de decisión: actividad + objetivo → hasta 2 categorías.
// Los textos son iguales a los de las opciones del cuestionario.
// "Cualquier actividad" vale para todas las actividades, incluida "Otro".
const TABLA_DECISION = [
  { actividad: "Musculación / gimnasio", objetivo: "Ganar masa muscular", categoria1: "Proteína en polvo", categoria2: "Creatina" },
  { actividad: "Musculación / gimnasio", objetivo: "Mejorar el rendimiento", categoria1: "Creatina", categoria2: "Proteína en polvo" },
  { actividad: "Musculación / gimnasio", objetivo: "Mejorar la recuperación", categoria1: "Proteína en polvo", categoria2: "Recuperación deportiva" },

  { actividad: "Running", objetivo: "Aumentar la resistencia", categoria1: "Electrolitos / hidratación", categoria2: "Carbohidratos / energía" },
  { actividad: "Running", objetivo: "Mejorar el rendimiento", categoria1: "Carbohidratos / energía", categoria2: "Electrolitos / hidratación" },
  { actividad: "Running", objetivo: "Mejorar la recuperación", categoria1: "Recuperación deportiva", categoria2: "Proteína en polvo" },

  { actividad: "Ciclismo", objetivo: "Aumentar la resistencia", categoria1: "Carbohidratos / energía", categoria2: "Electrolitos / hidratación" },
  { actividad: "Ciclismo", objetivo: "Mejorar el rendimiento", categoria1: "Carbohidratos / energía", categoria2: "Electrolitos / hidratación" },
  { actividad: "Ciclismo", objetivo: "Mejorar la recuperación", categoria1: "Recuperación deportiva", categoria2: "Proteína en polvo" },

  { actividad: "CrossFit / entrenamiento funcional", objetivo: "Ganar masa muscular", categoria1: "Proteína en polvo", categoria2: "Creatina" },
  { actividad: "CrossFit / entrenamiento funcional", objetivo: "Mejorar el rendimiento", categoria1: "Creatina", categoria2: "Carbohidratos / energía" },
  { actividad: "CrossFit / entrenamiento funcional", objetivo: "Mejorar la recuperación", categoria1: "Proteína en polvo", categoria2: "Recuperación deportiva" },

  { actividad: "Deportes de equipo", objetivo: "Mejorar el rendimiento", categoria1: "Carbohidratos / energía", categoria2: "Electrolitos / hidratación" },
  { actividad: "Deportes de equipo", objetivo: "Mejorar la recuperación", categoria1: "Recuperación deportiva", categoria2: "Proteína en polvo" },

  { actividad: "Cualquier actividad", objetivo: "Complementar mi alimentación", categoria1: "Proteína en polvo", categoria2: "Barras / snacks proteicos" }
];

// Tabla de respaldo: se usa cuando la combinación no está en la tabla de decisión.
// Decide solo el objetivo.
const TABLA_RESPALDO = [
  { objetivo: "Ganar masa muscular", categoria1: "Proteína en polvo", categoria2: "Creatina" },
  { objetivo: "Mejorar el rendimiento", categoria1: "Creatina", categoria2: "Carbohidratos / energía" },
  { objetivo: "Mejorar la recuperación", categoria1: "Recuperación deportiva", categoria2: "Proteína en polvo" },
  { objetivo: "Aumentar la resistencia", categoria1: "Electrolitos / hidratación", categoria2: "Carbohidratos / energía" },
  { objetivo: "Complementar mi alimentación", categoria1: "Proteína en polvo", categoria2: "Barras / snacks proteicos" },
  { objetivo: "Otro", categoria1: "Proteína en polvo", categoria2: "Barras / snacks proteicos" }
];

// Explicaciones de cada categoría.
// simple: para principiantes. detallada: para intermedio y avanzado.
// TEXTOS PROVISORIOS: los definitivos se redactan en un paso aparte.
const EXPLICACIONES = {
  "Proteína en polvo": {
    simple: "(Provisorio) Ayuda a sumar proteína a tu alimentación de forma práctica.",
    detallada: "(Provisorio) Fuente práctica de proteína para complementar la dieta y acompañar el entrenamiento."
  },
  "Proteína vegetal": {
    simple: "(Provisorio) Proteína de origen vegetal, sin ingredientes de origen animal.",
    detallada: "(Provisorio) Alternativa vegetal a la proteína whey, apta para una alimentación vegana."
  },
  "Creatina": {
    simple: "(Provisorio) Uno de los suplementos más usados en entrenamientos de fuerza.",
    detallada: "(Provisorio) Suplemento muy estudiado, usado en esfuerzos cortos e intensos."
  },
  "Electrolitos / hidratación": {
    simple: "(Provisorio) Ayudan a reponer lo que perdés al transpirar.",
    detallada: "(Provisorio) Aportan sales minerales que se pierden con el sudor en entrenamientos largos."
  },
  "Carbohidratos / energía": {
    simple: "(Provisorio) Aportan energía rápida durante el ejercicio.",
    detallada: "(Provisorio) Geles y bebidas con carbohidratos de rápida absorción para esfuerzos prolongados."
  },
  "Recuperación deportiva": {
    simple: "(Provisorio) Productos pensados para después de entrenar.",
    detallada: "(Provisorio) Aminoácidos como BCAA y glutamina, usados habitualmente en la etapa de recuperación."
  },
  "Barras / snacks proteicos": {
    simple: "(Provisorio) Un snack práctico con proteína para llevar.",
    detallada: "(Provisorio) Opción práctica para sumar proteína entre comidas."
  }
};

// Textos de los avisos y mensajes
const TEXTO_MENOR = "Estos productos no se recomiendan para menores de 18 años. La consulta debe hacerse con un adulto responsable y un profesional de la salud.";
const TEXTO_CONDICION_SI = "Por lo que indicaste, te recomendamos consultar con un profesional de la salud antes de consumir suplementos. Por eso no mostramos productos.";
const TEXTO_CONDICION_NO_RESPONDE = "Antes de consumir suplementos, consultá con un profesional de la salud, sobre todo si tenés alguna condición médica o tomás medicación.";
const TEXTO_RESPALDO = "Esta es una orientación general según tu objetivo";
const TEXTO_FRECUENCIA_ALTA = "Como entrenás 5 o más veces por semana, la recuperación y la hidratación son especialmente importantes.";
const TEXTO_OTRA_RESTRICCION = "Revisá la etiqueta de cada producto según tu restricción";
const TEXTO_SIN_COMPATIBLES = "No encontramos opciones compatibles con tu preferencia en nuestro catálogo";

// =====================================================================
// FUNCIONES
// =====================================================================

// 1) Seguridad y notas: junta todos los avisos que correspondan
function armarAvisos(respuestas, esRespaldo) {
  const avisos = [];

  if (respuestas.edad === "Menor de 18 años") {
    avisos.push(TEXTO_MENOR);
  }
  if (respuestas.condicion === "Sí") {
    avisos.push(TEXTO_CONDICION_SI);
  }
  if (respuestas.condicion === "Prefiero no responder") {
    avisos.push(TEXTO_CONDICION_NO_RESPONDE);
  }
  if (esRespaldo) {
    avisos.push(TEXTO_RESPALDO);
  }
  if (respuestas.frecuencia === "5 o más") {
    avisos.push(TEXTO_FRECUENCIA_ALTA);
  }
  if (respuestas.preferencia === "Otra") {
    avisos.push(TEXTO_OTRA_RESTRICCION);
  }

  return avisos;
}

// 2) Busca las categorías en la tabla de decisión; si no están, usa la de respaldo
function buscarCategorias(actividad, objetivo) {
  const fila = TABLA_DECISION.find(
    (f) => (f.actividad === actividad || f.actividad === "Cualquier actividad") && f.objetivo === objetivo
  );

  if (fila) {
    return { categorias: [fila.categoria1, fila.categoria2], esRespaldo: false };
  }

  const filaRespaldo = TABLA_RESPALDO.find((f) => f.objetivo === objetivo);
  return { categorias: [filaRespaldo.categoria1, filaRespaldo.categoria2], esRespaldo: true };
}

// 3) Frecuencia: con "1 a 2" veces se deja solo la Categoría 1
function aplicarFrecuencia(categorias, frecuencia) {
  if (frecuencia === "1 a 2") {
    return [categorias[0]];
  }
  return categorias;
}

// 4) Preferencia vegana: "Proteína en polvo" se reemplaza por "Proteína vegetal"
function aplicarPreferencia(categorias, preferencia) {
  if (preferencia !== "Vegana") {
    return categorias;
  }
  return categorias.map((c) => (c === "Proteína en polvo" ? "Proteína vegetal" : c));
}

// 5) Experiencia: elige el texto simple o el detallado
function obtenerExplicacion(categoria, experiencia) {
  if (experiencia === "Principiante (nunca usé)") {
    return EXPLICACIONES[categoria].simple;
  }
  return EXPLICACIONES[categoria].detallada;
}

// Convierte la respuesta de presupuesto en un precio máximo.
// Infinity significa "sin límite".
function topePresupuesto(presupuesto) {
  if (presupuesto === "Hasta $1.000") return 1000;
  if (presupuesto === "Entre $1.000 y $2.000") return 2000;
  if (presupuesto === "Entre $2.000 y $3.000") return 3000;
  return Infinity; // "Más de $3.000" o "No tengo un presupuesto definido"
}

// Ordena del más barato al más caro.
// Si primeroSinLactosa es true, pone antes los "Sin lactosa" y después los "Baja en lactosa".
function ordenarProductos(lista, primeroSinLactosa) {
  return lista.slice().sort((a, b) => {
    if (primeroSinLactosa && a.lactosa !== b.lactosa) {
      return a.lactosa === "Sin lactosa" ? -1 : 1;
    }
    return a.precio - b.precio;
  });
}

// 6) Productos de una categoría según preferencia y presupuesto
function obtenerProductos(categoria, preferencia, presupuesto) {
  const resultado = { productos: [], superaPresupuesto: false, sinCompatibles: false };

  // a) Barras con vegana o sin lactosa: el catálogo no informa esos datos
  if (categoria === "Barras / snacks proteicos" && (preferencia === "Vegana" || preferencia === "Sin lactosa")) {
    resultado.sinCompatibles = true;
    return resultado;
  }

  // a) Productos compatibles con la preferencia
  const esProteinaSinLactosa = categoria === "Proteína en polvo" && preferencia === "Sin lactosa";
  let compatibles;
  if (esProteinaSinLactosa) {
    // Se muestran las proteínas vegetales y la isolate "Baja en lactosa"; se ocultan las que "Contienen"
    compatibles = CATALOGO.filter(
      (p) => p.categoria === "Proteína vegetal" || (p.categoria === "Proteína en polvo" && p.lactosa === "Baja en lactosa")
    );
  } else {
    compatibles = CATALOGO.filter((p) => p.categoria === categoria);
  }

  // b) Filtro por presupuesto
  const tope = topePresupuesto(presupuesto);
  const dentroDelPresupuesto = compatibles.filter((p) => p.precio <= tope);

  // c) Orden
  if (dentroDelPresupuesto.length > 0) {
    resultado.productos = ordenarProductos(dentroDelPresupuesto, esProteinaSinLactosa);
    return resultado;
  }

  // d) Ninguno entra: se muestra el más económico de los compatibles
  const masBarato = ordenarProductos(compatibles, false)[0];
  resultado.productos = [masBarato];
  resultado.superaPresupuesto = true;
  return resultado;
}

// =====================================================================
// FUNCIÓN PRINCIPAL (la que usa app.js)
// =====================================================================

function recomendar(respuestas) {
  // Si hay condición médica, se muestran categorías pero no productos
  const mostrarProductos = respuestas.condicion !== "Sí";

  // Tabla de decisión o de respaldo
  const busqueda = buscarCategorias(respuestas.actividad, respuestas.objetivo);

  // Avisos de seguridad y notas
  const avisos = armarAvisos(respuestas, busqueda.esRespaldo);

  // Reglas secundarias que cambian las categorías
  let categorias = aplicarFrecuencia(busqueda.categorias, respuestas.frecuencia);
  categorias = aplicarPreferencia(categorias, respuestas.preferencia);

  // Para cada categoría: explicación y productos
  const categoriasResultado = categorias.map((nombre) => {
    const item = {
      nombre: nombre,
      explicacion: obtenerExplicacion(nombre, respuestas.experiencia),
      productos: [],
      superaPresupuesto: false,
      mensaje: ""
    };

    if (mostrarProductos) {
      const datos = obtenerProductos(nombre, respuestas.preferencia, respuestas.presupuesto);
      item.productos = datos.productos;
      item.superaPresupuesto = datos.superaPresupuesto;
      if (datos.sinCompatibles) {
        item.mensaje = TEXTO_SIN_COMPATIBLES;
      }
    }

    return item;
  });

  return {
    avisos: avisos,
    mostrarProductos: mostrarProductos,
    categorias: categoriasResultado
  };
}
