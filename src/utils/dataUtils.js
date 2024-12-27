import problemasEducativos from '../data/problemas-educativos.json';

export const obtenerDetallesTrastorno = (nombreTrastorno) => {
  if (!nombreTrastorno) return null;
  
  const nombreNormalizado = nombreTrastorno.toLowerCase();
  const mapeoTrastornos = {
    'tdah': 'Trastorno por Déficit de Atención e Hiperactividad',
    'dislexia': 'Dificultades Específicas del Aprendizaje',
    'apd': 'Trastorno del Procesamiento Auditivo',
    'tda': 'Trastorno por Déficit de Atención e Hiperactividad',
    'spld': 'Dificultades Específicas del Aprendizaje'
  };

  const categoriaBuscada = mapeoTrastornos[nombreNormalizado] || nombreTrastorno;
  
  return problemasEducativos.problemas.find(
    problema => problema.categoria.toLowerCase() === categoriaBuscada.toLowerCase()
  );
};

export const obtenerSolucionesPorTrastorno = (alumno) => {
  const solucionesPorTrastorno = {};
  const solucionesEspecificas = {
    nombre: 'Soluciones Específicas',
    soluciones: [{
      categoria: 'Personalizadas',
      estrategias: alumno.soluciones || []
    }]
  };

  // Obtener soluciones de cada trastorno
  [
    { nombre: alumno.trastornoPsicologico1, orden: 1 },
    { nombre: alumno.trastornoPsicologico2, orden: 2 },
    { nombre: alumno.trastornoPsicologico3, orden: 3 }
  ]
    .filter(t => t.nombre)
    .forEach(trastorno => {
      const detalles = obtenerDetallesTrastorno(trastorno.nombre);
      if (detalles) {
        solucionesPorTrastorno[`trastorno${trastorno.orden}`] = {
          nombre: trastorno.nombre,
          soluciones: detalles.soluciones || []
        };
      }
    });

  return {
    solucionesEspecificas,
    ...solucionesPorTrastorno
  };
};

export const obtenerConductasPorTrastorno = (nombreTrastorno) => {
  if (!nombreTrastorno) return [];
  
  const detalles = obtenerDetallesTrastorno(nombreTrastorno);
  return detalles?.conductas || [];
};
