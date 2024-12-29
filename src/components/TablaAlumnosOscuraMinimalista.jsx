import React, { useState } from 'react';
import studentsData from '../data/students.json';
import problemasEducativos from '../data/problemas-educativos.json';
import educationalProblems from '../data/educational-problems.json';

const TablaAlumnosOscuraMinimalista = ({ language = 'es' }) => {
  const [expandedStudent, setExpandedStudent] = useState(null);
  const [expandedBehaviors, setExpandedBehaviors] = useState({});
  const [expandedSolutions, setExpandedSolutions] = useState({});

  // Seleccionar el conjunto de datos según el idioma
  const problemsData = language === 'es' ? problemasEducativos : educationalProblems;

  // Traducciones
  const translations = {
    es: {
      name: 'Nombre',
      disorder: 'Trastorno',
      behavior: 'Conducta',
      solutions: 'Soluciones',
      viewBehaviors: 'Ver conductas',
      viewSolutions: 'Ver soluciones',
      solutionsFor: 'Soluciones para',
      behaviorsFor: 'Conductas de'
    },
    en: {
      name: 'Name',
      disorder: 'Disorder',
      behavior: 'Behavior',
      solutions: 'Solutions',
      viewBehaviors: 'View behaviors',
      viewSolutions: 'View solutions',
      solutionsFor: 'Solutions for',
      behaviorsFor: 'Behaviors of'
    }
  };

  const t = (key) => translations[language][key];

  // Función para alternar la expansión de un estudiante
  const toggleExpand = (studentId) => {
    setExpandedStudent(expandedStudent === studentId ? null : studentId);
  };

  // Función para alternar la expansión de conductas para un trastorno específico
  const toggleBehavior = (e, studentId, disorderId) => {
    e.stopPropagation();
    setExpandedBehaviors(prev => ({
      ...prev,
      [`${studentId}-${disorderId}`]: !prev[`${studentId}-${disorderId}`]
    }));
  };

  // Función para alternar la expansión de soluciones para un trastorno específico
  const toggleSolution = (e, studentId, disorderId) => {
    e.stopPropagation();
    setExpandedSolutions(prev => ({
      ...prev,
      [`${studentId}-${disorderId}`]: !prev[`${studentId}-${disorderId}`]
    }));
  };

  // Función para obtener el color de fondo según el índice de la fila
  const getRowColor = (index) => {
    return index % 2 === 0 ? 'bg-slate-800 hover:bg-slate-700' : 'bg-slate-700 hover:bg-slate-600';
  };

  // Mapeo de códigos de trastornos a IDs de problemas educativos
  const codigoAId = {
    'C&L': 1,  // Cognición y Aprendizaje
    'SEMH': 4, // Social, Emocional y Salud Mental
    'ADHD': 5, // Trastorno por Déficit de Atención e Hiperactividad
    'SpLD': 16, // Dificultades Específicas del Aprendizaje
    'APD': 6,  // Trastorno del Procesamiento Auditivo
    'NSA': 19  // Sin Evaluación Especializada (No Specialist Assessment)
  };

  // Función para obtener las conductas asociadas a un trastorno específico
  const getConductas = (disorder) => {
    const problemaId = codigoAId[disorder.code];
    if (!problemaId) return null;

    const problems = language === 'es' ? problemsData.problemas : problemsData.problems;
    const problema = problems.find(p => p.id === problemaId);
    
    if (!problema) return null;

    return language === 'es' ? problema.conductas : problema.behaviors;
  };

  // Función para verificar si es NSA
  const isNSA = (disorder) => {
    return disorder && disorder.code === 'NSA';
  };

  return (
    <div className="p-4 bg-slate-900 text-gray-100 min-h-screen">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-purple-900">
              <th className="px-4 py-3 text-left">{t('name')}</th>
              <th className="px-4 py-3 text-left">{t('disorder')} 1</th>
              <th className="px-4 py-3 text-left">{t('disorder')} 2</th>
              <th className="px-4 py-3 text-left">{t('disorder')} 3</th>
              <th className="px-4 py-3 text-left">{t('disorder')} 4</th>
              <th className="px-4 py-3 text-left">{t('behavior')} 1</th>
              <th className="px-4 py-3 text-left">{t('behavior')} 2</th>
              <th className="px-4 py-3 text-left">{t('behavior')} 3</th>
              <th className="px-4 py-3 text-left">{t('behavior')} 4</th>
              <th className="px-4 py-3 text-left">{t('solutions')}</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(studentsData.groups).map(group =>
              group.students.map((student, index) => (
                <React.Fragment key={student.id}>
                  <tr
                    className={`border-b border-slate-600 cursor-pointer transition-colors ${
                      getRowColor(index)
                    }`}
                    onClick={() => toggleExpand(student.id)}
                  >
                    <td className="px-4 py-3">
                      {student.group} {student.period}
                    </td>
                    {[0, 1, 2, 3].map(index => (
                      <td key={`disorder-${index}`} className="px-4 py-3">
                        {student.disorders[index] ? (
                          <span
                            className="inline-block px-2 py-1 text-sm rounded-full bg-emerald-700"
                            title={student.disorders[index].name}
                          >
                            {student.disorders[index].code}
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    ))}
                    {[0, 1, 2, 3].map(index => (
                      <td key={`behavior-${index}`} className="px-4 py-3">
                        {student.disorders[index] ? (
                          isNSA(student.disorders[index]) ? (
                            <span className="text-slate-400">-</span>
                          ) : (
                            <button
                              onClick={(e) => toggleBehavior(e, student.id, student.disorders[index].id)}
                              className="px-3 py-1 bg-emerald-700 rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                            >
                              {student.disorders[index].code}
                            </button>
                          )
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                    ))}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        {student.disorders
                          .filter(disorder => !isNSA(disorder))
                          .map(disorder => (
                            <button
                              key={disorder.id}
                              onClick={(e) => toggleSolution(e, student.id, disorder.id)}
                              className="px-3 py-1 bg-emerald-700 rounded-lg hover:bg-emerald-600 transition-colors text-sm"
                            >
                              {disorder.code}
                            </button>
                          ))}
                      </div>
                    </td>
                  </tr>
                  {expandedStudent === student.id && (
                    <tr className={getRowColor(index + 1)}>
                      <td colSpan="10" className="px-4 py-3">
                        <div className="space-y-2">
                          {student.disorders.map(disorder => (
                            <div key={disorder.id} className="p-2 bg-emerald-700 rounded">
                              <div className="font-semibold">{disorder.name}</div>
                              {disorder.notes && (
                                <div className="text-sm text-slate-300 mt-1">
                                  {disorder.notes}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    </tr>
                  )}
                  {student.disorders.map(disorder => {
                    const conductasForDisorder = getConductas(disorder);
                    const isExpandedBehavior = expandedBehaviors[`${student.id}-${disorder.id}`];
                    const isExpandedSolution = expandedSolutions[`${student.id}-${disorder.id}`];
                    
                    if (!conductasForDisorder) return null;

                    return (
                      <React.Fragment key={`behavior-solution-${student.id}-${disorder.id}`}>
                        {isExpandedBehavior && (
                          <tr className={getRowColor(index + 2)}>
                            <td colSpan="10" className="px-4 py-3">
                              <div className="mb-3 text-lg font-semibold">
                                {t('behaviorsFor')} {disorder.code} - {disorder.name}
                              </div>
                              <div className="space-y-4">
                                {conductasForDisorder.map((conducta, index) => (
                                  <div key={index} className="p-3 bg-emerald-700 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                      {language === 'es' ? conducta.tipo : conducta.type}
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {(language === 'es' ? conducta.manifestaciones : conducta.manifestations).map((manifestacion, idx) => (
                                        <li key={idx} className="text-sm text-slate-300">
                                          {manifestacion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                        {isExpandedSolution && (
                          <tr className={getRowColor(index + 3)}>
                            <td colSpan="10" className="px-4 py-3">
                              <div className="mb-3 text-lg font-semibold">
                                {t('solutionsFor')} {disorder.code} - {disorder.name}
                              </div>
                              <div className="space-y-4">
                                {conductasForDisorder.map((conducta, index) => (
                                  <div key={index} className="p-3 bg-emerald-700 rounded-lg">
                                    <h4 className="font-semibold mb-2">
                                      {language === 'es' ? conducta.tipo : conducta.type}
                                    </h4>
                                    <ul className="list-disc list-inside space-y-1">
                                      {(language === 'es' ? conducta.manifestaciones : conducta.manifestations).map((manifestacion, idx) => (
                                        <li key={idx} className="text-sm text-slate-300">
                                          {manifestacion}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TablaAlumnosOscuraMinimalista;
