import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, Eye, EyeOff } from 'lucide-react';
import logo from './logo.jpeg';
import { translations } from '../translations/translations';

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

const solucionesComunesPorTrastorno = {
  'TDAH': [
    'Tiempo extra en exámenes (25%)',
    'Ubicación preferente en el aula',
    'Instrucciones claras y concisas',
    'Descansos frecuentes',
    'Recordatorios visuales',
    'Agenda estructurada'
  ],
  'Dislexia': [
    'Tiempo extra en exámenes (25%)',
    'Uso de lectores de texto',
    'Material adaptado',
    'Apoyo en lectoescritura',
    'Evaluación oral cuando sea posible',
    'Uso de recursos visuales'
  ],
  'APD': [
    'Ubicación preferente en el aula',
    'Instrucciones escritas',
    'Apoyo visual',
    'Reducción de ruido ambiental',
    'Tiempo extra para procesamiento',
    'Verificación de comprensión'
  ],
  'TDA': [
    'Tiempo extra en exámenes (25%)',
    'Ubicación preferente',
    'Instrucciones paso a paso',
    'Ambiente estructurado',
    'Recordatorios frecuentes',
    'Organización de tareas'
  ],
  'SpLD': [
    'Tiempo extra en exámenes (25%)',
    'Material adaptado',
    'Apoyo específico',
    'Instrucciones claras',
    'Uso de recursos adicionales',
    'Evaluación adaptada'
  ],
  'SEMH': [
    'Apoyo emocional',
    'Espacios tranquilos',
    'Tiempo de descanso',
    'Seguimiento individualizado',
    'Estrategias de autorregulación',
    'Plan de apoyo conductual'
  ]
};

const TablaAlumnosModerna = ({ language = 'es' }) => {
  const t = translations[language];
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});

  const handleOrdenamiento = (campo) => {
    const esAscendente = ordenamiento.campo === campo && ordenamiento.direccion === 'asc';
    setOrdenamiento({
      campo,
      direccion: esAscendente ? 'desc' : 'asc',
    });
  };

  const handleEliminar = (id) => {
    setDatos(datos.filter(alumno => alumno.id !== id));
  };

  const toggleConducta = (alumnoId, conductaIndex) => {
    setConductasExpandidas(prev => ({
      ...prev,
      [`${alumnoId}-${conductaIndex}`]: !prev[`${alumnoId}-${conductaIndex}`]
    }));
  };

  const toggleSolucion = (alumnoId) => {
    setSolucionesExpandidas(prev => ({
      ...prev,
      [alumnoId]: !prev[alumnoId]
    }));
  };

  const toggleSolucionPorTrastorno = (alumnoId, trastorno) => {
    setExpandedSolutions(prev => ({
      ...prev,
      [`${alumnoId}-${trastorno}`]: !prev[`${alumnoId}-${trastorno}`]
    }));
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter((alumno) =>
      Object.values(alumno).some((valor) =>
        String(valor).toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    );
  }, [datos, busquedaGlobal]);

  const renderConducta = (alumno, conductaKey, trastornoKey) => {
    const conducta = alumno[conductaKey];
    const trastorno = alumno[trastornoKey];
    const isExpanded = conductasExpandidas[`${alumno.id}-${conductaKey}`];

    if (!trastorno || !conducta) return null;

    return (
      <div className="relative">
        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-lg backdrop-blur-sm border border-white/10">
          <span className="text-gray-700 dark:text-gray-300 font-medium">{conducta.titulo}</span>
          <button
            onClick={() => toggleConducta(alumno.id, conductaKey)}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            {isExpanded ? (
              <EyeOff className="w-4 h-4 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            ) : (
              <Eye className="w-4 h-4 text-teal-400 group-hover:text-teal-300 transition-colors" />
            )}
          </button>
        </div>
        <div className={`mt-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-48' : 'max-h-0'}`}>
          <div className="space-y-1 p-3 bg-gradient-to-r from-teal-500/5 to-emerald-500/5 rounded-lg">
            {conducta.detalles.map((detalle, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 text-sm text-gray-600"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400"></div>
                <span>{detalle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSolucionesPorTrastorno = (trastorno) => {
    if (!trastorno) return null;
    
    // Extraer el tipo base del trastorno (por ejemplo, de "TDAH-I" obtener "TDAH")
    const tipoTrastorno = Object.keys(solucionesComunesPorTrastorno).find(tipo => 
      trastorno.toUpperCase().includes(tipo.toUpperCase())
    );
    
    if (!tipoTrastorno) return null;

    const soluciones = solucionesComunesPorTrastorno[tipoTrastorno];

    return (
      <div className="ml-4 text-sm text-gray-600">
        {soluciones.map((solucion, index) => (
          <div key={index} className="mb-1 flex items-start">
            <span className="mr-2">•</span>
            <span>{solucion}</span>
          </div>
        ))}
      </div>
    );
  };

  const renderTrastornoExpandible = (alumno, trastorno) => {
    if (!trastorno) return null;
    
    const isExpanded = expandedSolutions[`${alumno.id}-${trastorno}`];
    
    return (
      <div className="mb-2">
        <button
          onClick={() => toggleSolucionPorTrastorno(alumno.id, trastorno)}
          className="inline-flex items-center text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-2 py-1 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
        >
          {trastorno}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && renderSolucionesPorTrastorno(trastorno)}
      </div>
    );
  };

  const renderSolucionesColumna = (alumno) => {
    const trastornos = [
      alumno.trastornoPsicologico1,
      alumno.trastornoPsicologico2,
      alumno.trastornoPsicologico3
    ].filter(Boolean);

    if (trastornos.length === 0) {
      return (
        <div className="text-sm text-gray-500 italic">
          {t.noDisorders}
        </div>
      );
    }

    return (
      <div>
        {trastornos.map((trastorno, index) => (
          <div key={index}>
            {renderTrastornoExpandible(alumno, trastorno)}
          </div>
        ))}
      </div>
    );
  };

  const renderTrastornoSimple = (trastorno) => {
    if (!trastorno) return null;
    
    return (
      <div className="mb-1">
        <span className="inline-flex items-center text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-2 py-1 rounded-lg">
          {trastorno}
        </span>
      </div>
    );
  };

  const renderTrastorno = (trastorno, alumnoId) => {
    if (!trastorno) return null;
    
    const isExpanded = expandedSolutions[`${alumnoId}-${trastorno}`];
    
    return (
      <div className="mb-1">
        <button
          onClick={() => toggleSolucionPorTrastorno(alumnoId, trastorno)}
          className="inline-flex items-center text-sm bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-2 py-1 rounded-lg hover:from-teal-600 hover:to-emerald-600 transition-all"
        >
          {trastorno}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isExpanded && renderSolucionesPorTrastorno(trastorno)}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header con diseño moderno */}
      <div className="mb-8">
        <div className="bg-gradient-to-br from-teal-400 via-emerald-400 to-teal-500 rounded-2xl shadow-2xl overflow-hidden">
          <div className="backdrop-blur-sm bg-white/10 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-white/90 p-3 rounded-xl shadow-inner">
                  <img src={logo} alt="Logo" className="h-12 w-auto" />
                </div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {t.title}
                </h1>
              </div>
              <button className="px-5 py-2.5 bg-white/90 text-teal-600 rounded-xl flex items-center space-x-2 hover:bg-white transition-all shadow-lg hover:shadow-xl">
                <Plus className="w-5 h-5" />
                <span className="font-medium">{t.buttons.add}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-96 pl-12 pr-4 py-3 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="px-4 py-3 bg-white rounded-xl flex items-center space-x-2 text-gray-600 hover:bg-gray-50 transition-colors shadow-lg">
            <Filter className="w-5 h-5" />
            <span>{t.filters}</span>
          </button>
        </div>
      </div>

      {/* Tabla con diseño moderno */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th colSpan="9" className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {datosFiltrados.length} {t.studentsFound}
                    </span>
                  </div>
                </th>
              </tr>
              <tr className="bg-gray-50">
                <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleOrdenamiento('nombre')}>
                    <span>{t.columns.name}</span>
                    {ordenamiento.campo === 'nombre' && (
                      ordenamiento.direccion === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  {t.columns.psychologicalDisorders}
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  {t.columns.classroomBehaviors}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  {t.columns.solutions}
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  {t.columns.actions}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {datosFiltrados.map((alumno) => (
                <tr 
                  key={alumno.id} 
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200">
                    <div className="text-sm font-medium text-gray-900">
                      {alumno.nombre}
                    </div>
                    <div className="text-sm text-gray-500">{alumno.descripcion}</div>
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderTrastornoSimple(alumno.trastornoPsicologico1)}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderTrastornoSimple(alumno.trastornoPsicologico2)}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderTrastornoSimple(alumno.trastornoPsicologico3)}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderConducta(alumno, 'conductaAula1', 'trastornoPsicologico1')}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderConducta(alumno, 'conductaAula2', 'trastornoPsicologico2')}
                  </td>
                  <td className="px-4 py-4 border-r border-gray-200">
                    {renderConducta(alumno, 'conductaAula3', 'trastornoPsicologico3')}
                  </td>
                  <td className="px-6 py-4 border-r border-gray-200">
                    {renderSolucionesColumna(alumno)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center border-r border-gray-200">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        className="p-2 rounded-lg hover:bg-teal-50 transition-colors"
                        title={t.buttons.edit}
                      >
                        <Pencil className="w-5 h-5 text-teal-600" />
                      </button>
                      <button 
                        onClick={() => handleEliminar(alumno.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title={t.buttons.delete}
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
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
};

export default TablaAlumnosModerna;
