/** Bounding box half-span (~900 m) around the marker for the OSM embed iframe. */
const EMBED_BBOX_DELTA = 0.008

/**
 * Builds an OpenStreetMap embed URL (no Google trackers).
 * @see https://wiki.openstreetmap.org/wiki/Widget_iframe
 */
export function buildOpenStreetMapEmbedUrl(latitude: number, longitude: number): string {
  const west = longitude - EMBED_BBOX_DELTA
  const south = latitude - EMBED_BBOX_DELTA
  const east = longitude + EMBED_BBOX_DELTA
  const north = latitude + EMBED_BBOX_DELTA
  const bbox = `${west},${south},${east},${north}`
  const marker = `${latitude},${longitude}`

  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`
}
