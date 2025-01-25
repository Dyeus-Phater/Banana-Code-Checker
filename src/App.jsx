import React, { useState, useRef } from 'react';

const translations = {
  en: {
    title: 'Code Removal Corrector',
    originalFilesLabel: 'Original Files:',
    modifiedFilesLabel: 'Modified Files:',
    delimiterFileLabel: 'Custom Delimiter File (optional):',
    downloadTemplateButton: 'Download Delimiter Template',
    analyzeButton: 'Analyze',
    totalErrors: 'Total Errors:',
    errorLines: 'Error Lines:',
    correctedCode: 'Corrected Code:',
    uploadError: 'Please upload both original and modified files.',
    fileCountError: 'The number of original and modified files must be the same.',
    parseError: 'Error parsing delimiter file. Please ensure it is valid JSON.',
  },
  es: {
    title: 'Corrector de Eliminación de Código',
    originalFilesLabel: 'Archivos Originales:',
    modifiedFilesLabel: 'Archivos Modificados:',
    delimiterFileLabel: 'Archivo de Delimitador Personalizado (opcional):',
    downloadTemplateButton: 'Descargar Plantilla de Delimitador',
    analyzeButton: 'Analizar',
    totalErrors: 'Errores Totales:',
    errorLines: 'Líneas con Errores:',
    correctedCode: 'Código Corregido:',
    uploadError: 'Por favor, carga ambos archivos, original y modificado.',
    fileCountError: 'La cantidad de archivos originales y modificados debe ser la misma.',
    parseError: 'Error al analizar el archivo de delimitador. Asegúrate de que sea JSON válido.',
  },
	  es: {
    title: 'Corrector de Eliminación de Código',
    originalFilesLabel: 'Archivos Originales:',
    modifiedFilesLabel: 'Archivos Modificados:',
    delimiterFileLabel: 'Archivo de Delimitador Personalizado (opcional):',
    downloadTemplateButton: 'Descargar Plantilla de Delimitador',
    analyzeButton: 'Analizar',
    totalErrors: 'Errores Totales:',
    errorLines: 'Líneas con Errores:',
    correctedCode: 'Código Corregido:',
    uploadError: 'Por favor, carga ambos archivos, original y modificado.',
    fileCountError: 'La cantidad de archivos originales y modificados debe ser la misma.',
    parseError: 'Error al analizar el archivo de delimitador. Asegúrate de que sea JSON válido.',
  },
 ptbr: {
 título: 'Verificador de remoção de código',
 originalFilesLabel: 'Arquivos originais:',
 modifiedFilesLabel: 'Arquivos modificados:',
 delimiterFileLabel: 'Arquivo delimitador personalizado (opcional):',
 downloadTemplateButton: 'Baixar modelo de delimitador',
 analyzeButton: 'Analisar',
 totalErrors: 'Total de erros:',
 errorLines: 'Linhas com erros:',
 correctedCode: 'Código corrigido:',
 uploadError: 'Faça upload dos dois arquivos, original e modificado.',
 fileCountError: 'O número de arquivos originais e modificados deve ser o mesmo.',
 parseError: 'Erro ao analisar o arquivo delimitador. Certifique-se de que é um JSON válido.',
 },
  // Add more languages here...
};

function App() {
  const [originalFiles, setOriginalFiles] = useState([]);
  const [modifiedFiles, setModifiedFiles] = useState([]);
  const [delimiterFile, setDelimiterFile] = useState(null);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState('en'); // Default language
  const fileInputRef = useRef(null);

  const handleOriginalFileChange = (e) => {
    setOriginalFiles(Array.from(e.target.files));
  };

  const handleModifiedFileChange = (e) => {
    setModifiedFiles(Array.from(e.target.files));
  };

  const handleDelimiterFileChange = (e) => {
    setDelimiterFile(e.target.files[0]);
  };

  const downloadTemplate = () => {
    const template = '{\n  "delimiters": [\n    {"start": "(", "end": ")"}, \n    {"start": "[", "end": "]"}, \n    {"start": "{", "end": "}"}, \n    {"start": "<", "end": ">"}\n  ]\n}';
    const blob = new Blob([template], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'delimiter_template.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const analyzeFiles = async () => {
    // ... (rest of the analyzeFiles function remains the same)
  };

  const currentTranslations = translations[language];

  return (
    <div className="container">
      <h1>{currentTranslations.title}</h1>
      <div className="file-upload">
        <label htmlFor="originalFiles">{currentTranslations.originalFilesLabel}</label>
        <input type="file" multiple id="originalFiles" onChange={handleOriginalFileChange} ref={fileInputRef} />
        <label htmlFor="modifiedFiles">{currentTranslations.modifiedFilesLabel}</label>
        <input type="file" multiple id="modifiedFiles" onChange={handleModifiedFileChange} />
        <label htmlFor="delimiterFile">{currentTranslations.delimiterFileLabel}</label>
        <input type="file" id="delimiterFile" onChange={handleDelimiterFileChange} />
        <button onClick={downloadTemplate} className="download-template">{currentTranslations.downloadTemplateButton}</button>
        <button onClick={analyzeFiles}>{currentTranslations.analyzeButton}</button>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Español</option>
					<option value="ptbr">Português (Brasileiro)</option>
          {/* Add more language options here */}
        </select>
      </div>
      {results && (
        <div className="results">
          {results.map((result, index) => (
            <div key={index}>
              <h3>{result.fileName}</h3>
              <p>{currentTranslations.totalErrors} {result.errorCount}</p>
              {result.errorLines.length > 0 && (
                <>
                  <p>{currentTranslations.errorLines}</p>
                  <ul className="error-list">
                    {result.errorLines.map((line, index) => (
                      <li key={index}>Line {line}</li>
                    ))}
                  </ul>
                </>
              )}
              <p>{currentTranslations.correctedCode}</p>
              <pre className="corrected-code">{result.correctedCode}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
