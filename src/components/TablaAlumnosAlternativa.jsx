import React, { useState, useMemo } from 'react';
import { Search, Pencil, Trash2, ChevronUp, ChevronDown, Plus, Filter, Eye, EyeOff, ChevronRight } from 'lucide-react';
import logo from './logo.jpeg';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblemsData from '../data/educational-problems.json';
import { translations } from '../translations/translations';

const obtenerDetallesTrastorno = (nombreTrastorno, language) => {
  if (!nombreTrastorno) return null;
  
  const nombreNormalizado = nombreTrastorno.toLowerCase();
  const mapeoTrastornos = {
    'tdah': language === 'es' ? 'Trastorno por Déficit de Atención e Hiperactividad' : 'Attention Deficit Hyperactivity Disorder',
    'dislexia': language === 'es' ? 'Dificultades Específicas del Aprendizaje' : 'Specific Learning Difficulties',
    'apd': language === 'es' ? 'Trastorno del Procesamiento Auditivo' : 'Auditory Processing Disorder',
    'tda': language === 'es' ? 'Trastorno por Déficit de Atención e Hiperactividad' : 'Attention Deficit Hyperactivity Disorder',
    'spld': language === 'es' ? 'Dificultades Específicas del Aprendizaje' : 'Specific Learning Difficulties',
    'semh': language === 'es' ? 'Social, Emocional y Salud Mental' : 'Social, Emotional, and Mental Health'
  };

  const categoriaBuscada = mapeoTrastornos[nombreNormalizado] || nombreTrastorno;
  const data = language === 'en' ? educationalProblemsData.problems : problemasEducativos.problemas;
  
  return data.find(
    problema => (problema.category || problema.categoria).toLowerCase() === categoriaBuscada.toLowerCase()
  );
};

const obtenerSolucionesPorTrastorno = (alumno, language) => {
  const solucionesPorTrastorno = {};
  const solucionesEspecificas = {
    nombre: language === 'es' ? 'Soluciones Específicas' : 'Specific Solutions',
    soluciones: [{
      categoria: language === 'es' ? 'Personalizadas' : 'Personalized',
      estrategias: alumno.soluciones || []
    }]
  };

  [
    { nombre: alumno.trastornoPsicologico1, orden: 1 },
    { nombre: alumno.trastornoPsicologico2, orden: 2 },
    { nombre: alumno.trastornoPsicologico3, orden: 3 }
  ]
    .filter(t => t.nombre)
    .forEach(trastorno => {
      const detalles = obtenerDetallesTrastorno(trastorno.nombre, language);
      if (detalles) {
        solucionesPorTrastorno[`trastorno${trastorno.orden}`] = {
          nombre: trastorno.nombre,
          soluciones: detalles.solutions || detalles.soluciones || []
        };
      }
    });

  return {
    solucionesEspecificas,
    ...solucionesPorTrastorno
  };
};

const obtenerConductasPorTrastorno = (nombreTrastorno, language) => {
  if (!nombreTrastorno) return [];
  
  const detalles = obtenerDetallesTrastorno(nombreTrastorno, language);
  return detalles?.behaviors || detalles?.conductas || [];
};

const TablaAlumnosAlternativa = ({ language }) => {
  const [deletedIds, setDeletedIds] = useState(new Set());
  const datos = useMemo(() => {
    const data = language === 'en' ? educationalProblemsData.problems : problemasEducativos.problemas;
    return data
      .filter(problema => !deletedIds.has(problema.id))
      .map(problema => ({
        id: problema.id,
        nombre: `Bus Year 10 - P${problema.id}`,
        descripcion: '(Wave 1, Diagnóstico formal: Sí)',
        trastornoPsicologico1: problema.category || problema.categoria,
        trastornoPsicologico2: null,
        trastornoPsicologico3: null,
        conductaAula1: {
          titulo: problema.description || problema.descripcion,
          descripcion: problema.behaviors?.[0]?.manifestations?.[0] || problema.conductas?.[0]?.manifestaciones?.[0],
          detalles: problema.behaviors?.[0]?.manifestations || problema.conductas?.[0]?.manifestaciones || []
        },
        conductaAula2: problema.behaviors?.[1] || problema.conductas?.[1] ? {
          titulo: problema.behaviors?.[1]?.type || problema.conductas?.[1]?.tipo,
          descripcion: problema.behaviors?.[1]?.manifestations?.[0] || problema.conductas?.[1]?.manifestaciones?.[0],
          detalles: problema.behaviors?.[1]?.manifestations || problema.conductas?.[1]?.manifestaciones || []
        } : null,
        conductaAula3: problema.behaviors?.[2] || problema.conductas?.[2] ? {
          titulo: problema.behaviors?.[2]?.type || problema.conductas?.[2]?.tipo,
          descripcion: problema.behaviors?.[2]?.manifestations?.[0] || problema.conductas?.[2]?.manifestaciones?.[0],
          detalles: problema.behaviors?.[2]?.manifestations || problema.conductas?.[2]?.manifestaciones || []
        } : null,
        soluciones: problema.solutions?.map(solution => language === 'en' ? solution : problema.soluciones?.[0]) || problema.soluciones || []
      }));
  }, [language, deletedIds]);

  const [filtro, setFiltro] = useState('');
  const [columnaOrden, setColumnaOrden] = useState(null);
  const [ordenAscendente, setOrdenAscendente] = useState(true);
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
  const [categoriaExpandida, setCategoriaExpandida] = useState({});
  const t = translations[language];

  const handleDelete = (id) => {
    setDeletedIds(prev => new Set([...prev, id]));
  };

  const toggleSolucion = (alumnoId, trastorno) => {
    setSolucionesExpandidas(prev => ({
      ...prev,
      [alumnoId]: {
        ...prev[alumnoId],
        [trastorno]: !prev[alumnoId]?.[trastorno]
      }
    }));
  };

  const toggleCategoria = (alumnoId, trastorno, categoria) => {
    const key = `${alumnoId}-${trastorno}-${categoria}`;
    setCategoriaExpandida(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const toggleConducta = (alumnoId, index) => {
    setConductasExpandidas(prev => ({
      ...prev,
      [`${alumnoId}-${index}`]: !prev[`${alumnoId}-${index}`]
    }));
  };

  const handleOrdenar = (columna) => {
    if (columnaOrden === columna) {
      setOrdenAscendente(!ordenAscendente);
    } else {
      setColumnaOrden(columna);
      setOrdenAscendente(true);
    }
  };

  const datosFiltrados = useMemo(() => {
    if (!filtro) return datos;
    
    const filtroLower = filtro.toLowerCase();
    return datos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(filtroLower) ||
      alumno.descripcion.toLowerCase().includes(filtroLower) ||
      (alumno.trastornoPsicologico1 && alumno.trastornoPsicologico1.toLowerCase().includes(filtroLower)) ||
      (alumno.trastornoPsicologico2 && alumno.trastornoPsicologico2.toLowerCase().includes(filtroLower)) ||
      (alumno.trastornoPsicologico3 && alumno.trastornoPsicologico3.toLowerCase().includes(filtroLower))
    );
  }, [datos, filtro]);

  const datosOrdenados = useMemo(() => {
    if (!columnaOrden) return datosFiltrados;

    return [...datosFiltrados].sort((a, b) => {
      let valorA, valorB;

      switch (columnaOrden) {
        case 'nombre':
          valorA = a.nombre;
          valorB = b.nombre;
          break;
        case 'trastorno1':
          valorA = a.trastornoPsicologico1 || '';
          valorB = b.trastornoPsicologico1 || '';
          break;
        case 'trastorno2':
          valorA = a.trastornoPsicologico2 || '';
          valorB = b.trastornoPsicologico2 || '';
          break;
        case 'trastorno3':
          valorA = a.trastornoPsicologico3 || '';
          valorB = b.trastornoPsicologico3 || '';
          break;
        default:
          return 0;
      }

      if (ordenAscendente) {
        return valorA.localeCompare(valorB);
      } else {
        return valorB.localeCompare(valorA);
      }
    });
  }, [datosFiltrados, columnaOrden, ordenAscendente]);

  const renderSoluciones = (alumno) => {
    const solucionesPorTrastorno = obtenerSolucionesPorTrastorno(alumno, language);

    return (
      <div className="space-y-2">
        {Object.entries(solucionesPorTrastorno).map(([key, { nombre, soluciones }]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => toggleSolucion(alumno.id, key)}
              className="w-full px-4 py-2 flex items-center justify-between bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100"
            >
              <span className="font-medium text-sm text-gray-700">{nombre}</span>
              {solucionesExpandidas[alumno.id]?.[key] ? (
                <ChevronUp className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              )}
            </button>
            
            {solucionesExpandidas[alumno.id]?.[key] && (
              <div className="p-2 space-y-2">
                {soluciones.map((solucion, index) => (
                  <div key={index} className="border border-gray-100 rounded-md overflow-hidden">
                    <button
                      onClick={() => toggleCategoria(alumno.id, key, solucion.categoria)}
                      className="w-full px-3 py-1.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100"
                    >
                      <span className="text-sm text-gray-600">{solucion.categoria}</span>
                      {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] ? (
                        <ChevronUp className="h-3 w-3 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                    
                    {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] && (
                      <ul className="p-2 space-y-1 bg-white">
                        {solucion.estrategias.map((estrategia, idx) => (
                          <li key={idx} className="text-xs text-gray-600 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                            {estrategia}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderConducta = (alumno, conductaAula, index) => {
    // Solo mostrar conducta si hay un trastorno correspondiente
    const trastorno = alumno[`trastornoPsicologico${index}`];
    if (!trastorno || !conductaAula) return null;

    const isExpanded = conductasExpandidas[`${alumno.id}-${index}`];
    const toggleExpanded = () => {
      setConductasExpandidas(prev => ({
        ...prev,
        [`${alumno.id}-${index}`]: !prev[`${alumno.id}-${index}`]
      }));
    };

    return (
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 cursor-pointer text-gray-700 dark:text-gray-300"
          onClick={toggleExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="font-medium">{conductaAula.titulo}</span>
        </div>
        {isExpanded && (
          <div className="pl-6 text-sm text-gray-600 dark:text-gray-400">
            {conductaAula.descripcion}
            {conductaAula.detalles && conductaAula.detalles.length > 0 && (
              <ul className="mt-2 space-y-1">
                {conductaAula.detalles.map((detalle, idx) => (
                  <li key={idx} className="text-xs text-gray-500 dark:text-gray-400">
                    • {detalle}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-full bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-0.5">
              <img src={logo} alt="Logo" className="w-full h-full object-cover rounded-xl" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              {t.management}
            </h1>
          </div>
          <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25">
            <Plus className="w-5 h-5 inline-block mr-2" />
            {t.newStudent}
          </button>
        </div>
      </div>

      {/* Búsqueda y Filtros */}
      <div className="mb-6 flex space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={t.search}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button className="px-4 py-2 flex items-center space-x-2 bg-white/40 dark:bg-white/5 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/60 dark:hover:bg-white/10 transition-all">
          <Filter className="w-5 h-5 text-gray-500" />
          <span>{t.filters}</span>
        </button>
      </div>

      {/* Tabla */}
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Nombre/Descripción' : 'Name/Description'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Trastorno 1' : 'Disorder 1'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Trastorno 2' : 'Disorder 2'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Trastorno 3' : 'Disorder 3'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Conducta 1' : 'Behavior 1'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Conducta 2' : 'Behavior 2'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Conducta 3' : 'Behavior 3'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                  {language === 'es' ? 'Soluciones' : 'Solutions'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {datosOrdenados.map((alumno) => (
                <tr key={alumno.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {alumno.nombre}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {alumno.descripcion}
                    </div>
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {alumno.trastornoPsicologico1 && (
                      <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {alumno.trastornoPsicologico1}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {alumno.trastornoPsicologico2 && (
                      <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                        {alumno.trastornoPsicologico2}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {alumno.trastornoPsicologico3 && (
                      <span className="inline-flex text-xs px-2 py-1 rounded-full font-medium bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        {alumno.trastornoPsicologico3}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {renderConducta(alumno, alumno.conductaAula1, 1)}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {renderConducta(alumno, alumno.conductaAula2, 2)}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {renderConducta(alumno, alumno.conductaAula3, 3)}
                  </td>
                  <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                    {renderSoluciones(alumno)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TablaAlumnosAlternativa;
