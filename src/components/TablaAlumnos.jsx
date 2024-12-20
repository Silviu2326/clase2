import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, ChevronRight } from 'lucide-react';
import logo from './logo.jpeg';

const datosIniciales = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    trastornoPsicologico1: 'TDAH',
    trastornoPsicologico2: 'Dislexia',
    trastornoPsicologico3: 'Ninguno',
    conductaAula1: {
      titulo: 'Dificultad para mantener atención',
      detalles: [
        'Se distrae fácilmente con estímulos externos',
        'Pierde materiales frecuentemente',
        'Dificultad para seguir instrucciones largas'
      ]
    },
    conductaAula2: {
      titulo: 'Interrumpe frecuentemente',
      detalles: [
        'Habla en momentos inapropiados',
        'Dificultad para esperar su turno',
        'Interrumpe conversaciones'
      ]
    },
    conductaAula3: null,
    soluciones: 'Establecer rutinas claras, descansos programados'
  },
  {
    id: 2,
    nombre: 'María García',
    trastornoPsicologico1: 'Ansiedad',
    trastornoPsicologico2: 'TOC',
    trastornoPsicologico3: null,
    conductaAula1: {
      titulo: 'Perfeccionismo excesivo',
      detalles: [
        'Tarda mucho en completar tareas',
        'Se frustra si no alcanza la perfección',
        'Revisa el trabajo múltiples veces'
      ]
    },
    conductaAula2: {
      titulo: 'Dificultad para trabajar en grupo',
      detalles: [
        'Prefiere trabajar sola',
        'Se estresa en situaciones sociales',
        'Dificultad para delegar tareas'
      ]
    },
    conductaAula3: null,
    soluciones: 'Técnicas de relajación, trabajo gradual'
  },
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

  const renderConducta = (alumno, conductaKey, trastornoKey) => {
    const conducta = alumno[conductaKey];
    const trastorno = alumno[trastornoKey];
    const isExpanded = conductasExpandidas[`${alumno.id}-${conductaKey}`];

    if (!trastorno || trastorno === 'Ninguno' || !conducta) return null;

    return (
      <div className="relative group">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleConducta(alumno.id, conductaKey)}
            className="p-1 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ChevronRight className={`w-4 h-4 text-blue-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <span className="text-gray-700 dark:text-gray-300 font-medium">{conducta.titulo}</span>
        </div>
        {isExpanded && (
          <div className="mt-2 ml-6 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
            <ul className="space-y-1">
              {conducta.detalles.map((detalle, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-400 text-sm">{detalle}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-900/50">
              <th scope="col" className="px-4 py-4 text-left">
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
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Trastorno 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Trastorno 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Trastorno 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Conducta 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Conducta 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Conducta 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Soluciones</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-600 dark:text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="px-4 py-4">
                  <span className="text-gray-900 dark:text-white font-medium">{alumno.nombre}</span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                    {alumno.trastornoPsicologico1}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300">
                    {alumno.trastornoPsicologico2}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex px-2.5 py-1 rounded-full text-sm font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                    {alumno.trastornoPsicologico3}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 'conductaAula1', 'trastornoPsicologico1')}
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 'conductaAula2', 'trastornoPsicologico2')}
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 'conductaAula3', 'trastornoPsicologico3')}
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900/50 px-3 py-2 rounded-lg">
                    {alumno.soluciones}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex space-x-3">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <Pencil className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400" />
                    </button>
                    <button 
                      onClick={() => handleEliminar(alumno.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400" />
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
