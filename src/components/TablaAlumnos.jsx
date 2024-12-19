import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
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

const TablaAlumnos = () => {
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

  const datosFiltrados = useMemo(() => {
    return datos.filter((alumno) =>
      Object.values(alumno).some((valor) =>
        String(valor).toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    );
  }, [datos, busquedaGlobal]);

  const handleEditar = (alumno) => {
    setAlumnoEditando(alumno);
    setDialogoAbierto(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este alumno?')) {
      setDatos(datos.filter((alumno) => alumno.id !== id));
    }
  };

  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    setDatos(datos.map((alumno) =>
      alumno.id === alumnoEditando.id ? alumnoEditando : alumno
    ));
    setDialogoAbierto(false);
    setAlumnoEditando(null);
  };

  return (
    <div className="p-6 max-w-[1800px] mx-auto">
      {/* Header con logo */}
      <div className="mb-8 flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-12 w-auto" />
          <h1 className="text-2xl font-semibold text-gray-800">Gestión de Alumnos</h1>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Buscar alumno..."
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="group px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky top-0">
                <div className="flex items-center space-x-1 cursor-pointer" onClick={() => handleOrdenamiento('nombre')}>
                  <span>Nombre</span>
                  {ordenamiento.campo === 'nombre' && (
                    ordenamiento.direccion === 'asc' ? 
                    <ChevronUp className="w-4 h-4" /> : 
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </th>
              <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky top-0">
                Trastornos Psicológicos y Neurológicos
              </th>
              <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky top-0">
                Hábitos o Conductas que Afectan en el Aula
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50 sticky top-0">
                Posibles Soluciones
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-gray-50 sticky top-0">
                Acciones
              </th>
            </tr>
            <tr className="bg-gray-50">
              <th className="border-r border-gray-200 bg-gray-50"></th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">1</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">2</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">3</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">1</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">2</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 bg-gray-50">3</th>
              <th className="border-r border-gray-200 bg-gray-50"></th>
              <th className="bg-gray-50"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">
                  {alumno.nombre}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {alumno.trastorno1}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.trastorno2 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {alumno.trastorno2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.trastorno3 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {alumno.trastorno3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.habito1}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.habito2}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.habito3}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 border-r border-gray-200">
                  {alumno.soluciones}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex items-center justify-center space-x-3">
                    <button 
                      onClick={() => handleEditar(alumno)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleEliminar(alumno.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {dialogoAbierto && (
        <div className="modal-backdrop" onClick={() => setDialogoAbierto(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Editar Alumno</h2>
            </div>
            <form onSubmit={handleGuardarEdicion}>
              <div className="modal-content">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    value={alumnoEditando.nombre}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, nombre: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trastorno1">Trastorno 1</label>
                  <input
                    id="trastorno1"
                    type="text"
                    value={alumnoEditando.trastorno1}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, trastorno1: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trastorno2">Trastorno 2</label>
                  <input
                    id="trastorno2"
                    type="text"
                    value={alumnoEditando.trastorno2}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, trastorno2: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="trastorno3">Trastorno 3</label>
                  <input
                    id="trastorno3"
                    type="text"
                    value={alumnoEditando.trastorno3}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, trastorno3: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="habito1">Hábito 1</label>
                  <input
                    id="habito1"
                    type="text"
                    value={alumnoEditando.habito1}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, habito1: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="habito2">Hábito 2</label>
                  <input
                    id="habito2"
                    type="text"
                    value={alumnoEditando.habito2}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, habito2: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="habito3">Hábito 3</label>
                  <input
                    id="habito3"
                    type="text"
                    value={alumnoEditando.habito3}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, habito3: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="soluciones">Soluciones</label>
                  <input
                    id="soluciones"
                    type="text"
                    value={alumnoEditando.soluciones}
                    onChange={(e) => setAlumnoEditando({...alumnoEditando, soluciones: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secundario" onClick={() => setDialogoAbierto(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn-primario">
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaAlumnos;
