/** Strip CMS admin UI labels accidentally pasted into public-facing titles. */
export function sanitizeCmsText(text: string): string {
  return text
    .replace(/^(العربية|English|عربي|Arabic)\s*[:：]\s*/i, '')
    .replace(/\s*[:：]\s*(العربية|English|عربي|Arabic)\s*$/i, '')
    .trim()
}
