import type { ImageLoaderProps } from 'next/image'

export default function cloudinaryLoader({ src, width }: ImageLoaderProps) {
  const cloudName = 'dqxtvd7ab'
  const base = `https://res.cloudinary.com/${cloudName}/image`;

  // Use Cloudinary's fetch endpoint for remote images (safe for external URLs)
  const transformations = [`f_auto`, `q_auto`, `w_${width}`].join(',')

  // If the src already points to Cloudinary, return it unchanged
  if (src.includes('res.cloudinary.com')) {
    return src
  }

  // If src is an absolute URL, use the fetch URL to let Cloudinary proxy and transform it
  if (src.startsWith('http')) {
    return `${base}/fetch/${transformations}/${encodeURIComponent(src)}`
  }

  // For relative paths, assume they're served from the project's public/ folder
  const path = src.replace(/^\//, '')
  return `${base}/upload/${transformations}/${path}`
}
