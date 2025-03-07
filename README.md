# Banana Code Checker 🍌

Banana Code Checker is a powerful web application designed to help developers identify and analyze code tag mismatches between original and modified files. It's particularly useful for ensuring that important code structures enclosed in delimiters (like parentheses, brackets, and braces) are preserved during code modifications.

## Features ✨

- **Multiple File Comparison**: Compare multiple original and modified files simultaneously
- **Flexible Comparison Methods**:
  - Compare files with matching names
  - Compare files in sequential order
- **Customizable Delimiters**: Support for custom delimiter configurations via JSON
- **Multilingual Support**: Available in 7 languages:
  - English
  - Español (Spanish)
  - Português (Brasil)
  - Português (Portugal)
  - 日本語 (Japanese)
  - 简体中文 (Simplified Chinese)
  - 繁體中文 (Traditional Chinese)
- **Visual Error Reporting**: Clear display of error counts and affected lines

## Installation 🚀

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Start the development server:
```bash
npm run dev
```

## Usage Guide 📖

### Basic Usage

1. Upload your original files using the "Original Files" input
2. Upload the modified versions using the "Modified Files" input
3. Select your preferred comparison method:
   - **Compare files with same name**: Matches files based on identical filenames
   - **Compare files in order**: Compares files in the order they were uploaded
4. Click "Analyze" to start the comparison

### Custom Delimiters

By default, the application checks for the following delimiter pairs:
- Parentheses: ( )
- Square brackets: [ ]
- Curly braces: { }
- Angle brackets: < >

To use custom delimiters:
1. Click "Download Delimiter Template" to get the template file
2. Modify the JSON file with your desired delimiters
3. Upload your custom delimiter file before analysis

Example delimiter.json:
```json
{
  "delimiters": [
    {"start": "(", "end": ")"},
    {"start": "[", "end": "]"},
    {"start": "{", "end": "}"},
    {"start": "<", "end": ">"}
  ]
}
```

## Development 🛠️

Built with:
- React
- Vite
- JSZip

To build for production:
```bash
npm run build
```

## License 📄

This project is open source and available under the MIT License.

---

Made with 🍌 by Mister.
Orginal idea by Lobo nintendista.
