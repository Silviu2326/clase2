import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, Eye, EyeOff } from 'lucide-react';
import logo from './logo.jpeg';

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

const TablaAlumnosAlternativa = () => {
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});

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

    if (!trastorno || trastorno === 'Ninguno' || !conducta) return null;

    return (
      <div className="relative">
        <div className="flex items-center justify-between p-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg backdrop-blur-sm border border-white/10">
          <span className="text-gray-700 dark:text-gray-300 font-medium">{conducta.titulo}</span>
          <button
            onClick={() => toggleConducta(alumno.id, conductaKey)}
            className="ml-2 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
          >
            {isExpanded ? (
              <EyeOff className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            ) : (
              <Eye className="w-4 h-4 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            )}
          </button>
        </div>
        <div className={`mt-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-48' : 'max-h-0'}`}>
          <div className="space-y-1 p-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-lg">
            {conducta.detalles.map((detalle, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                <span>{detalle}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSoluciones = (alumno) => {
    const isExpanded = solucionesExpandidas[alumno.id];
    const trastornos = [
      { nombre: alumno.trastornoPsicologico1, soluciones: [] },
      { nombre: alumno.trastornoPsicologico2, soluciones: [] },
      { nombre: alumno.trastornoPsicologico3, soluciones: [] }
    ].filter(t => t.nombre);

    // Distribuir las soluciones según el trastorno
    alumno.soluciones.forEach(solucion => {
      // Si la solución menciona específicamente un trastorno, asignarla a ese trastorno
      const trastornoEncontrado = trastornos.find(t => 
        solucion.toLowerCase().includes(t.nombre.toLowerCase())
      );

      if (trastornoEncontrado) {
        trastornoEncontrado.soluciones.push(solucion);
      } else {
        // Si no menciona un trastorno específico, asignarla a todos los trastornos
        trastornos.forEach(t => t.soluciones.push(solucion));
      }
    });

    return (
      <div className="relative">
        <button
          onClick={() => toggleSolucion(alumno.id)}
          className="w-full flex items-center justify-between p-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg backdrop-blur-sm border border-white/10 hover:from-indigo-500/20 hover:to-purple-500/20 transition-all duration-300"
        >
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            Ver soluciones ({trastornos.length} trastorno{trastornos.length !== 1 ? 's' : ''})
          </span>
          {isExpanded ? (
            <EyeOff className="w-4 h-4 text-purple-400" />
          ) : (
            <Eye className="w-4 h-4 text-indigo-400" />
          )}
        </button>
        
        <div className={`mt-2 space-y-2 overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[500px]' : 'max-h-0'}`}>
          {trastornos.map((trastorno, index) => (
            <div key={index} className="p-3 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-lg">
              <div className="font-medium text-sm text-indigo-600 dark:text-indigo-400 mb-2">
                {trastorno.nombre}:
              </div>
              <div className="space-y-1">
                {trastorno.soluciones.map((solucion, sIndex) => (
                  <div 
                    key={sIndex} 
                    className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                    <span>{solucion}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              Gestión de Alumnos
            </h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            <Plus className="w-5 h-5 inline-block mr-2" />
            Nuevo Alumno
          </button>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="mb-6 flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 flex items-center space-x-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all">
          <Filter className="w-5 h-5 text-gray-500" />
          <span>Filtros</span>
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
                    onClick={() => handleOrdenamiento('nombre')}
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white group"
                  >
                    <span>Nombre</span>
                    <div className="transition-transform duration-200">
                      {ordenamiento.campo === 'nombre' && (
                        ordenamiento.direccion === 'asc' ? 
                          <ChevronUp className="w-4 h-4" /> : 
                          <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </button>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Trastorno 1</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Trastorno 2</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Trastorno 3</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Conducta 1</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Conducta 2</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Conducta 3</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Soluciones</th>
                <th scope="col" className="px-6 py-3 text-left text-gray-600 dark:text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {datosFiltrados.map((alumno) => (
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
                    {renderConducta(alumno, 'conductaAula1', 'trastornoPsicologico1')}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {renderConducta(alumno, 'conductaAula2', 'trastornoPsicologico2')}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    {renderConducta(alumno, 'conductaAula3', 'trastornoPsicologico3')}
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
                        onClick={() => handleEliminar(alumno.id)}
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
};

export default TablaAlumnosAlternativa;
