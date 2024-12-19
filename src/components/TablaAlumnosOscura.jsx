import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Pencil, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Plus,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import logo from './logo.jpeg';

const datosIniciales = [
  {
    id: 1,
    nombre: 'Juan Pérez',
    trastorno1: 'TDAH',
    trastorno2: 'Dislexia',
    trastorno3: 'Ninguno',
    habito1: 'Dificultad para mantener atención',
    habito2: 'Interrumpe frecuentemente',
    habito3: 'Movimiento constante',
    soluciones: 'Establecer rutinas claras, descansos programados'
  },
  {
    id: 2,
    nombre: 'María García',
    trastorno1: 'Ansiedad',
    trastorno2: 'Ninguno',
    trastorno3: 'Ninguno',
    habito1: 'Perfeccionismo excesivo',
    habito2: 'Dificultad para trabajar en grupo',
    habito3: 'Preocupación constante',
    soluciones: 'Técnicas de relajación, trabajo gradual'
  },
];

const TablaAlumnosOscura = () => {
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });

  const handleOrdenamiento = (campo) => {
    const esAscendente = ordenamiento.campo === campo && ordenamiento.direccion === 'asc';
    setOrdenamiento({
      campo,
      direccion: esAscendente ? 'desc' : 'asc',
    });
  };

  const handleEditar = (alumno) => {
    // Implementar edición
    console.log('Editar', alumno);
  };

  const handleEliminar = (id) => {
    setDatos(datos.filter(alumno => alumno.id !== id));
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter((alumno) =>
      Object.values(alumno).some((valor) =>
        String(valor).toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    );
  }, [datos, busquedaGlobal]);

  return (
    <div className="p-6 bg-gray-900 rounded-xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-800 rounded-lg">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-white">Gestión de Alumnos</h1>
              <p className="text-gray-400 text-sm">Modo Oscuro Minimalista</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg flex items-center space-x-2 hover:bg-violet-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>Nuevo Alumno</span>
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mt-6 flex space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar..."
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                onClick={() => handleOrdenamiento('nombre')}
              >
                <div className="flex items-center space-x-1">
                  <span>Nombre</span>
                  {ordenamiento.campo === 'nombre' && (
                    ordenamiento.direccion === 'asc' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th colSpan="3" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider bg-gray-800/50">
                Trastornos
              </th>
              <th colSpan="3" className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Hábitos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Soluciones
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {datosFiltrados.map((alumno) => (
              <tr 
                key={alumno.id}
                className="group hover:bg-gray-800/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-violet-900/50 text-violet-300 rounded-lg flex items-center justify-center">
                      {alumno.nombre.charAt(0)}
                    </div>
                    <span className="text-gray-200">{alumno.nombre}</span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-900/50 text-violet-300">
                    {alumno.trastorno1}
                  </span>
                </td>
                <td className="px-4 py-4">
                  {alumno.trastorno2 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-900/50 text-violet-300">
                      {alumno.trastorno2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {alumno.trastorno3 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-900/50 text-violet-300">
                      {alumno.trastorno3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-400">{alumno.habito1}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-400">{alumno.habito2}</div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-400">{alumno.habito3}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-400 max-w-md">{alumno.soluciones}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditar(alumno)}
                      className="p-1 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                    <button 
                      onClick={() => handleEliminar(alumno.id)}
                      className="p-1 hover:bg-red-900/50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                    </button>
                    <button className="p-1 hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div>
          Mostrando {datosFiltrados.length} de {datos.length} alumnos
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">Anterior</button>
          <button className="px-3 py-1 rounded-lg bg-violet-900/50 text-violet-300">1</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">2</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">3</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosOscura;
