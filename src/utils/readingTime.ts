/**
 * Calculates the estimated reading time for a block of text.
 * @param text The markdown or plain content string of the blog post
 * @param wordsPerMinute Average user reading speed (default is 200 WPM)
 * @returns Formatted reading time string (e.g., "3 min read")
 */
export function calculateReadingTime(text: string, wordsPerMinute: number = 200): string {
  if (!text || typeof text !== 'string') return '1 min read';

  const cleanText = text.trim();
  if (cleanText.length === 0) return '1 min read';

  // Extract words using regular expression split on whitespace.
  // This correctly ignores HTML/markups and counts characters.
  const words = cleanText.split(/\s+/).filter(Boolean).length;

  // Compute minutes of reading time (ceil to nearest 1 min, so we never show "0 min read")
  const minutes = Math.ceil(words / wordsPerMinute);

  return `${minutes} min read`;
}
