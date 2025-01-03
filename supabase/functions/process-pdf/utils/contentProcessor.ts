import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { cleanText } from './textCleaner.ts';
import { detectTable, detectFigureCaption } from './contentDetector.ts';
import { extractMetadata } from './metadataExtractor.ts';

const CHUNK_SIZE = 1000;

export const processPageContent = async (
  supabase: ReturnType<typeof createClient>,
  rawText: string,
  pageNumber: number,
  chapterName: string,
  isFirstPage: boolean
) => {
  const cleanedText = cleanText(rawText);
  const metadata = isFirstPage ? extractMetadata(cleanedText) : null;
  
  let currentPosition = 0;
  const processedContent = [];
  const tables = [];
  const figures = [];

  while (currentPosition < cleanedText.length) {
    let endPosition = currentPosition + CHUNK_SIZE;
    const nextPeriod = cleanedText.indexOf('.', endPosition);
    endPosition = nextPeriod > -1 ? nextPeriod + 1 : cleanedText.length;
    
    const chunk = cleanedText.slice(currentPosition, endPosition).trim();
    
    if (chunk) {
      if (detectTable(chunk)) {
        tables.push({
          content: chunk,
          page_number: pageNumber,
          chapter: chapterName
        });
      } else if (detectFigureCaption(chunk)) {
        figures.push({
          caption: chunk,
          page_number: pageNumber,
          chapter: chapterName
        });
      } else {
        processedContent.push({
          content: chunk,
          page_number: pageNumber,
          chunk_index: Math.floor(currentPosition / CHUNK_SIZE),
          metadata: isFirstPage ? metadata : null
        });
      }
    }
    
    currentPosition = endPosition;
  }

  return { processedContent, tables, figures };
}