import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, Eye, EyeOff } from 'lucide-react';
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

const TablaAlumnosAlternativa = () => {
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
                    <div className="text-gray-700 dark:text-gray-300 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 px-4 py-2 rounded-lg border border-white/10">
                      {alumno.soluciones}
                    </div>
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
