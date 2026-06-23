'use client'

import type { Map, MapOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import 'leaflet/dist/leaflet.css'
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.min.css'

type LeafletMapProps = {
  latitude: number
  longitude: number
  title: string
}

const MAP_ZOOM = 17
const MARKER_ICON = {
  iconUrl: '/leaflet/marker-icon.svg',
  iconSize: [32, 42] as [number, number],
  iconAnchor: [16, 42] as [number, number],
} as const
const OSM_ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'

export function LeafletMap({ latitude, longitude, title }: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    let map: Map | undefined
    let cancelled = false

    const initMap = async () => {
      const L = (await import('leaflet')).default

      ;(window as Window & { L?: typeof L }).L = L
      await import('leaflet-gesture-handling/dist/leaflet-gesture-handling.js')

      if (cancelled) {
        return
      }

      map = L.map(container, {
        center: [latitude, longitude],
        zoom: MAP_ZOOM,
        zoomControl: false,
        gestureHandling: true,
      } as MapOptions)

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 5,
        maxZoom: 19,
        attribution: OSM_ATTRIBUTION,
      }).addTo(map)

      L.control.zoom({ position: 'topright' }).addTo(map)

      L.marker([latitude, longitude], {
        alt: title,
        icon: L.icon(MARKER_ICON),
      }).addTo(map)

      requestAnimationFrame(() => map?.invalidateSize())
    }

    void initMap()

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [latitude, longitude, title])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 h-full w-full"
      role="region"
      aria-label={title}
    />
  )
}
