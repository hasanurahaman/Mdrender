import React, { useState } from 'react';
import { MarkdownEditor } from './components/MarkdownEditor';
import { MarkdownPreview } from './components/MarkdownPreview';
import { Toolbar } from './components/Toolbar';
import { sampleMarkdown } from './utils/sampleMarkdown';
import { exportToPDF } from './utils/pdfExport';
import { Toaster, toast } from 'sonner@2.0.3';
import { Resizable } from 're-resizable';

export default function App() {
  const [markdown, setMarkdown] = useState('');
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const handleFileUpload = async (file: File) => {
    try {
      const text = await file.text();
      setMarkdown(text);
      toast.success(`Loaded ${file.name}`);
    } catch (error) {
      toast.error('Failed to read file');
      console.error(error);
    }
  };

  const handleExportPDF = async () => {
    if (!markdown.trim()) {
      toast.error('Please add some content before exporting');
      return;
    }

    try {
      toast.loading('Generating PDF...');
      await exportToPDF('markdown-preview', 'markdown-document.pdf');
      toast.dismiss();
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.dismiss();
      toast.error('Failed to export PDF');
      console.error(error);
    }
  };

  const handleClear = () => {
    setMarkdown('');
  };

  const handleLoadSample = () => {
    setMarkdown(sampleMarkdown);
    toast.success('Sample markdown loaded');
  };

  return (
    <div className={`h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
      <Toaster position="top-right" richColors />
      
      <Toolbar
        onExportPDF={handleExportPDF}
        onClear={handleClear}
        onLoadSample={handleLoadSample}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        theme={theme}
        onThemeChange={setTheme}
      />

      <div className="flex-1 flex overflow-hidden bg-background">
        <Resizable
          defaultSize={{
            width: '50%',
            height: '100%',
          }}
          minWidth="30%"
          maxWidth="70%"
          enable={{
            right: true,
            top: false,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          className="border-r border-border"
        >
          <MarkdownEditor
            value={markdown}
            onChange={setMarkdown}
            onFileUpload={handleFileUpload}
            theme={theme}
          />
        </Resizable>

        <div className="flex-1 overflow-hidden" style={{ fontSize: `${fontSize}px` }}>
          <MarkdownPreview content={markdown} theme={theme} />
        </div>
      </div>
    </div>
  );
}