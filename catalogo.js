// catalogo.js
// Datos de los productos de Suplementa.
// Los precios son de referencia y se relevaron en la fecha indicada abajo.
// Los links están pendientes de verificar: mientras un producto tenga link: null,
// el botón "Ver en tienda" se muestra deshabilitado con el texto "Link pendiente".

// Fecha del relevamiento de precios (se cambia solo acá)
const FECHA_RELEVAMIENTO = "octubre de 2026";

// Lista de productos.
// precio: número en pesos uruguayos, sin signo ni puntos (se formatea al mostrarlo)
// promocion: true si el producto está en promoción
// vegano y lactosa: texto según la tabla, o null cuando no aplica a la categoría
const CATALOGO = [
  // ----- Proteína en polvo -----
  {
    categoria: "Proteína en polvo",
    nombre: "100% Whey 2 lb ENA Vainilla",
    tienda: "Wikimúsculos",
    precio: 3290,
    promocion: false,
    vegano: "No",
    lactosa: "Contiene",
    link: null
  },
  {
    categoria: "Proteína en polvo",
    nombre: "Whey Protein True Made 2 lb ENA",
    tienda: "Wikimúsculos",
    precio: 3690,
    promocion: false,
    vegano: "No",
    lactosa: "Contiene",
    link: null
  },
  {
    categoria: "Proteína en polvo",
    nombre: "Whey Protein Sylab 400 g",
    tienda: "El Túnel",
    precio: 940,
    promocion: false,
    vegano: "No",
    lactosa: "Contiene",
    link: null
  },
  {
    categoria: "Proteína en polvo",
    nombre: "Whey Protein Sylab 800 g",
    tienda: "El Túnel",
    precio: 1565,
    promocion: false,
    vegano: "No",
    lactosa: "Contiene",
    link: null
  },
  {
    categoria: "Proteína en polvo",
    nombre: "Platinum 100% Whey Isolate 930 g",
    tienda: "Farmashop",
    precio: 3122,
    promocion: false,
    vegano: "No",
    lactosa: "Baja en lactosa",
    link: null
  },

  // ----- Proteína vegetal -----
  {
    categoria: "Proteína vegetal",
    nombre: "Power Vegan Protein Cibeles",
    tienda: "Wikimúsculos",
    precio: 3400,
    promocion: false,
    vegano: "Sí",
    lactosa: "Sin lactosa",
    link: null
  },
  {
    categoria: "Proteína vegetal",
    nombre: "Vegan Protein Vitalabs 454 g Vainilla",
    tienda: "Wikimúsculos",
    precio: 2390,
    promocion: false,
    vegano: "Sí",
    lactosa: "Sin lactosa",
    link: null
  },
  {
    categoria: "Proteína vegetal",
    nombre: "Vegan Protein Vitalabs 907 g Vainilla",
    tienda: "Wikimúsculos",
    precio: 4290,
    promocion: false,
    vegano: "Sí",
    lactosa: "Sin lactosa",
    link: null
  },

  // ----- Creatina -----
  {
    categoria: "Creatina",
    nombre: "Creatina Monohidrato Sylab 120 g",
    tienda: "Wikimúsculos",
    precio: 760,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },
  {
    categoria: "Creatina",
    nombre: "Creatina Celsius 120 g",
    tienda: "Farmashop",
    precio: 717,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },
  {
    categoria: "Creatina",
    nombre: "Creatina Celsius 400 g",
    tienda: "Farmashop",
    precio: 1998,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },

  // ----- Electrolitos / hidratación -----
  {
    categoria: "Electrolitos / hidratación",
    nombre: "Electrolitos Lytos 180 g",
    tienda: "Farmashop",
    precio: 1590,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },
  {
    categoria: "Electrolitos / hidratación",
    nombre: "Power Drink Naranja 500 g",
    tienda: "El Túnel",
    precio: 1235,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },

  // ----- Carbohidratos / energía -----
  {
    categoria: "Carbohidratos / energía",
    nombre: "Hammer Gel 33 g",
    tienda: "El Túnel",
    precio: 184,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },
  {
    categoria: "Carbohidratos / energía",
    nombre: "Ena Energy Gel Limón 40 g",
    tienda: "El Túnel",
    precio: 120,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },

  // ----- Recuperación deportiva -----
  {
    categoria: "Recuperación deportiva",
    nombre: "BCAA 1400 Sylab 60 cápsulas",
    tienda: "El Túnel",
    precio: 584,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },
  {
    categoria: "Recuperación deportiva",
    nombre: "Glutamina 100% Pure Glutamine 300 g Gold Nutrition",
    tienda: "Wikimúsculos",
    precio: 2090,
    promocion: false,
    vegano: null,
    lactosa: null,
    link: null
  },

  // ----- Barras / snacks proteicos -----
  {
    categoria: "Barras / snacks proteicos",
    nombre: "Protein Bar ENA caja x16",
    tienda: "Wikimúsculos",
    precio: 627,
    promocion: true,
    vegano: "No informado",
    lactosa: "No informado",
    link: null
  }
];
