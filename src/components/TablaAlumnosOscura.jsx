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
  ChevronRight
} from 'lucide-react';
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
    trastornoPsicologico3: null,
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
    trastornoPsicologico3: null,
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
    trastornoPsicologico3: null,
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
    trastornoPsicologico3: null,
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
    trastornoPsicologico3: null,
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
    trastornoPsicologico3: null,
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

const TablaAlumnosOscura = ({ language }) => {
  const datos = useMemo(() => {
    const data = language === 'en' ? educationalProblemsData.problems : problemasEducativos.problemas;
    return data.map(problema => {
      const conductas = language === 'es' ? problema.conductas : problema.behaviors;
      return {
        id: problema.id,
        nombre: `Bus Year 10 - P${problema.id}`,
        descripcion: '(Wave 1, Diagnóstico formal: Sí)',
        trastornoPsicologico1: problema.category || problema.categoria,
        trastornoPsicologico2: null,
        trastornoPsicologico3: null,
        conductaAula1: conductas && conductas[0] ? {
          titulo: conductas[0].tipo || conductas[0].type,
          descripcion: (conductas[0].manifestaciones || conductas[0].manifestations || [])[0] || '',
          detalles: conductas[0].manifestaciones || conductas[0].manifestations || []
        } : null,
        conductaAula2: conductas && conductas[1] ? {
          titulo: conductas[1].tipo || conductas[1].type,
          descripcion: (conductas[1].manifestaciones || conductas[1].manifestations || [])[0] || '',
          detalles: conductas[1].manifestaciones || conductas[1].manifestations || []
        } : null,
        conductaAula3: conductas && conductas[2] ? {
          titulo: conductas[2].tipo || conductas[2].type,
          descripcion: (conductas[2].manifestaciones || conductas[2].manifestations || [])[0] || '',
          detalles: conductas[2].manifestaciones || conductas[2].manifestations || []
        } : null,
        soluciones: problema.solutions || problema.soluciones || [],
      };
    });
  }, [language]);

  const [filtro, setFiltro] = useState('');
  const [conductasExpandidas, setConductasExpandidas] = useState({});
  const [solucionesExpandidas, setSolucionesExpandidas] = useState({});
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
      soluciones: alumno.soluciones ? [alumno.soluciones].flat() : []
    };

    if (alumno.trastornoPsicologico1) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico1);
      if (detalles) {
        const solutionsKey = language === 'es' ? 'soluciones' : 'solutions';
        solucionesPorTrastorno.trastorno1 = {
          nombre: alumno.trastornoPsicologico1,
          soluciones: detalles[solutionsKey] || []
        };
      }
    }

    if (alumno.trastornoPsicologico2) {
      const detalles = obtenerDetallesTrastorno(alumno.trastornoPsicologico2);
      if (detalles) {
        const solutionsKey = language === 'es' ? 'soluciones' : 'solutions';
        solucionesPorTrastorno.trastorno2 = {
          nombre: alumno.trastornoPsicologico2,
          soluciones: detalles[solutionsKey] || []
        };
      }
    }

    return { ...solucionesPorTrastorno, especificas: solucionesEspecificas };
  };

  const renderConducta = (alumno, conductaIndex) => {
    // Solo mostrar conducta si hay un trastorno correspondiente
    const trastorno = alumno[`trastornoPsicologico${conductaIndex}`];
    if (!trastorno) return null;

    // Obtener los detalles del trastorno
    const detallesTrastorno = obtenerDetallesTrastorno(trastorno);
    if (!detallesTrastorno) return null;

    const conductas = language === 'es' ? detallesTrastorno.conductas : detallesTrastorno.behaviors;
    if (!conductas || conductas.length === 0) return null;

    // Obtener la conducta específica para esta columna
    const conductaAula = alumno[`conductaAula${conductaIndex}`];
    if (!conductaAula) return null;

    const isExpanded = conductasExpandidas[`${alumno.id}-${conductaIndex}`];
    const toggleExpanded = () => {
      setConductasExpandidas(prev => ({
        ...prev,
        [`${alumno.id}-${conductaIndex}`]: !prev[`${alumno.id}-${conductaIndex}`]
      }));
    };

    return (
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 cursor-pointer text-gray-300"
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
          <div className="pl-6 space-y-4">
            <div className="text-sm text-gray-400">
              {conductaAula.descripcion}
            </div>
            {conductaAula.detalles.map((detalle, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-medium text-gray-300">
                  {detalle}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderSoluciones = (alumno) => {
    const soluciones = obtenerSolucionesPorTrastorno(alumno);
    const isExpanded = solucionesExpandidas[alumno.id];
    
    const toggleExpanded = () => {
      setSolucionesExpandidas(prev => ({
        ...prev,
        [alumno.id]: !prev[alumno.id]
      }));
    };

    if (!soluciones) return null;

    const renderSolucion = (solucion) => {
      if (typeof solucion === 'string') {
        return <div className="text-sm text-gray-400">{solucion}</div>;
      }

      if (solucion.categoria && solucion.estrategias) {
        return (
          <div className="text-sm text-gray-400">
            <div className="font-medium">{solucion.categoria}</div>
            <ul className="list-disc list-inside pl-4">
              {Array.isArray(solucion.estrategias) 
                ? solucion.estrategias.map((estrategia, idx) => (
                    <li key={idx}>{estrategia}</li>
                  ))
                : <li>{String(solucion.estrategias)}</li>
              }
            </ul>
          </div>
        );
      }

      return <div className="text-sm text-gray-400">{JSON.stringify(solucion)}</div>;
    };

    return (
      <div className="space-y-2">
        <div
          className="flex items-center space-x-2 cursor-pointer text-gray-300"
          onClick={toggleExpanded}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
          <span className="font-medium">
            {language === 'es' ? 'Ver soluciones' : 'View solutions'}
          </span>
        </div>
        {isExpanded && (
          <div className="pl-6 space-y-4">
            {Object.entries(soluciones).map(([key, data]) => {
              if (!data || !data.soluciones || data.soluciones.length === 0) return null;
              
              return (
                <div key={key} className="space-y-2">
                  <div className="font-medium text-gray-300">
                    {data.nombre}
                  </div>
                  <div className="space-y-1">
                    {data.soluciones.map((solucion, idx) => (
                      <div key={idx}>
                        {renderSolucion(solucion)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const datosFiltrados = useMemo(() => {
    if (!filtro) return datos;
    const filtroLower = filtro.toLowerCase();
    return datos.filter(alumno => 
      alumno.nombre.toLowerCase().includes(filtroLower) ||
      alumno.descripcion.toLowerCase().includes(filtroLower) ||
      (alumno.trastornoPsicologico1 && alumno.trastornoPsicologico1.toLowerCase().includes(filtroLower)) ||
      (alumno.trastornoPsicologico2 && alumno.trastornoPsicologico2.toLowerCase().includes(filtroLower))
    );
  }, [datos, filtro]);

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
              <h1 className="text-xl font-semibold text-white">{t.title}</h1>
              <p className="text-gray-400 text-sm">{t.darkMode}</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-violet-600 text-white rounded-lg flex items-center space-x-2 hover:bg-violet-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>{t.newStudent}</span>
          </button>
        </div>

        {/* Búsqueda */}
        <div className="mt-6 flex space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
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
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Nombre/Descripción' : 'Name/Description'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Trastorno 1' : 'Disorder 1'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Trastorno 2' : 'Disorder 2'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Trastorno 3' : 'Disorder 3'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Conducta 1' : 'Behavior 1'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Conducta 2' : 'Behavior 2'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Conducta 3' : 'Behavior 3'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                {language === 'es' ? 'Soluciones' : 'Solutions'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
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
                  {alumno.trastornoPsicologico1 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-900/30 text-blue-300">
                      {alumno.trastornoPsicologico1}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {alumno.trastornoPsicologico2 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-900/30 text-purple-300">
                      {alumno.trastornoPsicologico2}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {alumno.trastornoPsicologico3 && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-900/30 text-green-300">
                      {alumno.trastornoPsicologico3}
                    </span>
                  )}
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 1)}
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 2)}
                </td>
                <td className="px-4 py-4">
                  {renderConducta(alumno, 3)}
                </td>
                <td className="px-6 py-4">
                  {renderSoluciones(alumno)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <div>
          {t.footer.showing.replace('{count}', datosFiltrados.length).replace('{total}', datos.length)}
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">{t.footer.prev}</button>
          <button className="px-3 py-1 rounded-lg bg-violet-900/50 text-violet-300">1</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">2</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">3</button>
          <button className="px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">{t.footer.next}</button>
        </div>
      </div>
    </div>
  );
};

export default TablaAlumnosOscura;
