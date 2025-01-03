interface Reference {
  citation: string;
  authors?: string[];
  title?: string;
  journal?: string;
  year?: number;
}

export const extractReferences = (text: string): Reference[] => {
  const references: Reference[] = [];
  
  // Match common reference patterns
  const referencePatterns = [
    // Vancouver style
    /(\d+\.\s+)([\w\s,]+?\.)([^.]+?\.)(\s+\d{4})/g,
    // APA style
    /([\w\s,]+?)\((\d{4})\)\.\s+([^.]+?)\./g,
    // General numbered references
    /\[(\d+)\]\s+(.*?)\./g
  ];

  for (const pattern of referencePatterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      const reference: Reference = {
        citation: match[0].trim()
      };

      // Extract additional metadata based on the pattern
      if (pattern.source.includes('\\d+\\.\\s+')) {
        // Vancouver style
        reference.authors = match[2].trim().split(',').map(author => author.trim());
        reference.title = match[3].trim();
        reference.year = parseInt(match[4].trim());
      } else if (pattern.source.includes('\\(\\d{4}\\)')) {
        // APA style
        reference.authors = match[1].trim().split(',').map(author => author.trim());
        reference.year = parseInt(match[2]);
        reference.title = match[3].trim();
      }

      references.push(reference);
    }
  }

  return references;
};

export const validateReferences = (references: Reference[]): Reference[] => {
  return references.filter(ref => {
    // Basic validation rules
    const hasValidYear = !ref.year || (ref.year >= 1800 && ref.year <= new Date().getFullYear());
    const hasValidAuthors = !ref.authors || ref.authors.every(author => author.length > 2);
    const hasValidTitle = !ref.title || ref.title.length > 10;

    return hasValidYear && hasValidAuthors && hasValidTitle;
  });
};