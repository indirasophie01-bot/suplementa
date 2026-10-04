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
    simple: "Puede ayudarte a sumar proteína a tu alimentación de forma práctica, algo a considerar si entrenás con regularidad.",
    detallada: "Puede ayudarte a alcanzar tus requerimientos diarios de proteína de forma práctica, especialmente en etapas de mayor demanda física como el entrenamiento de fuerza. Es un complemento de la alimentación y no reemplaza las comidas, por lo que conviene considerarla según la proteína que ya incorporás con tu dieta habitual."
  },
  "Proteína vegetal": {
    simple: "Es una alternativa de proteína de origen vegetal que puede ayudarte a complementar tu alimentación sin ingredientes de origen animal.",
    detallada: "Es una alternativa a la proteína de suero (whey), elaborada a partir de fuentes vegetales, y puede ser una opción a considerar si seguís una alimentación vegana. Puede ayudarte a alcanzar tus requerimientos de proteína de forma práctica. Al elegir una, vale la pena revisar en la etiqueta de qué fuentes vegetales proviene."
  },
  "Creatina": {
    simple: "Es uno de los suplementos más estudiados y puede ayudar en entrenamientos cortos e intensos.",
    detallada: "Es uno de los suplementos más estudiados y utilizados. Puede contribuir al rendimiento en entrenamientos de alta intensidad y a la mejora progresiva de la fuerza y la potencia. No es un estimulante: su posible aporte se asocia al uso sostenido junto con un entrenamiento constante."
  },
  "Electrolitos / hidratación": {
    simple: "Pueden ayudarte a reponer las sales minerales que se pierden al transpirar, algo a considerar en entrenamientos largos o con calor.",
    detallada: "Aportan sales minerales, como sodio y potasio, que se pierden con el sudor. Pueden contribuir a mantener una buena hidratación en entrenamientos prolongados, intensos o con calor. No reemplazan el consumo de agua: son un complemento a considerar según la duración y las condiciones de tu actividad."
  },
  "Carbohidratos / energía": {
    simple: "Son una fuente de energía práctica que puede ser útil durante entrenamientos o competencias largas.",
    detallada: "Son geles y otros productos con carbohidratos de rápida absorción, pensados para aportar energía durante esfuerzos prolongados. Pueden ayudar a sostener el rendimiento cuando la actividad se extiende en el tiempo, como en running o ciclismo de larga distancia. Conviene probarlos primero en entrenamientos y no usarlos por primera vez en una competencia."
  },
  "Recuperación deportiva": {
    simple: "Son productos que se usan habitualmente después de entrenar, como complemento de una buena alimentación y del descanso.",
    detallada: "Incluye aminoácidos como los BCAA y la glutamina, que se usan habitualmente en la etapa posterior al entrenamiento. La evidencia sobre sus beneficios es más limitada que la de otros suplementos, por lo que conviene verlos como un complemento opcional. La base de la recuperación sigue siendo una alimentación adecuada, la hidratación y el descanso."
  },
  "Barras / snacks proteicos": {
    simple: "Son una forma práctica de sumar proteína entre comidas o cuando estás fuera de casa.",
    detallada: "Pueden ser una opción práctica para sumar proteína entre comidas, sobre todo cuando no tenés tiempo de preparar algo. Además de proteína, suelen aportar carbohidratos y grasas, por lo que conviene revisar la etiqueta. Son un complemento de la alimentación y no reemplazan las comidas."
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
