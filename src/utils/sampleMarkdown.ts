export const sampleMarkdown = `# Markdown to PDF Converter

Welcome to the **Markdown to PDF Converter**! This document demonstrates all the features supported by this converter.

## Features

### Text Formatting

You can use *italic*, **bold**, ***bold italic***, ~~strikethrough~~, and \`inline code\`.

### Headings

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

---

## Lists

### Unordered List

- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered List

1. First step
2. Second step
3. Third step
   1. Sub-step A
   2. Sub-step B

### Task List

- [x] Completed task
- [ ] Pending task
- [ ] Another pending task

---

## Code Blocks

### JavaScript

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

const user = { name: "Alice", age: 30 };
greet(user.name);
\`\`\`

### Python

\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))
\`\`\`

### TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = (name: string, email: string): User => {
  return {
    id: Date.now(),
    name,
    email,
  };
};
\`\`\`

---

## Tables

### Simple Table

| Feature | Status | Priority |
|---------|--------|----------|
| Markdown Parsing | ✅ Complete | High |
| PDF Export | ✅ Complete | High |
| Syntax Highlighting | ✅ Complete | Medium |
| File Upload | ✅ Complete | Medium |

### Complex Table (with horizontal scroll)

| Name | Age | City | Country | Occupation | Email | Phone | Status | Notes |
|------|-----|------|---------|------------|-------|-------|--------|-------|
| Alice Johnson | 28 | New York | USA | Software Engineer | alice@example.com | +1-555-0101 | Active | Team Lead |
| Bob Smith | 34 | London | UK | Product Manager | bob@example.com | +44-555-0102 | Active | Remote |
| Carol White | 31 | Toronto | Canada | Designer | carol@example.com | +1-555-0103 | Active | UI/UX |

---

## Blockquotes

> "The only way to do great work is to love what you do."
> 
> — Steve Jobs

> Nested blockquote example:
> 
> > This is a nested quote
> > 
> > > And another level of nesting

---

## Links

- [Visit GitHub](https://github.com)
- [Google](https://google.com)
- [MDN Web Docs](https://developer.mozilla.org)

---

## Images

![Placeholder Image](https://via.placeholder.com/600x300/3b82f6/ffffff?text=Sample+Image)

---

## Horizontal Rules

You can create horizontal rules using three or more dashes, asterisks, or underscores:

---

***

___

## Inline HTML

You can also use <span style="color: #3b82f6;">inline HTML</span> for additional styling.

---

## Mathematical Expressions

While basic markdown doesn't support math, you can write formulas:

- Einstein's equation: E = mc²
- Pythagorean theorem: a² + b² = c²

---

## Escape Characters

You can escape special characters: \\*, \\_, \\#, \\[, \\], \\(, \\)

---

## Summary

This converter supports:

1. ✅ All heading levels
2. ✅ Text formatting (bold, italic, strikethrough)
3. ✅ Code blocks with syntax highlighting
4. ✅ Tables with horizontal scrolling
5. ✅ Lists (ordered, unordered, task lists)
6. ✅ Blockquotes
7. ✅ Links and images
8. ✅ Horizontal rules
9. ✅ Inline code and HTML
10. ✅ File upload support

---

**Happy converting! 🚀**
`;
