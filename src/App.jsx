import React, { useState, useRef } from 'react';
import JSZip from 'jszip';

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
    downloadZipButton: 'Download Corrected Scripts'
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
    downloadZipButton: 'Descargar Scripts Corregidos'
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
    if (originalFiles.length === 0 || modifiedFiles.length === 0) {
        alert(currentTranslations.uploadError);
        return;
    }

    if (originalFiles.length !== modifiedFiles.length) {
        alert(currentTranslations.fileCountError);
        return;
    }

    let customDelimiters = [];
    if (delimiterFile) {
      try {
        const delimiterText = await delimiterFile.text();
        const delimiterData = JSON.parse(delimiterText);
        customDelimiters = delimiterData.delimiters;
      } catch (error) {
        alert(currentTranslations.parseError);
        return;
      }
    } else {
      customDelimiters = [
        { start: '(', end: ')' },
        { start: '[', end: ']' },
        { start: '{', end: '}' },
        { start: '<', end: '>' },
      ];
    }

    let allResults = [];

    for (let i = 0; i < originalFiles.length; i++) {
        const originalFile = originalFiles[i];
        const modifiedFile = modifiedFiles[i];

        const originalText = await originalFile.text();
        const modifiedText = await modifiedFile.text();

        const originalLines = originalText.split('\n');
        const modifiedLines = modifiedText.split('\n');

        const codeBlocks = customDelimiters.map(delimiter => ({
            start: delimiter.start,
            end: delimiter.end,
            regex: new RegExp(`\\${delimiter.start}(.*?)\\${delimiter.end}`, 'g')
        }));

        let errorCount = 0;
        const errorLines = [];
        let correctedLines = [...modifiedLines];

        for (let j = 0; j < originalLines.length; j++) {
            const originalLine = originalLines[j];
            const modifiedLine = modifiedLines[j] || '';

            if (originalLine !== modifiedLine) {
                let originalCodeBlocks = [];
                let modifiedCodeBlocks = [];

                codeBlocks.forEach(block => {
                    let match;
                    while ((match = block.regex.exec(originalLine)) !== null) {
                        originalCodeBlocks.push({
                            text: match[0],
                            index: match.index,
                            endIndex: block.regex.lastIndex
                        });
                    }
                    block.regex.lastIndex = 0;
                    while ((match = block.regex.exec(modifiedLine)) !== null) {
                        modifiedCodeBlocks.push({
                            text: match[0],
                            index: match.index,
                            endIndex: block.regex.lastIndex
                        });
                    }
                });

                originalCodeBlocks.sort((a, b) => a.index - b.index);
                modifiedCodeBlocks.sort((a, b) => a.index - b.index);

                let originalCodeIndex = 0;
                let modifiedCodeIndex = 0;
                let correctedLine = '';
                let lastIndex = 0;

                while (originalCodeIndex < originalCodeBlocks.length) {
                    const originalBlock = originalCodeBlocks[originalCodeIndex];
                    const modifiedBlock = modifiedCodeBlocks[modifiedCodeIndex];

                    correctedLine += originalLine.substring(lastIndex, originalBlock.index);

                    if (modifiedBlock && modifiedBlock.index === originalBlock.index && modifiedBlock.text === originalBlock.text) {
                        correctedLine += modifiedBlock.text;
                        modifiedCodeIndex++;
                    } else {
                        correctedLine += originalBlock.text;
                        errorCount++;
                        errorLines.push(j + 1);
                    }

                    lastIndex = originalBlock.endIndex;
                    originalCodeIndex++;
                }

                correctedLine += originalLine.substring(lastIndex);
                correctedLines[j] = correctedLine;
            }
        }

        allResults.push({
            fileName: originalFile.name,
            errorCount,
            errorLines,
            correctedCode: correctedLines.join('\n'),
        });
    }

    setResults(allResults);
  };

  const downloadZip = async () => {
    if (!results || results.length === 0) {
      alert('No corrected scripts to download.');
      return;
    }

    const zip = new JSZip();

    results.forEach(result => {
      zip.file(result.fileName, result.correctedCode);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(content);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corrected_scripts.zip';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <button onClick={downloadZip} className="download-zip">{currentTranslations.downloadZipButton}</button>
        </div>
      )}
    </div>
  );
}

export default App;
