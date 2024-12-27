import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Pencil, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Plus,
  Filter,
  MoreHorizontal,
  Eye,
  Download,
  Settings
} from 'lucide-react';
import logo from './logo.jpeg';
import { translations } from '../translations/translations';

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

const TablaAlumnosOscuraGradiente = ({ language }) => {
  const t = translations[language];
  const [datos, setDatos] = useState(datosIniciales);
  const [busquedaGlobal, setBusquedaGlobal] = useState('');
  const [ordenamiento, setOrdenamiento] = useState({ campo: 'nombre', direccion: 'asc' });
  const [vistaExpandida, setVistaExpandida] = useState(null);

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

  const toggleVistaExpandida = (id) => {
    setVistaExpandida(vistaExpandida === id ? null : id);
  };

  const datosFiltrados = useMemo(() => {
    return datos.filter((alumno) =>
      Object.values(alumno).some((valor) =>
        String(valor).toLowerCase().includes(busquedaGlobal.toLowerCase())
      )
    );
  }, [datos, busquedaGlobal]);

  return (
    <div className="p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl">
      {/* Header con gradiente */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 backdrop-blur-xl rounded-2xl p-6 border border-gray-700/50">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <img src={logo} alt="Logo" className="h-10 w-auto" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-gray-400">{t.darkMode}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
                title={t.buttons.settings}
              >
                <Settings className="w-5 h-5" />
              </button>
              <button 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
                title={t.buttons.export}
              >
                <Download className="w-5 h-5" />
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg flex items-center space-x-2 hover:from-cyan-500 hover:to-purple-500 transition-all shadow-lg shadow-purple-900/20">
                <Plus className="w-4 h-4" />
                <span>{t.newStudent}</span>
              </button>
            </div>
          </div>

          {/* Búsqueda */}
          <div className="flex space-x-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={busquedaGlobal}
                onChange={(e) => setBusquedaGlobal(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/5 text-gray-200 rounded-lg border border-gray-700/50 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 placeholder-gray-500"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <button 
              className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors backdrop-blur-sm"
              title={t.buttons.filters}
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Tabla con efecto de cristal */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-gray-700/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700/50">
                <th 
                  className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleOrdenamiento('nombre')}
                >
                  <div className="flex items-center space-x-1">
                    <span>{t.columns.name}</span>
                    {ordenamiento.campo === 'nombre' && (
                      ordenamiento.direccion === 'asc' ? 
                      <ChevronUp className="w-4 h-4" /> : 
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider bg-cyan-900/20">
                  {t.columns.disorders}
                </th>
                <th colSpan="3" className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider bg-purple-900/20">
                  {t.columns.habits}
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t.columns.solutions}
                </th>
                <th className="px-6 py-4 text-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                  {t.columns.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {datosFiltrados.map((alumno) => (
                <tr 
                  key={alumno.id}
                  className={`group transition-all duration-200
                    ${vistaExpandida === alumno.id ? 'bg-white/10' : 'hover:bg-white/5'}`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-white rounded-lg flex items-center justify-center border border-white/10">
                        {alumno.nombre.charAt(0)}
                      </div>
                      <span className="text-gray-200 font-medium">{alumno.nombre}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {alumno.trastorno1}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno2 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                        {alumno.trastorno2}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    {alumno.trastorno3 !== 'Ninguno' && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 text-cyan-300 border border-cyan-500/20">
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
                    <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEditar(alumno)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        title={t.buttons.edit}
                      >
                        <Pencil className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                      <button 
                        onClick={() => handleEliminar(alumno.id)}
                        className="p-1.5 hover:bg-red-900/20 rounded-lg transition-colors"
                        title={t.buttons.delete}
                      >
                        <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
                      </button>
                      <button 
                        onClick={() => toggleVistaExpandida(alumno.id)}
                        className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                        title={t.buttons.more}
                      >
                        <Eye className="w-4 h-4 text-gray-400 hover:text-white" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer con gradiente sutil */}
        <div className="px-6 py-4 border-t border-gray-700/50 bg-gradient-to-r from-cyan-900/10 to-purple-900/10">
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div>
              {t.footer.showing.replace('{count}', datosFiltrados.length).replace('{total}', datos.length)}
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">{t.footer.prev}</button>
              <button className="px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-white">1</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">2</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">3</button>
              <button className="px-3 py-1 rounded-lg hover:bg-white/5 transition-colors">{t.footer.next}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosOscuraGradiente;
