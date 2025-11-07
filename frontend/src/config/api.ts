export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export function getImageUrl(icon: string | null): string {
  if (!icon) return '';
  return `${API_BASE_URL}/data/${icon}`;
}
