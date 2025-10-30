export async function exportToPDF(elementId: string, filename: string = 'document.pdf') {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('Preview element not found');
    }

    // Get the content to export
    const content = element.querySelector('.max-w-4xl');
    if (!content) {
      throw new Error('Content not found');
    }

    console.log('Starting PDF export...');

    // Get the HTML content
    const htmlContent = content.innerHTML;

    // Create a hidden iframe for printing
    const iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = 'none';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      document.body.removeChild(iframe);
      throw new Error('Could not access iframe document');
    }

    // Write the print-ready HTML
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>${filename.replace('.pdf', '')}</title>
          <style>
            @page {
              margin: 15mm;
              size: A4;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              line-height: 1.5;
              color: #1e293b;
              background: #ffffff;
              padding: 0;
            }
            
            h1 {
              font-size: 28px;
              font-weight: 700;
              margin: 18px 0 10px 0;
              padding-bottom: 5px;
              border-bottom: 2px solid #e2e8f0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            h2 {
              font-size: 24px;
              font-weight: 600;
              margin: 16px 0 8px 0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            h3 {
              font-size: 20px;
              font-weight: 600;
              margin: 14px 0 7px 0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            h4 {
              font-size: 18px;
              font-weight: 600;
              margin: 12px 0 6px 0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            h5 {
              font-size: 16px;
              font-weight: 600;
              margin: 10px 0 5px 0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            h6 {
              font-size: 14px;
              font-weight: 600;
              margin: 8px 0 4px 0;
              color: #0f172a;
              page-break-after: avoid;
              page-break-inside: avoid;
            }
            
            p {
              margin: 8px 0;
              line-height: 1.6;
              color: #1e293b;
              orphans: 3;
              widows: 3;
            }
            
            ul, ol {
              margin: 10px 0;
              padding-left: 20px;
              page-break-inside: avoid;
            }
            
            ul {
              list-style-type: disc;
            }
            
            ol {
              list-style-type: decimal;
            }
            
            li {
              margin: 4px 0;
              line-height: 1.6;
              color: #1e293b;
              page-break-inside: avoid;
            }
            
            code {
              background-color: #f1f5f9;
              padding: 2px 4px;
              border-radius: 3px;
              font-family: "Courier New", Courier, monospace;
              font-size: 12px;
              color: #1e293b;
            }
            
            pre {
              background-color: #f8f9fa;
              color: #1e293b;
              padding: 10px;
              border-radius: 5px;
              margin: 10px 0;
              overflow: visible;
              font-family: "Courier New", Courier, monospace;
              font-size: 11px;
              line-height: 1.4;
              page-break-inside: avoid;
              white-space: pre-wrap;
              word-wrap: break-word;
              border: 1px solid #e2e8f0;
            }
            
            pre code {
              background-color: transparent;
              padding: 0;
              color: #1e293b;
              font-size: 11px;
            }
            
            blockquote {
              border-left: 3px solid #cbd5e1;
              padding-left: 12px;
              margin: 10px 0;
              font-style: italic;
              color: #475569;
              page-break-inside: avoid;
            }
            
            a {
              color: #2563eb;
              text-decoration: underline;
              word-break: break-word;
            }
            
            table {
              border-collapse: collapse;
              width: 100%;
              margin: 12px 0;
              page-break-inside: avoid;
              font-size: 13px;
            }
            
            thead {
              background-color: #f1f5f9;
              page-break-after: avoid;
            }
            
            th {
              border: 1px solid #cbd5e1;
              padding: 8px 10px;
              text-align: left;
              font-weight: 600;
              color: #1e293b;
              background-color: #f1f5f9;
              page-break-inside: avoid;
            }
            
            td {
              border: 1px solid #cbd5e1;
              padding: 8px 10px;
              color: #1e293b;
              page-break-inside: avoid;
            }
            
            tbody tr {
              page-break-inside: avoid;
            }
            
            hr {
              margin: 16px 0;
              border: none;
              border-top: 1px solid #e2e8f0;
              page-break-after: avoid;
            }
            
            img {
              max-width: 100%;
              height: auto;
              border-radius: 5px;
              margin: 10px 0;
              page-break-inside: avoid;
            }
            
            strong {
              font-weight: 700;
            }
            
            em {
              font-style: italic;
            }
            
            /* Syntax highlighting */
            .token.comment,
            .token.prolog,
            .token.doctype,
            .token.cdata {
              color: #5c6370;
            }
            
            .token.punctuation {
              color: #abb2bf;
            }
            
            .token.property,
            .token.tag,
            .token.boolean,
            .token.number,
            .token.constant,
            .token.symbol,
            .token.deleted {
              color: #d19a66;
            }
            
            .token.selector,
            .token.attr-name,
            .token.string,
            .token.char,
            .token.builtin,
            .token.inserted {
              color: #98c379;
            }
            
            .token.operator,
            .token.entity,
            .token.url,
            .language-css .token.string,
            .style .token.string {
              color: #56b6c2;
            }
            
            .token.atrule,
            .token.attr-value,
            .token.keyword {
              color: #c678dd;
            }
            
            .token.function,
            .token.class-name {
              color: #61afef;
            }
            
            .token.regex,
            .token.important,
            .token.variable {
              color: #e06c75;
            }
            
            /* Print-specific */
            @media print {
              body {
                padding: 0;
              }
              
              h1, h2, h3, h4, h5, h6 {
                page-break-after: avoid;
              }
              
              p, blockquote, pre, table, ul, ol {
                page-break-inside: avoid;
              }
              
              a {
                color: #2563eb;
                text-decoration: underline;
              }
              
              pre {
                border: 1px solid #cbd5e1;
              }
              
              /* Ensure tables don't break awkwardly */
              tr {
                page-break-inside: avoid;
              }
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    iframeDoc.close();

    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 500));

    console.log('Triggering print dialog...');

    // Trigger print on the iframe
    if (iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      
      // Wait a bit before removing the iframe
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    } else {
      document.body.removeChild(iframe);
      throw new Error('Could not access iframe window');
    }

    console.log('Print dialog opened');
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
}