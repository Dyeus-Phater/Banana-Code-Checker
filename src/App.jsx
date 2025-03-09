import React, { useState, useRef } from 'react';
import JSZip from 'jszip';
import SupportModal from './components/SupportModal';

const translations = {
  en: {
    title: 'Banana Code Checker',
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
    downloadZipButton: 'Download Corrected Scripts',
    comparisonMethodLabel: 'Comparison Method:',
    compareByName: 'Compare files with same name',
    compareByOrder: 'Compare files in order'
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
    downloadZipButton: 'Descargar Scripts Corregidos',
    comparisonMethodLabel: 'Método de Comparación:',
    compareByName: 'Comparar archivos con el mismo nombre',
    compareByOrder: 'Comparar archivos en orden'
  },
  'pt-BR': {
    title: 'Verificador de Código Banana',
    originalFilesLabel: 'Arquivos Originais:',
    modifiedFilesLabel: 'Arquivos Modificados:',
    delimiterFileLabel: 'Arquivo de Delimitador Personalizado (opcional):',
    downloadTemplateButton: 'Baixar Modelo de Delimitador',
    analyzeButton: 'Analisar',
    totalErrors: 'Total de Erros:',
    errorLines: 'Linhas com Erro:',
    correctedCode: 'Código Corrigido:',
    uploadError: 'Por favor, envie os arquivos originais e modificados.',
    fileCountError: 'O número de arquivos originais e modificados deve ser o mesmo.',
    parseError: 'Erro ao analisar o arquivo de delimitador. Certifique-se de que é um JSON válido.',
    downloadZipButton: 'Baixar Scripts Corrigidos',
    comparisonMethodLabel: 'Método de Comparação:',
    compareByName: 'Comparar arquivos com o mesmo nome',
    compareByOrder: 'Comparar arquivos em ordem'
  },
  'pt-PT': {
    title: 'Verificador de Código Banana',
    originalFilesLabel: 'Ficheiros Originais:',
    modifiedFilesLabel: 'Ficheiros Modificados:',
    delimiterFileLabel: 'Ficheiro de Delimitador Personalizado (opcional):',
    downloadTemplateButton: 'Descarregar Modelo de Delimitador',
    analyzeButton: 'Analisar',
    totalErrors: 'Total de Erros:',
    errorLines: 'Linhas com Erro:',
    correctedCode: 'Código Corrigido:',
    uploadError: 'Por favor, carregue os ficheiros originais e modificados.',
    fileCountError: 'O número de ficheiros originais e modificados deve ser o mesmo.',
    parseError: 'Erro ao analisar o ficheiro de delimitador. Certifique-se de que é um JSON válido.',
    downloadZipButton: 'Descarregar Scripts Corrigidos',
    comparisonMethodLabel: 'Método de Comparação:',
    compareByName: 'Comparar ficheiros com o mesmo nome',
    compareByOrder: 'Comparar ficheiros em ordem'
  },
  ja: {
    title: 'バナナコードチェッカー',
    originalFilesLabel: '元のファイル：',
    modifiedFilesLabel: '変更されたファイル：',
    delimiterFileLabel: 'カスタム区切りファイル（オプション）：',
    downloadTemplateButton: '区切りテンプレートをダウンロード',
    analyzeButton: '分析',
    totalErrors: '合計エラー：',
    errorLines: 'エラー行：',
    correctedCode: '修正されたコード：',
    uploadError: '元のファイルと変更されたファイルの両方をアップロードしてください。',
    fileCountError: '元のファイルと変更されたファイルの数は同じである必要があります。',
    parseError: '区切りファイルの解析エラー。有効なJSONであることを確認してください。',
    downloadZipButton: '修正されたスクリプトをダウンロード',
    comparisonMethodLabel: '比較方法：',
    compareByName: '同じ名前のファイルを比較',
    compareByOrder: '順番にファイルを比較'
  },
  'zh-CN': {
    title: '香蕉代码检查器',
    originalFilesLabel: '原始文件：',
    modifiedFilesLabel: '修改后的文件：',
    delimiterFileLabel: '自定义分隔符文件（可选）：',
    downloadTemplateButton: '下载分隔符模板',
    analyzeButton: '分析',
    totalErrors: '错误总数：',
    errorLines: '错误行：',
    correctedCode: '已修正的代码：',
    uploadError: '请上传原始文件和修改后的文件。',
    fileCountError: '原始文件和修改后的文件数量必须相同。',
    parseError: '解析分隔符文件时出错。请确保它是有效的JSON。',
    downloadZipButton: '下载已修正的脚本',
    comparisonMethodLabel: '比较方法：',
    compareByName: '比较同名文件',
    compareByOrder: '按顺序比较文件'
  },
  'zh-TW': {
    title: '香蕉程式碼檢查器',
    originalFilesLabel: '原始檔案：',
    modifiedFilesLabel: '修改後的檔案：',
    delimiterFileLabel: '自定義分隔符檔案（可選）：',
    downloadTemplateButton: '下載分隔符範本',
    analyzeButton: '分析',
    totalErrors: '錯誤總數：',
    errorLines: '錯誤行：',
    correctedCode: '已修正的程式碼：',
    uploadError: '請上傳原始檔案和修改後的檔案。',
    fileCountError: '原始檔案和修改後的檔案數量必須相同。',
    parseError: '解析分隔符檔案時出錯。請確保它是有效的JSON。',
    downloadZipButton: '下載已修正的指令碼',
    comparisonMethodLabel: '比較方法：',
    compareByName: '比較同名檔案',
    compareByOrder: '按順序比較檔案'
  }
};

function App() {
  const [originalFiles, setOriginalFiles] = useState([]);
  const [modifiedFiles, setModifiedFiles] = useState([]);
  const [delimiterFile, setDelimiterFile] = useState(null);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState('en');
  const [comparisonMethod, setComparisonMethod] = useState('byName'); // Default to comparing by name
  const [isSupportModalOpen, setIsSupportModalOpen] = useState(false);
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

  const handleComparisonMethodChange = (e) => {
    setComparisonMethod(e.target.value);
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

    if (comparisonMethod === 'byName') {
      // Compare files with the same name (existing logic)
      const originalFilesMap = {};
      for (const file of originalFiles) {
        originalFilesMap[file.name] = file;
      }

      for (const modifiedFile of modifiedFiles) {
        const originalFile = originalFilesMap[modifiedFile.name];
        
        if (!originalFile) {
          continue;
        }

        const result = await compareFiles(originalFile, modifiedFile, customDelimiters);
        allResults.push(result);
      }
    } else {
      // Compare files in order
      const minLength = Math.min(originalFiles.length, modifiedFiles.length);
      
      for (let i = 0; i < minLength; i++) {
        const originalFile = originalFiles[i];
        const modifiedFile = modifiedFiles[i];
        
        const result = await compareFiles(originalFile, modifiedFile, customDelimiters);
        allResults.push(result);
      }
    }

    setResults(allResults);
  };

  // Helper function to compare two files
  const compareFiles = async (originalFile, modifiedFile, customDelimiters) => {
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

    for (let j = 0; j < Math.max(originalLines.length, modifiedLines.length); j++) {
      const originalLine = j < originalLines.length ? originalLines[j] : '';
      const modifiedLine = j < modifiedLines.length ? modifiedLines[j] : '';

      let originalTagCount = 0;
      let modifiedTagCount = 0;

      codeBlocks.forEach(block => {
        block.regex.lastIndex = 0;
        let match;
        while ((match = block.regex.exec(originalLine)) !== null) {
          originalTagCount++;
        }

        block.regex.lastIndex = 0;
        while ((match = block.regex.exec(modifiedLine)) !== null) {
          modifiedTagCount++;
        }
      });

      if (originalTagCount !== modifiedTagCount) {
        errorCount++;
        errorLines.push({
          lineNumber: j + 1,
          content: modifiedLine
        });
      }
    }

    return {
      fileName: modifiedFile.name,
      errorCount,
      errorLines,
      missingTags: true
    };
  };

  const currentTranslations = translations[language];

  return (
    <div className="app-wrapper">
      <div className="support-button-container">
        <button 
          className="support-button" 
          onClick={() => setIsSupportModalOpen(true)}
          title="About & Support"
        >
          ?
        </button>
      </div>
      <SupportModal 
        isOpen={isSupportModalOpen} 
        onClose={() => setIsSupportModalOpen(false)} 
      />
      <div className="container">
      <h1>{currentTranslations.title}</h1>
      <div className="file-upload">
        <label htmlFor="originalFiles">{currentTranslations.originalFilesLabel}</label>
        <input type="file" multiple id="originalFiles" onChange={handleOriginalFileChange} ref={fileInputRef} />
        <label htmlFor="modifiedFiles">{currentTranslations.modifiedFilesLabel}</label>
        <input type="file" multiple id="modifiedFiles" onChange={handleModifiedFileChange} />
        <label htmlFor="delimiterFile">{currentTranslations.delimiterFileLabel}</label>
        <input type="file" id="delimiterFile" onChange={handleDelimiterFileChange} />
        
        <div className="comparison-method">
          <label>{currentTranslations.comparisonMethodLabel}</label>
          <div>
            <label>
              <input 
                type="radio" 
                name="comparisonMethod" 
                value="byName" 
                checked={comparisonMethod === 'byName'} 
                onChange={handleComparisonMethodChange} 
              />
              {currentTranslations.compareByName}
            </label>
          </div>
          <div>
            <label>
              <input 
                type="radio" 
                name="comparisonMethod" 
                value="byOrder" 
                checked={comparisonMethod === 'byOrder'} 
                onChange={handleComparisonMethodChange} 
              />
              {currentTranslations.compareByOrder}
            </label>
          </div>
        </div>
        
        <button onClick={downloadTemplate} className="download-template">{currentTranslations.downloadTemplateButton}</button>
        <button onClick={analyzeFiles}>{currentTranslations.analyzeButton}</button>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="pt-PT">Português (Portugal)</option>
          <option value="ja">日本語</option>
          <option value="zh-CN">简体中文</option>
          <option value="zh-TW">繁體中文</option>
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
                      <li key={index}>Line {line.lineNumber}: <code>{line.content}</code></li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
