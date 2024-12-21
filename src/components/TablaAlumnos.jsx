import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, ChevronRight } from 'lucide-react';
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

const TablaAlumnos = () => {
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [conductasExpandidas, setConductasExpandidas] = useState({});

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

  const datosFiltrados = useMemo(() => {
    return datos.filter((alumno) =>
      Object.values(alumno).some((valor) =>
        String(valor).toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    );
  }, [datos, busquedaGlobal]);

  const renderNombre = (alumno) => (
    <div>
      <div className="font-medium text-gray-900 dark:text-white">{alumno.nombre}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400">{alumno.descripcion}</div>
    </div>
  );

  const renderConducta = (conducta) => {
    if (!conducta) return null;
    return (
      <div>
        <div className="font-medium text-gray-700 dark:text-gray-300">{conducta.titulo}</div>
        {conducta.descripcion && (
          <div className="text-sm text-gray-600 dark:text-gray-400">{conducta.descripcion}</div>
        )}
      </div>
    );
  };

  const renderSoluciones = (soluciones) => {
    if (!soluciones || soluciones.length === 0) return null;
    return (
      <ul className="space-y-1">
        {soluciones.map((solucion, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            - {solucion}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Registro de Alumnos</h2>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Nuevo Alumno</span>
        </button>
      </div>

      {/* Búsqueda y filtros */}
      <div className="mb-6 flex space-x-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
          />
        </div>
        <button className="px-4 py-2 flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-gray-700 dark:text-gray-300">Filtros</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <th scope="col" className="px-4 py-4 text-left border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleOrdenamiento('nombre')}
                  className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  <span>Nombre</span>
                  {ordenamiento.campo === 'nombre' && (
                    ordenamiento.direccion === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Trastorno 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Trastorno 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Trastorno 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Conducta 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Conducta 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Conducta 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Soluciones</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {renderNombre(alumno)}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {alumno.trastornoPsicologico1 && (
                    <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                      {alumno.trastornoPsicologico1}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {alumno.trastornoPsicologico2 && (
                    <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                      {alumno.trastornoPsicologico2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {alumno.trastornoPsicologico3 && (
                    <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                      {alumno.trastornoPsicologico3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {renderConducta(alumno.conductaAula1)}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {renderConducta(alumno.conductaAula2)}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {renderConducta(alumno.conductaAula3)}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  {renderSoluciones(alumno.soluciones)}
                </td>
                <td className="px-4 py-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    <button className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button className="text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaAlumnos;
