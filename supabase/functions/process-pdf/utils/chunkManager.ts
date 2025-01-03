interface ChunkOptions {
  maxChunkSize: number;
  overlapSize: number;
  preserveParagraphs: boolean;
}

export const createChunks = (
  content: string,
  options: ChunkOptions = {
    maxChunkSize: 1000,
    overlapSize: 100,
    preserveParagraphs: true
  }
): string[] => {
  const chunks: string[] = [];
  const { maxChunkSize, overlapSize, preserveParagraphs } = options;

  // Split content into paragraphs if preservation is enabled
  if (preserveParagraphs) {
    const paragraphs = content.split(/\n\s*\n/);
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length <= maxChunkSize) {
        currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
      } else {
        if (currentChunk) {
          chunks.push(currentChunk);
        }
        currentChunk = paragraph;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }
  } else {
    // Simple chunking with overlap
    let startIndex = 0;
    while (startIndex < content.length) {
      const endIndex = Math.min(startIndex + maxChunkSize, content.length);
      const chunk = content.slice(startIndex, endIndex);
      chunks.push(chunk);
      startIndex += maxChunkSize - overlapSize;
    }
  }

  return chunks;
};

export const optimizeChunks = (chunks: string[]): string[] => {
  return chunks.map(chunk => {
    // Trim whitespace
    let optimized = chunk.trim();
    
    // Ensure chunks end with complete sentences
    if (!optimized.endsWith('.') && !optimized.endsWith('!') && !optimized.endsWith('?')) {
      const lastSentenceEnd = Math.max(
        optimized.lastIndexOf('.'),
        optimized.lastIndexOf('!'),
        optimized.lastIndexOf('?')
      );
      if (lastSentenceEnd !== -1) {
        optimized = optimized.substring(0, lastSentenceEnd + 1);
      }
    }
    
    // Remove orphaned references
    optimized = optimized.replace(/\[\d+\]$/, '');
    
    return optimized;
  }).filter(chunk => chunk.length > 0);
};