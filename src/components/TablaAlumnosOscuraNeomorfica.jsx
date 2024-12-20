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

const TablaAlumnosOscuraNeomorfica = () => {
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
            className="p-1 bg-[#22252a] rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all"
          >
            <ChevronRight className={`w-4 h-4 text-gray-400 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
          </button>
          <span className="text-gray-300">{conducta.titulo}</span>
        </div>
        {isExpanded && (
          <div className="mt-2 ml-6 p-3 bg-[#22252a] rounded-lg shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]">
            <ul className="space-y-1">
              {conducta.detalles.map((detalle, index) => (
                <li key={index} className="text-gray-400 text-sm">{detalle}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-8 bg-[#1a1c20]">
      {/* Header con diseño neomórfico */}
      <div className="mb-8">
        <div className="bg-[#1e2025] rounded-2xl shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.05)] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-[#22252a] p-3 rounded-xl shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.1)]">
                <img src={logo} alt="Logo" className="h-12 w-auto opacity-90" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Gestión de Alumnos
              </h1>
            </div>
            <button className="px-5 py-2.5 bg-[#22252a] text-gray-200 rounded-xl flex items-center space-x-2 hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.05)]">
              <Plus className="w-5 h-5" />
              <span className="font-medium">Añadir Alumno</span>
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar alumno..."
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-96 pl-12 pr-4 py-3 bg-[#22252a] text-gray-200 rounded-xl border-0 focus:outline-none shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.05)] placeholder-gray-500"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <button className="px-4 py-3 bg-[#22252a] rounded-xl flex items-center space-x-2 text-gray-300 shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-[#1e2025] rounded-xl overflow-x-auto shadow-[5px_5px_15px_rgba(0,0,0,0.3),-5px_-5px_15px_rgba(255,255,255,0.05)]">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr className="bg-[#22252a]">
              <th scope="col" className="px-4 py-4 text-left">
                <button
                  onClick={() => handleOrdenamiento('nombre')}
                  className="flex items-center space-x-1 text-gray-300 hover:text-gray-100"
                >
                  <span>Nombre</span>
                  {ordenamiento.campo === 'nombre' && (
                    ordenamiento.direccion === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              </th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Trastorno 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Trastorno 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Trastorno 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Conducta 1</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Conducta 2</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Conducta 3</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Soluciones</th>
              <th scope="col" className="px-4 py-4 text-left text-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-[#22252a] transition-colors">
                <td className="px-4 py-4">
                  <span className="text-gray-200 font-medium">{alumno.nombre}</span>
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-300 bg-[#22252a] px-2 py-1 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]">
                    {alumno.trastornoPsicologico1}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-400 bg-[#22252a] px-2 py-1 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]">
                    {alumno.trastornoPsicologico2}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-gray-400 bg-[#22252a] px-2 py-1 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]">
                    {alumno.trastornoPsicologico3}
                  </div>
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
                  <div className="text-gray-300 bg-[#22252a] px-3 py-2 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]">
                    {alumno.soluciones}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex space-x-3">
                    <button className="p-2 bg-[#22252a] rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all">
                      <Pencil className="w-5 h-5 text-gray-400 hover:text-gray-100" />
                    </button>
                    <button 
                      onClick={() => handleEliminar(alumno.id)}
                      className="p-2 bg-[#22252a] rounded-lg shadow-[2px_2px_5px_rgba(0,0,0,0.2),-2px_-2px_5px_rgba(255,255,255,0.05)] hover:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)] transition-all"
                    >
                      <Trash2 className="w-5 h-5 text-gray-400 hover:text-red-400" />
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

export default TablaAlumnosOscuraNeomorfica;
