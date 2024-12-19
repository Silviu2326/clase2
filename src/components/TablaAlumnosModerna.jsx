import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter } from 'lucide-react';
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

const TablaAlumnosModerna = () => {
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);

  const handleOrdenamiento = (campo) => {
    const esAscendente = ordenamiento.campo === campo && ordenamiento.direccion === 'asc';
    setOrdenamiento({
      campo,
      direccion: esAscendente ? 'desc' : 'asc',
    });
  };

  const handleEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setDialogoAbierto(true);
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
                  Gestión de Alumnos
                </h1>
              </div>
              <button className="px-5 py-2.5 bg-white/90 text-teal-600 rounded-xl flex items-center space-x-2 hover:bg-white transition-all shadow-lg hover:shadow-xl">
                <Plus className="w-5 h-5" />
                <span className="font-medium">Añadir Alumno</span>
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
              placeholder="Buscar alumno..."
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-96 pl-12 pr-4 py-3 bg-white rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-teal-500 shadow-lg"
            />
            <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button className="px-4 py-3 bg-white rounded-xl flex items-center space-x-2 text-gray-600 hover:bg-gray-50 transition-colors shadow-lg">
            <Filter className="w-5 h-5" />
            <span>Filtros</span>
          </button>
        </div>
      </div>

      {/* Tabla con diseño moderno */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th colSpan="9" className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      {datosFiltrados.length} alumnos encontrados
                    </span>
                  </div>
                </th>
              </tr>
              <tr className="bg-gray-50">
                <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleOrdenamiento('nombre')}>
                    <span>Nombre</span>
                    {ordenamiento.campo === 'nombre' && (
                      ordenamiento.direccion === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  Trastornos Psicológicos y Neurológicos
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  Hábitos o Conductas que Afectan en el Aula
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  Posibles Soluciones
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-b-2 border-gray-200 bg-white sticky top-0">
                  Acciones
                </th>
              </tr>
              <tr>
                <th className="bg-white"></th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">2</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">3</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">1</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">2</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider bg-white">3</th>
                <th className="bg-white"></th>
                <th className="bg-white"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {datosFiltrados.map((alumno, index) => (
                <tr 
                  key={alumno.id} 
                  className="hover:bg-gray-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{alumno.nombre}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20">
                      {alumno.trastorno1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno2 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20">
                        {alumno.trastorno2}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno3 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-teal-50 text-teal-700 ring-1 ring-inset ring-teal-600/20">
                        {alumno.trastorno3}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600">{alumno.habito1}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600">{alumno.habito2}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-600">{alumno.habito3}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600 max-w-md">{alumno.soluciones}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => handleEditar(alumno)}
                        className="p-2 rounded-lg hover:bg-teal-50 transition-colors"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4 text-teal-600" />
                      </button>
                      <button 
                        onClick={() => handleEliminar(alumno.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
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
