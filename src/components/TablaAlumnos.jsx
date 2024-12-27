import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import logo from './logo.jpeg';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblemsData from '../data/educational-problems.json';
import { translations } from '../translations/translations';

const datosIniciales = [
  {
    id: 1,
    nombre: 'Bus Year 10 - P1',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'TDAH',
    trastornoPsicologico2: null,
    conductaAula1: {
      titulo: 'Dificultades en atención y comportamiento',
      descripcion: 'Muestra problemas de atención y control de impulsos'
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: []
  },
  {
    id: 2,
    nombre: 'Bus Year 10 - P2',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'TDAH',
    trastornoPsicologico2: 'Dislexia',
    conductaAula1: {
      titulo: 'Dificultades en atención',
      descripcion: 'Problemas para mantener la atención en clase'
    },
    conductaAula2: {
      titulo: 'Dificultades en lectura',
      descripcion: 'Problemas significativos en la lectura y comprensión'
    },
    conductaAula3: null,
    soluciones: []
  },
  {
    id: 3,
    nombre: 'Bus Year 10 - P3',
    descripcion: '(Wave 1, Diagnóstico formal: No)',
    trastornoPsicologico1: null,
    trastornoPsicologico2: null,
    conductaAula1: null,
    conductaAula2: null,
    conductaAula3: null,
    soluciones: []
  },
  {
    id: 4,
    nombre: 'Bus Year 10 - P4',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'APD',
    trastornoPsicologico2: null,
    conductaAula1: {
      titulo: 'Dificultades auditivas',
      descripcion: 'Problemas para procesar información auditiva'
    },
    conductaAula2: null,
    conductaAula3: null,
    soluciones: []
  },
  {
    id: 5,
    nombre: 'Bus Year 10 - P5',
    descripcion: '(Wave 1, Diagnóstico formal: No)',
    trastornoPsicologico1: null,
    trastornoPsicologico2: null,
    conductaAula1: null,
    conductaAula2: null,
    conductaAula3: null,
    soluciones: []
  },
  {
    id: 6,
    nombre: 'Bus Year 10 - P6',
    descripcion: '(Wave 1, Diagnóstico formal: Sí)',
    trastornoPsicologico1: 'SEMH',
    trastornoPsicologico2: 'SpLD',
    conductaAula1: {
      titulo: 'Dificultades emocionales',
      descripcion: 'Problemas de regulación emocional'
    },
    conductaAula2: {
      titulo: 'Dificultades de aprendizaje',
      descripcion: 'Problemas específicos en el aprendizaje'
    },
    conductaAula3: null,
    soluciones: []
  }
];

const TablaAlumnos = ({ language }) => {
  const datos = useMemo(() => {
    const data = language === 'en' ? educationalProblemsData.problems : problemasEducativos.problemas;
    return data.map(problema => ({
      id: problema.id,
      nombre: `Bus Year 10 - P${problema.id}`,
      descripcion: '(Wave 1, Diagnóstico formal: Sí)',
      trastornoPsicologico1: problema.category || problema.categoria,
      trastornoPsicologico2: null,
      trastornoPsicologico3: null,
      conductaAula1: {
        titulo: problema.description || problema.descripcion,
        descripcion: problema.behaviors?.[0]?.manifestations?.[0] || problema.conductas?.[0]?.manifestaciones?.[0]
      },
      conductaAula2: problema.behaviors?.[1] || problema.conductas?.[1] ? {
        titulo: problema.behaviors?.[1]?.type || problema.conductas?.[1]?.tipo,
        descripcion: problema.behaviors?.[1]?.manifestations?.[0] || problema.conductas?.[1]?.manifestaciones?.[0]
      } : null,
      conductaAula3: problema.behaviors?.[2] || problema.conductas?.[2] ? {
        titulo: problema.behaviors?.[2]?.type || problema.conductas?.[2]?.tipo,
        descripcion: problema.behaviors?.[2]?.manifestations?.[0] || problema.conductas?.[2]?.manifestaciones?.[0]
      } : null,
      soluciones: problema.solutions?.map(solution => language === 'en' ? solution : problema.soluciones?.[0]) || problema.soluciones || [],
    }));
  }, [language]);

  const [filtro, setFiltro] = useState('');
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
  const [categoriaExpandida, setCategoriaExpandida] = useState({});
  const t = translations[language];

  const problems = language === 'es' ? problemasEducativos.problemas : educationalProblemsData.problems;

  const obtenerDetallesTrastorno = (nombreTrastorno) => {
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
    
    const mapeoIds = {
      'Trastorno por Déficit de Atención e Hiperactividad': 5,
      'Attention Deficit Hyperactivity Disorder': 5,
      'Dificultades Específicas del Aprendizaje': 1,
      'Specific Learning Difficulties': 1,
      'Trastorno del Procesamiento Auditivo': 6,
      'Auditory Processing Disorder': 6,
      'Social, Emocional y Salud Mental': 4,
      'Social, Emotional, and Mental Health': 4
    };

    const idBuscado = mapeoIds[categoriaBuscada];
    if (idBuscado !== undefined) {
      const problemaPorId = problems.find(p => p.id === idBuscado);
      if (problemaPorId) return problemaPorId;
    }

    const problemaPorCategoria = problems.find(p => {
      const matchKey = language === 'es' ? 'categoria' : 'category';
      const categoriaProblema = p[matchKey] || '';
      return categoriaProblema.toLowerCase() === categoriaBuscada.toLowerCase();
    });

    return problemaPorCategoria || null;
  };

  const obtenerSolucionesPorTrastorno = (alumno) => {
    const solucionesPorTrastorno = {};
    const solucionesEspecificas = {
      nombre: language === 'es' ? 'Soluciones Específicas' : 'Specific Solutions',
      soluciones: [{
        categoria: language === 'es' ? 'Personalizadas' : 'Personalized',
        estrategias: alumno.soluciones || []
      }]
    };

    // Procesar trastorno1
    if (alumno.trastornoPsicologico1) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico1);
      if (detalles) {
        const solutionsKey = language === 'es' ? 'soluciones' : 'solutions';
        solucionesPorTrastorno.trastorno1 = {
          nombre: alumno.trastornoPsicologico1,
          soluciones: detalles[solutionsKey] ? detalles[solutionsKey].map(s => ({
            categoria: s.categoria || s.category,
            estrategias: s.estrategias || s.strategies || []
          })) : []
        };
      }
    }

    // Procesar trastorno2
    if (alumno.trastornoPsicologico2) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico2);
      if (detalles) {
        const solutionsKey = language === 'es' ? 'soluciones' : 'solutions';
        solucionesPorTrastorno.trastorno2 = {
          nombre: alumno.trastornoPsicologico2,
          soluciones: detalles[solutionsKey] ? detalles[solutionsKey].map(s => ({
            categoria: s.categoria || s.category,
            estrategias: s.estrategias || s.strategies || []
          })) : []
        };
      }
    }

    return {
      solucionesEspecificas,
      ...solucionesPorTrastorno
    };
  };

  const obtenerConductasPorTrastorno = (alumno) => {
    const conductasPorTrastorno = {
      conducta1: null,
      conducta2: null
    };

    if (alumno.trastornoPsicologico1) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico1);
      if (detalles) {
        const behaviorsKey = language === 'es' ? 'conductas' : 'behaviors';
        conductasPorTrastorno.conducta1 = {
          nombre: alumno.trastornoPsicologico1,
          conductas: detalles[behaviorsKey] || []
        };
      }
    }

    if (alumno.trastornoPsicologico2) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico2);
      if (detalles) {
        const behaviorsKey = language === 'es' ? 'conductas' : 'behaviors';
        conductasPorTrastorno.conducta2 = {
          nombre: alumno.trastornoPsicologico2,
          conductas: detalles[behaviorsKey] || []
        };
      }
    }

    return conductasPorTrastorno;
  };

  const toggleConducta = (alumnoId, conductaIndex) => {
    setConductasExpandidas(prev => ({
      ...prev,
      [`${alumnoId}-${conductaIndex}`]: !prev[`${alumnoId}-${conductaIndex}`]
    }));
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

  const datosFiltrados = useMemo(() => {
    if (!filtro) return datos;
    
    const terminoBusqueda = filtro.toLowerCase();
    return datos.filter(alumno => {
      if (
        alumno.nombre.toLowerCase().includes(terminoBusqueda) ||
        (alumno.descripcion && alumno.descripcion.toLowerCase().includes(terminoBusqueda))
      ) return true;

      if (
        (alumno.trastornoPsicologico1 && alumno.trastornoPsicologico1.toLowerCase().includes(terminoBusqueda)) ||
        (alumno.trastornoPsicologico2 && alumno.trastornoPsicologico2.toLowerCase().includes(terminoBusqueda)) ||
        (alumno.trastornoPsicologico3 && alumno.trastornoPsicologico3.toLowerCase().includes(terminoBusqueda))
      ) return true;

      const conductas = [alumno.conductaAula1, alumno.conductaAula2, alumno.conductaAula3].filter(Boolean);
      const conductaEncontrada = conductas.some(conducta => 
        conducta.titulo.toLowerCase().includes(terminoBusqueda) ||
        (conducta.descripcion && conducta.descripcion.toLowerCase().includes(terminoBusqueda))
      );
      if (conductaEncontrada) return true;

      const solucionEncontrada = alumno.soluciones.some(solucion =>
        solucion.toLowerCase().includes(terminoBusqueda)
      );
      if (solucionEncontrada) return true;

      const trastornos = [
        alumno.trastornoPsicologico1,
        alumno.trastornoPsicologico2,
        alumno.trastornoPsicologico3
      ].filter(Boolean);

      const detallesTrastornos = trastornos.map(trastorno => obtenerDetallesTrastorno(trastorno)).filter(Boolean);
      
      return detallesTrastornos.some(detalle => {
        const conductasEncontradas = detalle.conductas.some(conducta =>
          conducta.tipo.toLowerCase().includes(terminoBusqueda) ||
          conducta.manifestaciones.some(m => m.toLowerCase().includes(terminoBusqueda))
        );
        if (conductasEncontradas) return true;

        return detalle.soluciones.some(solucion =>
          solucion.categoria.toLowerCase().includes(terminoBusqueda) ||
          solucion.estrategias.some(e => e.toLowerCase().includes(terminoBusqueda))
        );
      });
    });
  }, [datos, filtro, language]);

  const renderConducta = (alumno, conductaAula, index) => {
    if (!conductaAula) return null;

    const conductasPorTrastorno = obtenerConductasPorTrastorno(alumno);
    const conductaActual = index === 1 ? conductasPorTrastorno.conducta1 : conductasPorTrastorno.conducta2;
    const isExpanded = conductasExpandidas[`${alumno.id}-${index}`];

    if (!conductaActual) return null;

    return (
      <div className="relative">
        <div 
          className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 p-1 rounded"
          onClick={() => toggleConducta(alumno.id, index)}
        >
          <div className="flex-1">
            <div className="text-sm text-gray-900 dark:text-white flex items-center">
              {conductaAula.titulo}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 ml-1 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-1 text-gray-500" />
              )}
            </div>
            {conductaAula.descripcion && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                {conductaAula.descripcion}
              </div>
            )}
          </div>
        </div>
        
        {isExpanded && conductaActual.conductas.length > 0 && (
          <div className="mt-2 text-xs border-l-2 border-gray-200 dark:border-gray-600 pl-3">
            <div className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
              {conductaActual.nombre}
            </div>
            {conductaActual.conductas.map((conducta, cidx) => (
              <div key={cidx} className="mb-2">
                <div className="font-medium text-gray-700 dark:text-gray-300">
                  {language === 'es' ? conducta.tipo : conducta.type}
                </div>
                <ul className="mt-1 space-y-1">
                  {(language === 'es' ? conducta.manifestaciones : conducta.manifestations).map((manifestacion, midx) => (
                    <li key={midx} className="text-gray-600 dark:text-gray-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                      {manifestacion}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSoluciones = (alumno) => {
    const solucionesPorTrastorno = obtenerSolucionesPorTrastorno(alumno);

    return (
      <div className="space-y-2">
        {Object.entries(solucionesPorTrastorno).map(([key, { nombre, soluciones }]) => {
          if (!soluciones || soluciones.length === 0) return null;
          
          return (
            <div key={key} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleSolucion(alumno.id, key)}
                className="w-full px-4 py-2 flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <span className="font-medium text-sm text-gray-700 dark:text-gray-300">{nombre}</span>
                {solucionesExpandidas[alumno.id]?.[key] ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
              
              {solucionesExpandidas[alumno.id]?.[key] && (
                <div className="p-2 space-y-2">
                  {soluciones.map((solucion, index) => {
                    if (!solucion.estrategias || solucion.estrategias.length === 0) return null;
                    
                    return (
                      <div key={index} className="border rounded">
                        <button
                          onClick={() => toggleCategoria(alumno.id, key, solucion.categoria)}
                          className="w-full px-3 py-1.5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                        >
                          <span className="text-sm text-gray-600 dark:text-gray-400">{solucion.categoria}</span>
                          {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] ? (
                            <ChevronDown className="h-3 w-3 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-3 w-3 text-gray-400" />
                          )}
                        </button>
                        
                        {categoriaExpandida[`${alumno.id}-${key}-${solucion.categoria}`] && (
                          <ul className="p-2 space-y-1">
                            {solucion.estrategias.map((estrategia, idx) => (
                              <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 pl-3 relative before:content-['•'] before:absolute before:left-0 before:text-gray-400">
                                {estrategia}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-gray-800">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-10 w-10 mr-3" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">{t.title}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t.search}
              className="pl-9 pr-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-64"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.nameDescription}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.disorder1}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.disorder2}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.disorder3}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.behaviors1}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.behaviors2}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.behaviors3}
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider border border-gray-200 dark:border-gray-700">
                {t.columns.solutions}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {datosFiltrados.map((alumno) => (
              <tr key={alumno.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3 border border-gray-200 dark:border-gray-700">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{alumno.nombre}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{alumno.descripcion}</div>
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
  );
}

export default TablaAlumnos;
