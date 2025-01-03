export const extractMetadata = (text: string) => {
  const metadata: Record<string, string | null> = {
    title: null,
    authors: null,
    references: null,
    keywords: null
  };

  const titleMatch = text.match(/^([^\n]+)/);
  if (titleMatch) metadata.title = titleMatch[1].trim();

  const authorMatch = text.match(/(?:authors?|by)[:;\s]+([^\n]+)/i);
  if (authorMatch) metadata.authors = authorMatch[1].trim();

  const refMatch = text.match(/references?[:;\s]+((?:[^\n]+\n?)+)/i);
  if (refMatch) metadata.references = refMatch[1].trim();

  const keywordMatch = text.match(/keywords?[:;\s]+((?:[^\n]+\n?)+)/i);
  if (keywordMatch) metadata.keywords = keywordMatch[1].trim();

  return metadata;
}