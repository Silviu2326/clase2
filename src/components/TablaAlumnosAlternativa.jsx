import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus } from 'lucide-react';
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

const TablaAlumnosAlternativa = () => {
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
    <div className="p-6 max-w-[1800px] mx-auto bg-gray-50">
      {/* Header */}
      <div className="mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-lg">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-2 rounded-lg">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
            <h1 className="text-2xl font-bold text-white">Gestión de Alumnos</h1>
          </div>
          <button className="px-4 py-2 bg-white text-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-50 transition-colors">
            <Plus className="w-5 h-5" />
            <span>Nuevo Alumno</span>
          </button>
        </div>
      </div>

      {/* Controles */}
      <div className="mb-6 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-72 pl-10 pr-4 py-3 bg-white border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-md"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
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
                <tr key={alumno.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{alumno.nombre}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      {alumno.trastorno1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno2 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {alumno.trastorno2}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno3 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
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
                    <div className="text-sm text-gray-600">{alumno.soluciones}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-3">
                      <button 
                        onClick={() => handleEditar(alumno)}
                        className="p-1 rounded-lg hover:bg-purple-100 transition-colors group"
                        title="Editar"
                      >
                        <Pencil className="w-4 h-4 text-purple-600 group-hover:text-purple-700" />
                      </button>
                      <button 
                        onClick={() => handleEliminar(alumno.id)}
                        className="p-1 rounded-lg hover:bg-red-100 transition-colors group"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
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
