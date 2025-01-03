export const detectTable = (text: string): boolean => {
  const lines = text.split('\n');
  if (lines.length < 2) return false;

  const delimiterPattern = /[\t|,]/;
  const consistentDelimiters = lines.every(line => 
    line.split(delimiterPattern).length === lines[0].split(delimiterPattern).length
  );

  const consistentSpacing = lines.every(line => 
    line.split(/\s{2,}/).length === lines[0].split(/\s{2,}/).length
  );

  return consistentDelimiters || consistentSpacing;
}

export const detectFigureCaption = (text: string): boolean => {
  return /^(figure|fig\.)\s+\d+/i.test(text) || 
         /^(table)\s+\d+/i.test(text);
}