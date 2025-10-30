import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Eye } from 'lucide-react';

interface MarkdownPreviewProps {
  content: string;
  theme: 'light' | 'dark';
}

export function MarkdownPreview({ content, theme }: MarkdownPreviewProps) {
  return (
    <div className="h-full flex flex-col bg-card">
      <div className="flex items-center gap-2 p-4 border-b border-border bg-muted/30">
        <Eye className="w-5 h-5" />
        <span>Preview</span>
      </div>
      
      <div id="markdown-preview" className="flex-1 overflow-auto p-8">
        <div className="max-w-4xl mx-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={theme === 'dark' ? oneDark : oneLight}
                    language={match[1]}
                    PreTag="div"
                    className="rounded-lg my-4"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={theme === 'dark' ? 'bg-slate-700 px-1.5 py-0.5 rounded' : 'bg-slate-100 px-1.5 py-0.5 rounded'} {...props}>
                    {children}
                  </code>
                );
              },
              table({ children }) {
                return (
                  <div className="overflow-x-auto my-6">
                    <table className={`min-w-full border-collapse ${theme === 'dark' ? 'border border-slate-600' : 'border border-slate-300'}`}>
                      {children}
                    </table>
                  </div>
                );
              },
              thead({ children }) {
                return <thead className={theme === 'dark' ? 'bg-slate-800' : 'bg-slate-100'}>{children}</thead>;
              },
              th({ children }) {
                return (
                  <th className={`px-4 py-2 text-left ${theme === 'dark' ? 'border border-slate-600' : 'border border-slate-300'}`}>
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className={`px-4 py-2 ${theme === 'dark' ? 'border border-slate-600' : 'border border-slate-300'}`}>
                    {children}
                  </td>
                );
              },
              h1({ children }) {
                return <h1 className={`text-4xl mt-8 mb-4 pb-2 ${theme === 'dark' ? 'border-b border-slate-600' : 'border-b'}`}>{children}</h1>;
              },
              h2({ children }) {
                return <h2 className="text-3xl mt-6 mb-3">{children}</h2>;
              },
              h3({ children }) {
                return <h3 className="text-2xl mt-5 mb-2">{children}</h3>;
              },
              h4({ children }) {
                return <h4 className="text-xl mt-4 mb-2">{children}</h4>;
              },
              h5({ children }) {
                return <h5 className="text-lg mt-3 mb-2">{children}</h5>;
              },
              h6({ children }) {
                return <h6 className="mt-3 mb-2">{children}</h6>;
              },
              p({ children }) {
                return <p className="my-4 leading-7">{children}</p>;
              },
              ul({ children }) {
                return <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>;
              },
              li({ children }) {
                return <li className="leading-7">{children}</li>;
              },
              blockquote({ children }) {
                return (
                  <blockquote className={`border-l-4 pl-4 my-4 italic ${theme === 'dark' ? 'border-slate-600 text-slate-400' : 'border-slate-300 text-slate-600'}`}>
                    {children}
                  </blockquote>
                );
              },
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                );
              },
              img({ src, alt }) {
                return (
                  <img
                    src={src}
                    alt={alt}
                    className="max-w-full h-auto rounded-lg my-4"
                  />
                );
              },
              hr() {
                return <hr className={`my-8 border-t-2 ${theme === 'dark' ? 'border-slate-600' : 'border-slate-200'}`} />;
              },
              pre({ children }) {
                return <div className="my-4">{children}</div>;
              },
            }}
          >
            {content || '*Start typing to see the preview...*'}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}