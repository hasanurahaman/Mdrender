import React from 'react';
import { Download, FileText, Trash2, Settings, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner@2.0.3';

interface ToolbarProps {
  onExportPDF: () => void;
  onClear: () => void;
  onLoadSample: () => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export function Toolbar({
  onExportPDF,
  onClear,
  onLoadSample,
  fontSize,
  onFontSizeChange,
  theme,
  onThemeChange,
}: ToolbarProps) {
  const handleClear = () => {
    if (confirm('Are you sure you want to clear all content?')) {
      onClear();
      toast.success('Content cleared');
    }
  };

  return (
    <div className="border-b bg-card px-4 py-3 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl">Markdown to PDF</h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onLoadSample}
        >
          Load Sample
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Preview Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="px-2 py-2">
              <label className="text-sm">Font Size</label>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="range"
                  min="12"
                  max="20"
                  value={fontSize}
                  onChange={(e) => onFontSizeChange(Number(e.target.value))}
                  className="flex-1"
                />
                <span className="text-sm w-8">{fontSize}px</span>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}>
              {theme === 'light' ? (
                <>
                  <Moon className="w-4 h-4 mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4 mr-2" />
                  Light Mode
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>

        <Button
          size="sm"
          onClick={onExportPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  );
}