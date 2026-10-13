/** Logo ufficiale e icone di Flair Avenue (CDN Cloudinary del sito flairavenue.it). */
const CDN = "https://res.cloudinary.com/p3e0vjol/images";

/** Wordmark scuro "FLAIR AVENUE" — per sfondi chiari. */
export const LOGO_DARK = `${CDN}/w_927,h_63,c_scale/c_limit,w_1800/f_auto,q_auto:good/v1784994186/flairavenue-logo-dark/flairavenue-logo-dark.webp?_i=AA`;
/** Wordmark chiaro "FLAIR AVENUE" — per sfondi scuri o foto. */
export const LOGO_LIGHT = `${CDN}/w_927,h_63,c_scale/c_limit,w_1800/f_auto,q_auto:good/v1789373749/flairavenue-logo-white/flairavenue-logo-white.webp?_i=AA`;
/** Monogramma "FA". */
export const LOGO_MARK = `${CDN}/w_945,h_591,c_scale/c_limit,w_1800/f_auto,q_auto:good/v1785345637/FA-logo-def-1/FA-logo-def-1.webp?_i=AA`;

const ICON = (size: number) =>
  `${CDN}/w_${size},h_${size},c_fill,g_auto/c_limit,w_1800/f_auto,q_auto:good/v1785345666/cropped-FA-instagram-1/cropped-FA-instagram-1.webp?_i=AA`;
export const FAVICON_32 = ICON(32);
export const FAVICON_192 = ICON(192);
export const APPLE_ICON = ICON(180);
