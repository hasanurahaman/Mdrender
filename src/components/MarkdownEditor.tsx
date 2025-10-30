import React from 'react';
import { Textarea } from './ui/textarea';
import { Upload, FileText } from 'lucide-react';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onFileUpload: (file: File) => void;
  theme: 'light' | 'dark';
}

export function MarkdownEditor({ value, onChange, onFileUpload, theme }: MarkdownEditorProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.md')) {
      onFileUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          <span>Markdown Editor</span>
        </div>
        <button
          onClick={() => fileInputRef.current?.click()}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors ${
            theme === 'dark' 
              ? 'bg-slate-700 hover:bg-slate-600' 
              : 'bg-slate-100 hover:bg-slate-200'
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload .md
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".md,.markdown"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
      
      <div
        className={`flex-1 relative ${
          isDragging 
            ? theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50' 
            : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging && (
          <div className={`absolute inset-0 border-2 border-dashed border-blue-400 z-10 flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-50/90'
          }`}>
            <div className="text-center">
              <Upload className="w-12 h-12 mx-auto mb-2 text-blue-500" />
              <p className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>
                Drop your .md file here
              </p>
            </div>
          </div>
        )}
        
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing your markdown here or drag & drop a .md file..."
          className="h-full resize-none border-0 focus-visible:ring-0 font-mono p-4 bg-card text-foreground"
        />
      </div>
    </div>
  );
}