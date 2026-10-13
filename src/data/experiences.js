// Datos y fotografías extraídos de los HTML aportados, no disponibilidad en tiempo real.
import { publicAsset } from '../lib/publicAsset.js'

export const experiences = [
  {
    "id": "death-road",
    "name": "El Camino de la Muerte",
    "image": publicAsset('images/inicio-02.jpg'),
    "imageAlt": "Ciclista descendiendo por el Camino de la Muerte en los Yungas",
    "bookingImage": publicAsset('images/reservas-02.jpg'),
    "category": "Ciclismo",
    "icon": "person-biking",
    "location": "La Paz, Bolivia",
    "description": "Descenso legendario en bicicleta desde 4.700 m hasta 1.200 m s. n. m. por caminos de tierra al borde del abismo, entre montañas, nubes y selva de los Yungas.",
    "duration": "1 día completo",
    "altitude": "4.700 - 1.200 m",
    "difficulty": "Alta",
    "departure": "06:00 a.m.",
    "price": "450"
  },
  {
    "id": "el-choro",
    "name": "El Camino del Choro",
    "image": publicAsset('images/inicio-03.jpg'),
    "imageAlt": "Senderistas en la Cordillera Real rumbo a El Choro",
    "bookingImage": publicAsset('images/reservas-03.jpg'),
    "category": "Trekking",
    "icon": "person-hiking",
    "location": "Cordillera Real, Bolivia",
    "description": "Sendero precolombino de 3 a 4 días que cruza la Cordillera Real. Empedrados milenarios, puentes colgantes, bosques nublados y paisajes únicos.",
    "duration": "3 - 4 días",
    "altitude": "4.800 - 1.200 m",
    "difficulty": "Moderada",
    "departure": "06:00 a.m.",
    "price": "850"
  },
  {
    "id": "isla-del-sol",
    "name": "Isla del Sol",
    "image": publicAsset('images/inicio-04.jpg'),
    "imageAlt": "Vista panorámica de la Isla del Sol en el Lago Titicaca",
    "bookingImage": publicAsset('images/reservas-04.jpg'),
    "category": "Trekking cultural",
    "icon": "landmark-dome",
    "location": "Lago Titicaca, Bolivia",
    "description": "Sendero cultural andino que recorre la isla de norte a sur. Terrazas prehispánicas, ruinas incas y vistas únicas de las aguas azul zafiro del Titicaca.",
    "duration": "1 - 2 días",
    "altitude": "3.812 m s. n. m.",
    "difficulty": "Moderada",
    "departure": "07:00 a.m.",
    "price": "600"
  },
  {
    "id": "pico-tunari",
    "name": "Pico Tunari",
    "image": publicAsset('images/inicio-05.jpg'),
    "imageAlt": "Majestuosa cumbre nevada del Pico Tunari en Cochabamba",
    "bookingImage": publicAsset('images/reservas-05.jpg'),
    "category": "Trekking de altura",
    "icon": "mountain",
    "location": "Cochabamba, Bolivia",
    "description": "Trekking de altura para conquistar la cumbre más emblemática de Cochabamba (5.035 m). Pasajes andinos, lagunas y una vista panorámica de 360°.",
    "duration": "1 - 2 días",
    "altitude": "5.035 m s. n. m.",
    "difficulty": "Alta",
    "departure": "06:00 a.m.",
    "price": "700"
  },
  {
    "id": "vacas",
    "name": "20 Lagunas de Vacas",
    "image": publicAsset('images/inicio-06.jpg'),
    "imageAlt": "Espejos de agua en las 20 Lagunas de Vacas Cochabamba",
    "bookingImage": publicAsset('images/reservas-06.jpg'),
    "category": "Trekking",
    "icon": "water",
    "location": "Cochabamba, Bolivia",
    "description": "Ruta de alta montaña con lagunas cristalinas, paisajes andinos y conexión con la naturaleza. Una experiencia única bajo el sol del altiplano.",
    "duration": "1 - 2 días",
    "altitude": "4.000 - 4.600 m",
    "difficulty": "Moderada",
    "departure": "06:00 a.m.",
    "price": "650"
  }
]

export const adviceOption = { id: 'asesoramiento', name: 'Necesito asesoramiento para elegir mi ruta' }
