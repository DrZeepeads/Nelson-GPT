export const cleanText = (text: string): string => {
  return text
    .replace(/\s+/g, ' ')                    // Replace multiple spaces with single space
    .replace(/[\r\n]+/g, '\n')               // Normalize line breaks
    .replace(/[^\x20-\x7E\n]/g, '')          // Remove non-printable characters
    .replace(/\b(?:[A-Z]\.){2,}/g, match => match.replace(/\./g, '. ')) // Fix abbreviations
    .trim();
}