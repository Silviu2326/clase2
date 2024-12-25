import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import logo from './logo.jpeg';
import problemasEducativos from '../data/problemas-educativos.json';
import { translations } from '../translations/translations';

const obtenerDetallesTrastorno = (nombreTrastorno) => {
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

const obtenerSolucionesPorTrastorno = (alumno) => {
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

const datosIniciales = [
  {
    id: 1,
    nombre: 'Bus Year 10 - P1',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'TDAH',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades SEMH',
      descripcion: '(Social, Emocional y Salud Mental)'
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'Apoyo en clase (Matemáticas)',
      'Psicólogo externo: Nadal San Bartolomew',
      '25% de tiempo extra en exámenes',
      'Informe externo (Isabel Yague, 2021)',
      'TDAH-I (tipo inatento)'
    ]
  },
  {
    id: 2,
    nombre: 'Bus Year 10 - P2',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia',
    trastornoPsicologico2: 'TDAH',
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades de lectura y escritura',
      descripcion: 'Problemas de ortografía y decodificación'
    },
    conductaAula2: {
      titulo: 'Dificultades atencionales',
      descripcion: 'Dificultad para mantener la atención, impulsividad, posible hiperactividad'
    },
    conductaAula3: null,
    soluciones: [
      'Programa SNIP de enseñanza de precisión en casa (inicia octubre 2024)',
      '(Sin ajustes extra indicados en la tabla)',
      'Diagnóstico oficial: Dislexia + TDAH',
      'Info adicional: "Diagnosed with dyslexia in June 2024 (internal evaluation)"'
    ]
  },
  {
    id: 3,
    nombre: 'Bus Year 10 - P3',
    descripcion: '(Monitor, Diagnóstico formal: No)',
    trastornoPsicologico1: null,
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: null,
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      '(Ningún apoyo o acceso extra detallado en la tabla)',
      'Observaciones: Se han reportado problemas de comportamiento ("Behaviour issues") sin diagnóstico formal'
    ]
  },
  {
    id: 4,
    nombre: 'Bus Year 10 - P4',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Problemas de comprensión lectora y escritura',
      descripcion: 'Dificultades específicas en el procesamiento de texto escrito'
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'Asistencia a apoyo especializado',
      '25% de tiempo extra en exámenes',
      'Info adicional: "Dyslexia (internal assessment June 2024)"'
    ]
  },
  {
    id: 5,
    nombre: 'Bus Year 11 - P1',
    descripcion: '(Monitor, Diagnóstico formal: No)',
    trastornoPsicologico1: null,
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: null,
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'Observaciones generales:',
      '- Dificultades en Cognición y Aprendizaje (C&L)',
      '- Dificultades Sociales, Emocionales y de Salud Mental (SEMH)',
      '- Comportamiento deficiente en ocasiones (desinterés y bajo rendimiento)',
      'Info adicional: «Poor behaviour at times and can be quite disengaged, not performing to ability level»'
    ]
  },
  {
    id: 6,
    nombre: 'Bus Year 11 - P2',
    descripcion: '(Wave 3, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'APD (Trastorno del Procesamiento Auditivo)',
    trastornoPsicologico2: 'TDA (Trastorno por Déficit de Atención)',
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades de procesamiento auditivo',
      descripcion: 'Dificultad para procesar la información auditiva, problemas para seguir instrucciones orales'
    },
    conductaAula2: {
      titulo: 'Dificultades atencionales',
      descripcion: 'Falta de atención, desconexión frecuente de la tarea, impulsividad leve'
    },
    conductaAula3: null,
    soluciones: [
      'Sesiones de apoyo SEMH (1 hora PSHE) y plan de cuidados con el equipo pastoral',
      '25% de tiempo extra en exámenes',
      'Adicional: «ADD and APD»',
      'Comentario: «Poor behaviour at times, not performing to ability level»'
    ]
  },
  {
    id: 7,
    nombre: 'Bus Year 11 - P3',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia (SpLD)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: '(C&L)'
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      '25% de tiempo extra en exámenes',
      'Adicional: «DYSLEXIA»'
    ]
  },
  {
    id: 8,
    nombre: 'Travel Y13.2 - P1',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia (SpLD)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: null
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'SEN Support: Ninguno',
      'Acceso: 25% de tiempo extra',
      'Info adicional: "Dyslexia SpLD"'
    ]
  },
  {
    id: 9,
    nombre: 'Travel Y13.2 - P2',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia (SpLD)',
    trastornoPsicologico2: 'TDAH',
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: null
    },
    conductaAula2: {
      titulo: 'Dificultad de atención',
      descripcion: '(hiperactividad/impulsividad)'
    },
    conductaAula3: null,
    soluciones: [
      'SEN Support: Ninguno',
      'Acceso: 25% de tiempo extra',
      'Info adicional: "Dyslexia"'
    ]
  },
  {
    id: 10,
    nombre: 'Travel Y13.2 - P3',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia (SpLD)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: null
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'SEN Support: Ninguno',
      'Acceso: 25% de tiempo extra',
      'Info adicional: "WISC report completed by school psychologist 2022"'
    ]
  },
  {
    id: 11,
    nombre: 'Travel Y13.2 - P4',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'Dislexia (SpLD)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: null
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'SEN Support: Ninguno',
      'Acceso: 25% de tiempo extra',
      'Info adicional: "Dyslexia"'
    ]
  },
  {
    id: 12,
    nombre: 'BTEC Y13 - P1',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'SpLD (Dificultad Específica de Aprendizaje)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades en Cognición y Aprendizaje',
      descripcion: null
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'SEN Support: Ninguno',
      'Acceso: 25% de tiempo extra',
      'Info adicional: "External assessment (2021) SpLD"'
    ]
  },
  {
    id: 13,
    nombre: 'BTEC Y12 - P1',
    descripcion: '(Monitor, Diagnóstico formal: No)',
    trastornoPsicologico1: 'SEMH (Social, Emocional y Salud Mental)',
    trastornoPsicologico2: null,
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Dificultades de manejo de la ira y salud mental',
      descripcion: null
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'Apoyo externo: Psicólogo',
      'Info adicional: "Anger management issues & mental health difficulties"'
    ]
  }
];

function TablaAlumnos({ language }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [filtro, setFiltro] = useState('');
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
  const [categoriaExpandida, setCategoriaExpandida] = useState({});
  const t = translations[language];

  const toggleConducta = (alumnoId, conductaIndex) => {
    setConductasExpandidas(prev => ({
      ...prev,
      [`${alumnoId}-${conductaIndex}`]: !prev[`${alumnoId}-${conductaIndex}`]
    }));
  };

  const toggleSolucion = (alumnoId, trastorno) => {
    setSolucionesExpandidas(prev => ({
      ...prev,
      [alumnoId]: {
        ...prev[alumnoId],
        [trastorno]: !prev[alumnoId]?.[trastorno]
      }
    }));
  };

  const toggleCategoria = (alumnoId, trastorno, categoria) => {
    const key = `${alumnoId}-${trastorno}-${categoria}`;
    setCategoriaExpandida(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const datosFiltrados = useMemo(() => {
    if (!filtro) return datos;
    
    const terminoBusqueda = filtro.toLowerCase();
    return datos.filter(alumno => {
      // Buscar en nombre y descripción
      if (
        alumno.nombre.toLowerCase().includes(terminoBusqueda) ||
        (alumno.descripcion && alumno.descripcion.toLowerCase().includes(terminoBusqueda))
      ) return true;

      // Buscar en trastornos
      if (
        (alumno.trastornoPsicologico1 && alumno.trastornoPsicologico1.toLowerCase().includes(terminoBusqueda)) ||
        (alumno.trastornoPsicologico2 && alumno.trastornoPsicologico2.toLowerCase().includes(terminoBusqueda)) ||
        (alumno.trastornoPsicologico3 && alumno.trastornoPsicologico3.toLowerCase().includes(terminoBusqueda))
      ) return true;

      // Buscar en conductas
      const conductas = [alumno.conductaAula1, alumno.conductaAula2, alumno.conductaAula3].filter(Boolean);
      const conductaEncontrada = conductas.some(conducta => 
        conducta.titulo.toLowerCase().includes(terminoBusqueda) ||
        (conducta.descripcion && conducta.descripcion.toLowerCase().includes(terminoBusqueda))
      );
      if (conductaEncontrada) return true;

      // Buscar en soluciones
      const solucionEncontrada = alumno.soluciones.some(solucion =>
        solucion.toLowerCase().includes(terminoBusqueda)
      );
      if (solucionEncontrada) return true;

      // Buscar en detalles de trastornos del JSON
      const trastornos = [
        alumno.trastornoPsicologico1,
        alumno.trastornoPsicologico2,
        alumno.trastornoPsicologico3
      ].filter(Boolean);

      const detallesTrastornos = trastornos.map(obtenerDetallesTrastorno).filter(Boolean);
      
      return detallesTrastornos.some(detalle => {
        // Buscar en conductas del JSON
        const conductasEncontradas = detalle.conductas.some(conducta =>
          conducta.tipo.toLowerCase().includes(terminoBusqueda) ||
          conducta.manifestaciones.some(m => m.toLowerCase().includes(terminoBusqueda))
        );
        if (conductasEncontradas) return true;

        // Buscar en soluciones del JSON
        return detalle.soluciones.some(solucion =>
          solucion.categoria.toLowerCase().includes(terminoBusqueda) ||
          solucion.estrategias.some(e => e.toLowerCase().includes(terminoBusqueda))
        );
      });
    });
  }, [datos, filtro]);

  const renderConducta = (alumno, conductaAula, index) => {
    if (!conductaAula) return null;

    const trastornos = [
      alumno.trastornoPsicologico1,
      alumno.trastornoPsicologico2,
      alumno.trastornoPsicologico3
    ].filter(Boolean);

    const detallesTrastornos = trastornos.map(obtenerDetallesTrastorno).filter(Boolean);
    const conductasRelacionadas = detallesTrastornos.flatMap(detalle => detalle.conductas);
    const isExpanded = conductasExpandidas[`${alumno.id}-${index}`];

    return (
      <div className="relative">
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
          onClick={() => toggleConducta(alumno.id, index)}
        >
          <div className="flex-1">
            <div className="text-sm text-gray-900 dark:text-white flex items-center">
              {conductaAula.titulo}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-1 text-gray-500" />
              )}
            </div>
            {conductaAula.descripcion && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {conductaAula.descripcion}
              </div>
            )}
          </div>
        </div>
        
        {isExpanded && conductasRelacionadas.length > 0 && (
          <div className="mt-2 text-xs border-l-2 border-gray-200 dark:border-gray-600 pl-3">
            {conductasRelacionadas.map((conducta, idx) => (
              <div key={idx} className="mb-2">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  {conducta.tipo}
                </div>
                <ul className="mt-1 space-y-1">
                  {conducta.manifestaciones.map((manifestacion, midx) => (
                    <li key={midx} className="text-gray-600 dark:text-gray-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                      {manifestacion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSoluciones = (alumno) => {
    const solucionesPorTrastorno = obtenerSolucionesPorTrastorno(alumno);

    return (
      <div className="space-y-2">
        {Object.entries(solucionesPorTrastorno).map(([key, { nombre, soluciones }]) => (
          <div key={key} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSolucion(alumno.id, key)}
              className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{nombre}</span>
              {solucionesExpandidas[alumno.id]?.[key] ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {solucionesExpandidas[alumno.id]?.[key] && (
              <div className="p-2 space-y-2">
                {soluciones.map((solucion, index) => (
                  <div key={index} className="border rounded">
                    <button
                      onClick={() => toggleCategoria(alumno.id, key, solucion.categoria)}
                      className="w-full px-3 py-1.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                      <span className="text-sm text-gray-600 dark:text-gray-400">{solucion.categoria}</span>
                      {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] ? (
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      ) : (
                        <ChevronRight className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                    
                    {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] && (
                      <ul className="p-2 space-y-1">
                        {solucion.estrategias.map((estrategia, idx) => (
                          <li key={idx} className="text-xs text-gray-600 dark:text-gray-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                            {estrategia}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t.search}
              className="pl-9 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-64"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.nameDescription}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.disorder1}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.disorder2}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.disorder3}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.behaviors1}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.behaviors2}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.behaviors3}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {t.columns.solutions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{alumno.nombre}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{alumno.descripcion}</div>
                </td>
                <td className="px-4 py-3">
                  {alumno.trastornoPsicologico1 && (
                    <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {alumno.trastornoPsicologico1}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {alumno.trastornoPsicologico2 && (
                    <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                      {alumno.trastornoPsicologico2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {alumno.trastornoPsicologico3 && (
                    <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {alumno.trastornoPsicologico3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {renderConducta(alumno, alumno.conductaAula1, 1)}
                </td>
                <td className="px-4 py-3">
                  {renderConducta(alumno, alumno.conductaAula2, 2)}
                </td>
                <td className="px-4 py-3">
                  {renderConducta(alumno, alumno.conductaAula3, 3)}
                </td>
                <td className="px-4 py-3">
                  {renderSoluciones(alumno)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaAlumnos;
