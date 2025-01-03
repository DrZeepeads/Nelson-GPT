interface ContentAnalysis {
  contentType: 'chapter' | 'section' | 'subsection' | 'table' | 'figure';
  confidence: number;
  metadata?: Record<string, string>;
}

export const analyzeContent = (content: string): ContentAnalysis => {
  // Detect content type based on patterns
  const isChapter = /^chapter\s+\d+/i.test(content);
  const isSection = /^\d+\.\d+\s+|^section/i.test(content);
  const isSubsection = /^\d+\.\d+\.\d+\s+/i.test(content);
  
  // Table detection with improved accuracy
  const isTable = (content: string): boolean => {
    const lines = content.split('\n');
    if (lines.length < 3) return false;
    
    // Check for consistent column structure
    const columnCounts = lines.map(line => 
      line.split(/\s{2,}|\t|,|\|/).filter(Boolean).length
    );
    
    const isConsistentColumns = columnCounts.every(count => count === columnCounts[0]);
    const hasHeaderSeparator = lines.some(line => /^[-+|]+$/.test(line));
    
    return isConsistentColumns && hasHeaderSeparator;
  };

  // Figure detection with caption analysis
  const isFigure = (content: string): boolean => {
    const hasFigureCaption = /^(figure|fig\.)\s+\d+/i.test(content);
    const hasImageReference = /\.(jpg|jpeg|png|gif|svg|tiff)\b/i.test(content);
    return hasFigureCaption || hasImageReference;
  };

  // Calculate confidence scores
  let contentType: ContentAnalysis['contentType'];
  let confidence = 0;

  if (isChapter) {
    contentType = 'chapter';
    confidence = 0.9;
  } else if (isSection) {
    contentType = 'section';
    confidence = 0.8;
  } else if (isSubsection) {
    contentType = 'subsection';
    confidence = 0.7;
  } else if (isTable(content)) {
    contentType = 'table';
    confidence = 0.85;
  } else if (isFigure(content)) {
    contentType = 'figure';
    confidence = 0.75;
  } else {
    contentType = 'section'; // Default fallback
    confidence = 0.5;
  }

  // Extract metadata if present
  const metadata: Record<string, string> = {};
  const titleMatch = content.match(/^(?:chapter|section)?\s*(\d+(?:\.\d+)?)\s*[:-]?\s*(.+?)(?:\n|$)/i);
  if (titleMatch) {
    metadata.title = titleMatch[2].trim();
    metadata.number = titleMatch[1];
  }

  return {
    contentType,
    confidence,
    metadata
  };
};