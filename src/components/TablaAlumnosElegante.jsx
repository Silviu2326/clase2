import React, { useState } from 'react'; 
import { Search, ChevronDown, ChevronRight, ChevronUp, Filter, Settings, Download, Plus } from 'lucide-react';
import logo from './logo.jpeg';
import studentsData from '../data/students.json';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblems from '../data/educational-problems.json';

// Mapeo de códigos de condiciones a IDs de problemas educativos
const codigoAId = {
  'C&L': 1,
  'SEMH': 4,
  'ADHD': 5,
  'SpLD': 16,
  'APD': 6,
  'NSA': 19
};

// Traducciones
const translations = {
  es: {
    title: 'Tabla de Alumnos',
    darkMode: 'Modo Oscuro',
    newStudent: 'Nuevo Alumno',
    searchPlaceholder: 'Buscar...',
    buttons: {
      settings: 'Configuración',
      export: 'Exportar',
      filters: 'Filtros'
    },
    name: 'Nombre',
    disorder: 'Condición',
    disorders: 'Condiciones',
    behavior: 'Conducta',
    behaviors: 'Conductas',
    solutions: 'Soluciones',
    viewBehaviors: 'Ver conductas',
    viewSolutions: 'Ver soluciones',
    solutionsFor: 'Soluciones para',
    behaviorsFor: 'Conductas de'
  },
  en: {
    title: 'Students Table',
    darkMode: 'Dark Mode',
    newStudent: 'New Student',
    searchPlaceholder: 'Search...',
    buttons: {
      settings: 'Settings',
      export: 'Export',
      filters: 'Filters'
    },
    name: 'Name',
    disorder: 'Condition',
    disorders: 'Conditions',
    behavior: 'Behavior',
    behaviors: 'Behaviors',
    solutions: 'Solutions',
    viewBehaviors: 'View behaviors',
    viewSolutions: 'View solutions',
    solutionsFor: 'Solutions for',
    behaviorsFor: 'Behaviors of'
  }
};

const TablaAlumnosElegante = ({ language = 'es' }) => {
  // Para traducciones
  const t = translations[language] || translations['es'];

  // Estados para expansión y búsqueda
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [busquedaGlobal, setBusquedaGlobal] = useState('');

  // Seleccionar el conjunto de datos según el idioma
  const problemsData = language === 'es' ? problemasEducativos : educationalProblems;

  /**
   * Función para obtener las conductas asociadas a un trastorno específico
   */
  const getConductas = (disorder) => {
    console.log('Getting conductas for disorder:', disorder);
    const problemaId = codigoAId[disorder.code];
    console.log('Mapped problemaId:', problemaId);
    if (!problemaId) return null;

    const problems = language === 'es' ? problemsData.problemas : problemsData.problems;
    console.log('Selected problems data:', problems);
    console.log('Current language:', language);
    const problema = problems.find(p => p.id === problemaId);
    console.log('Found problema:', problema);
    
    if (!problema) return null;

    const behaviors = language === 'es' ? problema.conductas : problema.behaviors;
    console.log('Selected behaviors:', behaviors);
    
    if (!behaviors) return [];

    // Mantener la estructura completa de las conductas
    const mappedBehaviors = behaviors.map(behavior => ({
      tipo: language === 'es' ? behavior.tipo : behavior.type,
      manifestaciones: language === 'es' ? behavior.manifestaciones : behavior.manifestations || []
    }));
    
    console.log('Final behaviors:', mappedBehaviors);
    return mappedBehaviors;
  };

  const getSoluciones = (disorder) => {
    console.log('Getting solutions for disorder:', disorder.code);
    const problemaId = codigoAId[disorder.code];
    if (!problemaId) {
      console.log('No problema ID found for code:', disorder.code);
      return null;
    }

    const problems = language === 'es' ? problemsData.problemas : problemsData.problems;
    const problema = problems.find(p => p.id === problemaId);
    
    if (!problema) {
      console.log('No problema found for ID:', problemaId);
      return null;
    }

    console.log('Found problema:', problema);
    
    // Obtener las soluciones según el idioma
    const solutions = language === 'es' ? problema.soluciones : problema.solutions;
    if (!solutions) {
      console.log('No solutions found');
      return [];
    }

    // Transformar las soluciones al formato esperado
    const formattedSolutions = solutions.map(solution => ({
      categoria: language === 'es' ? solution.categoria : solution.category,
      estrategias: language === 'es' ? solution.estrategias : solution.strategies || []
    }));

    console.log('Formatted solutions:', formattedSolutions);
    return formattedSolutions;
  };

  const isNSA = (disorder) => {
    return disorder && disorder.code === 'NSA';
  };

  const getBehaviorHelperText = (disorder) => {
    if (!disorder) return '';
    if (isNSA(disorder)) return 'No se aplica';
    const conductas = getConductas(disorder);
    if (!conductas || conductas.length === 0) return 'No hay conductas asociadas';
    return `Ver conductas (${conductas.length})`;
  };

  const getSolutionHelperText = (disorder) => {
    if (!disorder) return '';
    if (isNSA(disorder)) return 'No se aplica';
    const soluciones = getSoluciones(disorder);
    if (!soluciones || soluciones.length === 0) return 'No hay soluciones asociadas';
    return `Ver soluciones (${soluciones.length})`;
  };

  /**
   * Filtrado de los datos a partir de la búsqueda global
   */
  const datosFiltrados = Object.values(studentsData.groups).flatMap((group) =>
    group.students.filter((student) => {
      // Coincidencia en el nombre del grupo o en cualquier trastorno
      const matchGroup = student.group.toLowerCase().includes(busquedaGlobal.toLowerCase());
      const matchDisorders = student.disorders.some(
        (d) =>
          d.name.toLowerCase().includes(busquedaGlobal.toLowerCase()) ||
          d.code.toLowerCase().includes(busquedaGlobal.toLowerCase())
      );

      return matchGroup || matchDisorders;
    })
  );

  const toggleBehaviors = (studentId, disorder) => {
    console.log('Toggling behaviors for student:', studentId, 'disorder:', disorder);
    setExpandedItems(prev => {
      const key = `${studentId}-${disorder.id}-behaviors`;
      const newItems = { ...prev };
      newItems[key] = !prev[key];
      return newItems;
    });
  };

  const toggleSolutions = (studentId, disorder) => {
    console.log('Toggling solutions for student:', studentId, 'disorder:', disorder);
    setExpandedItems(prev => {
      const key = `${studentId}-${disorder.id}-solutions`;
      const newItems = { ...prev };
      newItems[key] = !prev[key];
      return newItems;
    });
  };

  const toggleStudent = (studentId) => {
    setExpandedStudent(prev => {
      const newState = prev === studentId ? null : studentId;
      if (newState === null) {
        // Si cerramos el estudiante, limpiamos los estados de expansión
        setExpandedItems({});
      }
      return newState;
    });
  };

  const isExpanded = (studentId, disorderId, type) => {
    const key = `${studentId}-${disorderId}-${type}`;
    return expandedItems[key] || false;
  };

  /**
   * Renderiza las soluciones para un trastorno dado
   */
  const renderSoluciones = (soluciones) => {
    console.log('Rendering solutions:', soluciones);
    if (!soluciones || !Array.isArray(soluciones) || soluciones.length === 0) {
      console.log('No solutions to render');
      return null;
    }

    return (
      <div className="space-y-4">
        {soluciones.map((solucion, idx) => {
          if (!solucion || !solucion.categoria || !Array.isArray(solucion.estrategias)) {
            console.log('Invalid solution object:', solucion);
            return null;
          }

          return (
            <div key={idx} className="space-y-2">
              <h5 className="text-sm font-medium text-red-700 dark:text-red-300">
                {solucion.categoria}:
              </h5>
              <ul className="list-disc pl-5 space-y-1">
                {solucion.estrategias.map((estrategia, estrategiaIdx) => (
                  <li
                    key={estrategiaIdx}
                    className="text-sm text-slate-600 dark:text-slate-300"
                  >
                    {estrategia}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4 bg-white dark:bg-slate-900 shadow-lg rounded-xl">
      {/* Header with subtle gradient border bottom */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-red-100 dark:border-red-800">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20 rounded-xl border border-red-100 dark:border-red-800 shadow-sm hover:shadow-md transition-shadow duration-300">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent dark:from-red-400 dark:to-red-300">{t.title}</h1>
            <p className="text-sm text-red-400 dark:text-red-300">{t.darkMode}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            className="p-2 text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:shadow-sm"
            title={t.buttons.settings}
          >
            <Settings className="w-4 h-4" />
          </button>
          <button
            className="p-2 text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:shadow-sm"
            title={t.buttons.export}
          >
            <Download className="w-4 h-4" />
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-lg flex items-center space-x-2 hover:from-red-600 hover:to-red-500 transition-all duration-300 shadow-sm hover:shadow-md">
            <Plus className="w-4 h-4" />
            <span>{t.newStudent}</span>
          </button>
        </div>
      </div>

      {/* Search bar with elegant design */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={busquedaGlobal}
            onChange={(e) => setBusquedaGlobal(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-lg border border-red-100 dark:border-red-800 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-700 transition-all duration-300 shadow-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-300 w-4 h-4" />
        </div>
        <button
          className="p-2.5 text-red-500 dark:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-300 hover:shadow-sm border border-red-100 dark:border-red-800"
          title={t.buttons.filters}
        >
          <Filter className="w-4 h-4" />
        </button>
      </div>

      {/* Table with refined styling */}
      <div className="overflow-x-auto border border-red-100 dark:border-red-800 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-red-100 dark:divide-red-800">
          <thead>
            <tr className="bg-gradient-to-r from-red-50 to-white dark:from-red-900/10 dark:to-slate-800">
              <th className="px-6 py-4 text-left text-xs font-medium text-red-600 dark:text-red-300 uppercase tracking-wider border-r border-red-100 dark:border-red-800">
                {t.name}
              </th>
              {[1, 2, 3, 4].map(num => (
                <th
                  key={`disorder-${num}`}
                  className="px-6 py-4 text-center text-xs font-medium text-red-600 dark:text-red-300 uppercase tracking-wider border-r border-red-100 dark:border-red-800"
                >
                  {t.disorder} {num}
                </th>
              ))}
              {[1, 2, 3, 4].map(num => (
                <th
                  key={`behavior-${num}`}
                  className="px-6 py-4 text-center text-xs font-medium text-red-600 dark:text-red-300 uppercase tracking-wider border-r border-red-100 dark:border-red-800"
                >
                  {t.behavior} {num}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-xs font-medium text-red-600 dark:text-red-300 uppercase tracking-wider">
                {t.solutions}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-red-100 dark:divide-red-800">
            {datosFiltrados.map((student) => (
              <React.Fragment key={student.id}>
                {/* Fila principal */}
                <tr
                  className={`cursor-pointer hover:bg-red-50 dark:hover:bg-red-900/20 ${
                    expandedStudent === student.id ? 'bg-red-50 dark:bg-red-900/20' : ''
                  }`}
                  onClick={() => toggleStudent(student.id)}
                >
                  {/* Nombre/Grupo */}
                  <td className="px-4 py-4 border-r border-red-100 dark:border-red-800">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-red-200 dark:bg-red-600 text-white rounded-lg flex items-center justify-center">
                        <span className="text-red-700 dark:text-red-100">
                          {student.group.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-red-800 dark:text-red-100">
                          {student.group} {student.period}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Trastornos */}
                  {[0, 1, 2, 3].map(index => (
                    <td
                      key={index}
                      className="px-6 py-4 text-center border-r border-red-100 dark:border-red-800 group-hover:bg-red-50/50 dark:group-hover:bg-red-900/10 transition-colors duration-300"
                    >
                      {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                        <span className="text-red-600 dark:text-red-300 font-medium">
                          {student.disorders[index].code}
                        </span>
                      ) : (
                        <span className="text-red-200 dark:text-red-800/50">-</span>
                      )}
                    </td>
                  ))}

                  {/* Conductas */}
                  {[0, 1, 2, 3].map(index => (
                    <td
                      key={index}
                      className="px-6 py-4 border-r border-red-100 dark:border-red-800 group-hover:bg-red-50/50 dark:group-hover:bg-red-900/10 transition-colors duration-300"
                    >
                      {student.disorders[index] && !isNSA(student.disorders[index]) ? (
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBehaviors(student.id, student.disorders[index]);
                            }}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-slate-800 text-red-600 dark:text-red-300 hover:from-red-100 hover:to-red-50 dark:hover:from-red-800/30 dark:hover:to-red-900/30 transition-all duration-300 mr-2 mb-2 shadow-sm hover:shadow-md border border-red-100 dark:border-red-800"
                          >
                            {student.disorders[index].code}
                          </button>
                          {isExpanded(student.id, student.disorders[index].id, 'behaviors') && (
                            <div className="mt-2 p-4 rounded-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20 border border-red-100 dark:border-red-800 shadow-sm">
                              <h4 className="text-sm font-semibold text-red-700 dark:text-red-200 mb-3">
                                {t.behaviorsFor} {student.disorders[index].name}
                              </h4>
                              <div className="space-y-4">
                                {getConductas(student.disorders[index])?.map((conducta, idx) => (
                                  <div key={idx} className="space-y-2 hover:bg-white dark:hover:bg-slate-800 p-3 rounded-lg transition-colors duration-300">
                                    <h5 className="text-sm font-medium text-red-700 dark:text-red-300">
                                      {conducta.tipo}:
                                    </h5>
                                    <ul className="list-disc pl-5 space-y-1">
                                      {conducta.manifestaciones.map((manifestacion, midx) => (
                                        <li
                                          key={midx}
                                          className="text-sm text-slate-600 dark:text-slate-300"
                                        >
                                          {manifestacion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-red-200 dark:text-red-800/50">-</span>
                      )}
                    </td>
                  ))}

                  {/* Soluciones */}
                  <td className="px-6 py-4 border-r border-red-100 dark:border-red-800 group-hover:bg-red-50/50 dark:group-hover:bg-red-900/10 transition-colors duration-300">
                    {student.disorders.filter(d => !isNSA(d)).map((disorder) => (
                      <button
                        key={disorder.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('===== DISORDER CLICKED FOR SOLUTIONS =====');
                          console.log('Disorder:', disorder);
                          console.log('Student:', student);
                          toggleSolutions(student.id, disorder);
                        }}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-red-50 to-white dark:from-red-900/20 dark:to-slate-800 text-red-600 dark:text-red-300 hover:from-red-100 hover:to-red-50 dark:hover:from-red-800/30 dark:hover:to-red-900/30 transition-all duration-300 mr-2 mb-2 shadow-sm hover:shadow-md border border-red-100 dark:border-red-800"
                      >
                        {disorder.code}
                      </button>
                    ))}
                    {student.disorders.filter(d => !isNSA(d)).map((disorder) => (
                      <React.Fragment key={disorder.id}>
                        {isExpanded(student.id, disorder.id, 'solutions') && (
                          <div className="p-4 rounded-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20 border border-red-100 dark:border-red-800 shadow-sm space-y-4">
                            <h4 className="text-sm font-semibold text-red-700 dark:text-red-200 mb-3">
                              {t.solutionsFor} {disorder.name}
                            </h4>
                            {renderSoluciones(getSoluciones(disorder))}
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </td>
                </tr>

                {/* Fila expandida con detalles de conductas y soluciones */}
                {expandedStudent === student.id && (
                  <tr className="bg-red-50 dark:bg-red-900/20">
                    <td
                      colSpan={1 + 4 + 4 + 1}
                      className="px-4 py-4 border-r border-red-100 dark:border-red-800"
                    >
                      <div className="space-y-4">
                        {student.disorders.map((disorder) => {
                          if (!disorder || isNSA(disorder)) return null;

                          const conductasForDisorder = getConductas(disorder);
                          const solucionesForDisorder = getSoluciones(disorder);

                          return (
                            <div key={disorder.id} className="space-y-4">
                              {/* Conductas */}
                              {isExpanded(student.id, disorder.id, 'behaviors') && conductasForDisorder && conductasForDisorder.length > 0 && (
                                <div className="p-4 rounded-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20 border border-red-100 dark:border-red-800 shadow-sm">
                                  <h4 className="text-sm font-semibold text-red-700 dark:text-red-200 mb-3">
                                    {t.behaviorsFor} {disorder.name} ({disorder.code})
                                  </h4>
                                  <div className="space-y-2">
                                    {conductasForDisorder.map((conducta, idx) => (
                                      <div key={idx} className="mb-4">
                                        <h5 className="text-sm font-medium text-red-700 dark:text-red-300 mb-2">
                                          {conducta.tipo}:
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1">
                                          {conducta.manifestaciones.map((manifestacion, midx) => (
                                            <li
                                              key={midx}
                                              className="text-sm text-slate-600 dark:text-slate-300"
                                            >
                                              {manifestacion}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Soluciones */}
                              {isExpanded(student.id, disorder.id, 'solutions') && solucionesForDisorder && solucionesForDisorder.length > 0 && (
                                <div className="p-4 rounded-lg bg-gradient-to-br from-white to-red-50 dark:from-slate-800 dark:to-red-900/20 border border-red-100 dark:border-red-800 shadow-sm">
                                  <h4 className="text-sm font-semibold text-red-700 dark:text-red-200 mb-3">
                                    {t.solutionsFor} {disorder.name} ({disorder.code})
                                  </h4>
                                  <div className="space-y-4">
                                    {solucionesForDisorder.map((solucion, idx) => (
                                      <div key={idx} className="space-y-2 hover:bg-white dark:hover:bg-slate-800 p-3 rounded-lg transition-colors duration-300">
                                        <h5 className="text-sm font-medium text-red-700 dark:text-red-300">
                                          {solucion.categoria}
                                        </h5>
                                        <ul className="list-disc pl-5 space-y-1">
                                          {solucion.estrategias.map((estrategia, eidx) => (
                                            <li
                                              key={eidx}
                                              className="text-sm text-slate-600 dark:text-slate-300"
                                            >
                                              {estrategia}
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaAlumnosElegante;
