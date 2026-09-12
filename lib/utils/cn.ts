/** Join class names, dropping falsy values. Small on purpose: a full
 *  class-merging library is not warranted by this site's needs. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
