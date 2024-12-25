import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, Eye, EyeOff } from 'lucide-react';
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

const obtenerConductasPorTrastorno = (nombreTrastorno) => {
  if (!nombreTrastorno) return [];
  
  const detalles = obtenerDetallesTrastorno(nombreTrastorno);
  return detalles?.conductas || [];
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
      descripcion: '(Social, Emocional y Salud Mental)',
      detalles: [
        'Dificultades sociales y emocionales',
        'Problemas de salud mental',
        'Impacto en el rendimiento académico'
      ]
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
      descripcion: 'Problemas de ortografía y decodificación',
      detalles: [
        'Dificultades en la lectura',
        'Problemas de ortografía',
        'Dificultades en la decodificación de texto'
      ]
    },
    conductaAula2: {
      titulo: 'Dificultades atencionales',
      descripcion: 'Dificultad para mantener la atención, impulsividad, posible hiperactividad',
      detalles: [
        'Problemas para mantener la atención',
        'Comportamiento impulsivo',
        'Signos de hiperactividad'
      ]
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
      descripcion: 'Dificultades específicas en el procesamiento de texto escrito',
      detalles: [
        'Dificultades en la comprensión lectora',
        'Problemas en la expresión escrita',
        'Dificultades en el procesamiento de texto'
      ]
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
      descripcion: 'Dificultad para procesar la información auditiva, problemas para seguir instrucciones orales',
      detalles: [
        'Problemas para procesar información auditiva',
        'Dificultad para seguir instrucciones orales',
        'Necesidad de apoyo visual adicional'
      ]
    },
    conductaAula2: {
      titulo: 'Dificultades atencionales',
      descripcion: 'Falta de atención, desconexión frecuente de la tarea, impulsividad leve',
      detalles: [
        'Desconexión frecuente durante las tareas',
        'Dificultad para mantener la atención',
        'Signos de impulsividad leve'
      ]
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
      descripcion: '(C&L)',
      detalles: [
        'Dificultades en el procesamiento de información',
        'Problemas de aprendizaje específicos',
        'Necesidad de apoyo adicional'
      ]
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
      descripcion: null,
      detalles: [
        'Dificultades específicas de aprendizaje',
        'Necesidad de apoyo en tareas de lectura y escritura',
        'Adaptaciones necesarias en evaluaciones'
      ]
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
      descripcion: null,
      detalles: [
        'Dificultades en el procesamiento de información',
        'Problemas de lectura y escritura',
        'Necesidad de adaptaciones específicas'
      ]
    },
    conductaAula2: {
      titulo: 'Dificultad de atención',
      descripcion: '(hiperactividad/impulsividad)',
      detalles: [
        'Problemas de concentración',
        'Comportamiento hiperactivo',
        'Dificultad para controlar impulsos'
      ]
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
      descripcion: null,
      detalles: [
        'Dificultades en el procesamiento de información',
        'Necesidad de apoyo en tareas académicas',
        'Adaptaciones para evaluaciones'
      ]
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
      descripcion: null,
      detalles: [
        'Dificultades específicas de aprendizaje',
        'Problemas en el procesamiento de información',
        'Necesidad de adaptaciones académicas'
      ]
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
      descripcion: null,
      detalles: [
        'Dificultades específicas en el aprendizaje',
        'Necesidad de adaptaciones académicas',
        'Apoyo específico en tareas'
      ]
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
      descripcion: null,
      detalles: [
        'Problemas en el manejo de la ira',
        'Dificultades emocionales',
        'Necesidad de apoyo en salud mental'
      ]
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: [
      'Apoyo externo: Psicólogo',
      'Info adicional: "Anger management issues & mental health difficulties"'
    ]
  }
];

function TablaAlumnosAlternativa({ language }) {
  const [datos, setDatos] = useState(datosIniciales);
  const [filtro, setFiltro] = useState('');
  const [columnaOrden, setColumnaOrden] = useState(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [columnasVisibles, setColumnasVisibles] = useState({
    nombre: true,
    trastorno1: true,
    trastorno2: true,
    trastorno3: true,
    conducta1: true,
    conducta2: true,
    conducta3: true,
    soluciones: true
  });
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
  const [categoriaExpandida, setCategoriaExpandida] = useState({});
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [manifestacionesExpandidas, setManifestacionesExpandidas] = useState({});
  const t = translations[language];

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

  const toggleConducta = (alumnoId, trastorno, conductaIndex) => {
    const key = `${alumnoId}-${trastorno}-${conductaIndex}`;
    setConductasExpandidas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleManifestaciones = (alumnoId, trastorno, conductaIndex) => {
    const key = `${alumnoId}-${trastorno}-${conductaIndex}`;
    setManifestacionesExpandidas(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleColumna = (columna) => {
    setColumnasVisibles(prev => ({
      ...prev,
      [columna]: !prev[columna]
    }));
  };

  const handleOrdenar = (columna) => {
    if (columnaOrden === columna) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  const datosFiltrados = useMemo(() => {
    if (!filtro) return datos;
    
    const filtroLower = filtro.toLowerCase();
    return datos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(filtroLower) ||
      alumno.descripcion.toLowerCase().includes(filtroLower) ||
      (alumno.trastornoPsicologico1 && alumno.trastornoPsicologico1.toLowerCase().includes(filtroLower)) ||
      (alumno.trastornoPsicologico2 && alumno.trastornoPsicologico2.toLowerCase().includes(filtroLower)) ||
      (alumno.trastornoPsicologico3 && alumno.trastornoPsicologico3.toLowerCase().includes(filtroLower))
    );
  }, [datos, filtro]);

  const datosOrdenados = useMemo(() => {
    if (!columnaOrden) return datosFiltrados;

    return [...datosFiltrados].sort((a, b) => {
      let valorA, valorB;

      switch (columnaOrden) {
        case 'nombre':
          valorA = a.nombre;
          valorB = b.nombre;
          break;
        case 'trastorno1':
          valorA = a.trastornoPsicologico1 || '';
          valorB = b.trastornoPsicologico1 || '';
          break;
        case 'trastorno2':
          valorA = a.trastornoPsicologico2 || '';
          valorB = b.trastornoPsicologico2 || '';
          break;
        case 'trastorno3':
          valorA = a.trastornoPsicologico3 || '';
          valorB = b.trastornoPsicologico3 || '';
          break;
        default:
          return 0;
      }

      if (ordenAscendente) {
        return valorA.localeCompare(valorB);
      } else {
        return valorB.localeCompare(valorA);
      }
    });
  }, [datosFiltrados, columnaOrden, ordenAscendente]);

  const renderSoluciones = (alumno) => {
    const solucionesPorTrastorno = obtenerSolucionesPorTrastorno(alumno);

    return (
      <div className="space-y-2">
        {Object.entries(solucionesPorTrastorno).map(([key, { nombre, soluciones }]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSolucion(alumno.id, key)}
              className="w-full px-4 py-2 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
            >
              <span className="font-medium text-sm text-gray-700">{nombre}</span>
              {solucionesExpandidas[alumno.id]?.[key] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {solucionesExpandidas[alumno.id]?.[key] && (
              <div className="p-2 space-y-2">
                {soluciones.map((solucion, index) => (
                  <div key={index} className="border border-gray-100 rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleCategoria(alumno.id, key, solucion.categoria)}
                      className="w-full px-3 py-1.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="text-sm text-gray-600">{solucion.categoria}</span>
                      {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] ? (
                        <ChevronUp className="h-3 w-3 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                    
                    {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] && (
                      <ul className="p-2 space-y-1 bg-white">
                        {solucion.estrategias.map((estrategia, idx) => (
                          <li key={idx} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
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

  const renderConductas = (alumno, trastornoKey) => {
    const trastorno = alumno[trastornoKey];
    if (!trastorno || trastorno === t.none) return null;

    const conductas = obtenerConductasPorTrastorno(trastorno);
    if (!conductas.length) return null;

    return (
      <div className="space-y-2">
        {conductas.map((conducta, conductaIndex) => (
          <div key={conductaIndex} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleConducta(alumno.id, trastornoKey, conductaIndex)}
              className="w-full px-4 py-2 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
            >
              <span className="font-medium text-sm text-gray-700">{conducta.tipo}</span>
              {conductasExpandidas[`${alumno.id}-${trastornoKey}-${conductaIndex}`] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {conductasExpandidas[`${alumno.id}-${trastornoKey}-${conductaIndex}`] && (
              <div className="p-2">
                <div className="border border-gray-100 rounded-md overflow-hidden">
                  <button
                    onClick={() => toggleManifestaciones(alumno.id, trastornoKey, conductaIndex)}
                    className="w-full px-3 py-1.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                  >
                    <span className="text-sm text-gray-600">{t.manifestations}</span>
                    {manifestacionesExpandidas[`${alumno.id}-${trastornoKey}-${conductaIndex}`] ? (
                      <ChevronUp className="h-3 w-3 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-3 w-3 text-gray-400" />
                    )}
                  </button>
                  
                  {manifestacionesExpandidas[`${alumno.id}-${trastornoKey}-${conductaIndex}`] && (
                    <ul className="p-2 space-y-1 bg-white">
                      {conducta.manifestaciones.map((manifestacion, idx) => (
                        <li key={idx} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                          {manifestacion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-full bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              {t.management}
            </h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            <Plus className="w-5 h-5 inline-block mr-2" />
            {t.newStudent}
          </button>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="mb-6 flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={t.search}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 flex items-center space-x-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all">
          <Filter className="w-5 h-5 text-gray-500" />
          <span>{t.filters}</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50/50 dark:bg-gray-900/50">
                <th scope="col" className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleOrdenar('nombre')}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>{t.columns.name}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {columnaOrden === 'nombre' && (
                        ordenAscendente ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleOrdenar('trastorno1')}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>{t.columns.disorder1}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {columnaOrden === 'trastorno1' && (
                        ordenAscendente ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-gray-600 dark:text-gray-300">{t.columns.behavior1}</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleOrdenar('trastorno2')}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>{t.columns.disorder2}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {columnaOrden === 'trastorno2' && (
                        ordenAscendente ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-gray-600 dark:text-gray-300">{t.columns.behavior2}</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleOrdenar('trastorno3')}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>{t.columns.disorder3}</span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      {columnaOrden === 'trastorno3' && (
                        ordenAscendente ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-gray-600 dark:text-gray-300">{t.columns.behavior3}</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-gray-600 dark:text-gray-300">{t.columns.solutions}</span>
                </th>
                <th scope="col" className="px-6 py-3 text-left">
                  <span className="text-gray-600 dark:text-gray-300">{t.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {datosOrdenados.map((alumno) => (
                <tr key={alumno.id} className="group hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-gray-900 dark:text-white font-medium">{alumno.nombre}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/10 to-purple-500/10 text-indigo-600 dark:text-indigo-400">
                      {alumno.trastornoPsicologico1}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-600 dark:text-purple-400">
                      {alumno.trastornoPsicologico2}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-pink-500/10 to-rose-500/10 text-pink-600 dark:text-pink-400">
                      {alumno.trastornoPsicologico3}
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {renderConductas(alumno, 'trastornoPsicologico1')}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {renderConductas(alumno, 'trastornoPsicologico2')}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {renderConductas(alumno, 'trastornoPsicologico3')}
                  </td>
                  <td className="px-6 py-4">
                    {renderSoluciones(alumno)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="p-2 hover:bg-indigo-500/10 rounded-lg transition-colors">
                        <Pencil className="w-5 h-5 text-indigo-500" />
                      </button>
                      <button 
                        onClick={() => setDatos(datos.filter(alumno => alumno.id !== alumno.id))}
                        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablaAlumnosAlternativa;
