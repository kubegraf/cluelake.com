import { permanentRedirect } from "next/navigation";
import { site } from "@/lib/config/site";

/**
 * /login exists only to forward to the Console.
 *
 * The header links straight to `site.consoleUrl`, the way domineta.com links
 * straight to console.domineta.com, so nothing on this site routes here any
 * more. It is kept because the URL was live and published, and a bookmark or a
 * link in somebody's notes should land on the sign-in screen rather than a 404.
 *
 * ⚠ IT IS A REDIRECT, NOT A CREDENTIAL FORM, AND THAT IS DELIBERATE. The page
 * this replaced said so in a comment worth preserving: a marketing site that
 * renders a password field which cannot sign anybody in trains people to type
 * credentials into a page that does not handle them. The Console is a separate
 * application on a separate hostname and it owns authentication entirely.
 *
 * ⚠ NO `export const metadata`. A redirect never renders, so metadata here
 * would be dead code that reads like a live page — and the old `noIndex: true`
 * is now expressed by robots.ts and by the 308 itself.
 */
export default function LoginPage(): never {
  // 308 rather than 307: this move is permanent, and a permanent redirect is
  // what tells a crawler to stop asking and to pass any accumulated link value
  // on. `permanentRedirect` also preserves the request method, which a 301
  // would not.
  permanentRedirect(site.consoleUrl);
}
