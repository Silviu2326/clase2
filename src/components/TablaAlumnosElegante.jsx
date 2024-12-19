import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Pencil, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Plus,
  Filter,
  Download,
  RefreshCw,
  Eye
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

const TablaAlumnosElegante = () => {
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [alumnoEditando, setAlumnoEditando] = useState(null);
  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [columnaHover, setColumnaHover] = useState(null);

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
      {/* Header */}
      <div className="bg-white rounded-t-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-rose-50 rounded-xl">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Registro de Alumnos</h1>
              <p className="text-slate-500 text-sm">Sistema de gestión académica</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center space-x-2 border border-slate-200">
              <Download className="w-4 h-4" />
              <span>Exportar</span>
            </button>
            <button className="px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center space-x-2 border border-slate-200">
              <RefreshCw className="w-4 h-4" />
              <span>Actualizar</span>
            </button>
            <button className="px-4 py-2 bg-rose-600 text-white rounded-lg flex items-center space-x-2 hover:bg-rose-700 transition-colors shadow-sm">
              <Plus className="w-4 h-4" />
              <span>Añadir Alumno</span>
            </button>
          </div>
        </div>

        {/* Barra de búsqueda y filtros */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Buscar por nombre, trastorno, hábito..."
              value={busquedaGlobal}
              onChange={(e) => setBusquedaGlobal(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors flex items-center space-x-2 border border-slate-200">
              <Filter className="w-4 h-4" />
              <span>Filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="bg-white shadow-sm border-x border-slate-200 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th 
                className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:bg-slate-50 transition-colors"
                onClick={() => handleOrdenamiento('nombre')}
                onMouseEnter={() => setColumnaHover('nombre')}
                onMouseLeave={() => setColumnaHover(null)}
              >
                <div className="flex items-center space-x-1">
                  <span>Nombre</span>
                  <div className={`transition-opacity ${columnaHover === 'nombre' || ordenamiento.campo === 'nombre' ? 'opacity-100' : 'opacity-0'}`}>
                    {ordenamiento.campo === 'nombre' ? (
                      ordenamiento.direccion === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    ) : <ChevronUp className="w-4 h-4 text-slate-300" />}
                  </div>
                </div>
              </th>
              <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider bg-rose-50/50">
                Trastornos Psicológicos y Neurológicos
              </th>
              <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider bg-blue-50/50">
                Hábitos o Conductas que Afectan en el Aula
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-slate-500 uppercase tracking-wider bg-emerald-50/50">
                Posibles Soluciones
              </th>
              <th className="px-6 py-4 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
            <tr className="border-b border-slate-200 text-center">
              <th className="bg-white"></th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-rose-50/50">1</th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-rose-50/50">2</th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-rose-50/50">3</th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-blue-50/50">1</th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-blue-50/50">2</th>
              <th className="px-4 py-2 text-xs font-medium text-slate-500 bg-blue-50/50">3</th>
              <th className="bg-emerald-50/50"></th>
              <th className="bg-white"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {datosFiltrados.map((alumno, index) => (
              <tr 
                key={alumno.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-rose-100 rounded-lg flex items-center justify-center">
                      <span className="text-rose-600 font-medium">{alumno.nombre.charAt(0)}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-900">{alumno.nombre}</div>
                  </div>
                </td>
                <td className="px-4 py-4 bg-rose-50/20">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                    {alumno.trastorno1}
                  </span>
                </td>
                <td className="px-4 py-4 bg-rose-50/20">
                  {alumno.trastorno2 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                      {alumno.trastorno2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 bg-rose-50/20">
                  {alumno.trastorno3 !== 'Ninguno' && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
                      {alumno.trastorno3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4 bg-blue-50/20">
                  <div className="text-sm text-slate-600">{alumno.habito1}</div>
                </td>
                <td className="px-4 py-4 bg-blue-50/20">
                  <div className="text-sm text-slate-600">{alumno.habito2}</div>
                </td>
                <td className="px-4 py-4 bg-blue-50/20">
                  <div className="text-sm text-slate-600">{alumno.habito3}</div>
                </td>
                <td className="px-6 py-4 bg-emerald-50/20">
                  <div className="text-sm text-slate-600 max-w-md">{alumno.soluciones}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => handleEditar(alumno)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Editar"
                    >
                      <Pencil className="w-4 h-4 text-slate-600" />
                    </button>
                    <button 
                      onClick={() => handleEliminar(alumno.id)}
                      className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </button>
                    <button 
                      className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4 text-slate-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-b-2xl shadow-sm border border-t-0 border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div>Mostrando {datosFiltrados.length} de {datos.length} alumnos</div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded-lg hover:bg-slate-50 transition-colors">Anterior</button>
            <div className="flex items-center space-x-1">
              <button className="px-3 py-1 rounded-lg bg-rose-50 text-rose-600 font-medium">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-slate-50 transition-colors">2</button>
              <button className="px-3 py-1 rounded-lg hover:bg-slate-50 transition-colors">3</button>
            </div>
            <button className="px-3 py-1 rounded-lg hover:bg-slate-50 transition-colors">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosElegante;
