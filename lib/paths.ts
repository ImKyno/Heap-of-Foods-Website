/**
 * Get the base path for public assets
 * - Local: returns "/foods_cookpot/..."
 * - GitHub Pages: returns "/Heap-of-Foods-Recipe-Book/foods_cookpot/..."
 * 
 * The basePath is set via next.config.ts
 */
export function getAssetPath(path: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/Heap-of-Foods-Recipe-Book";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${basePath}${cleanPath}`;
}
