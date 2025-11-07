export function parseJsonField(field?: string | null): string[] {
  if (!field) return [];
  try {
    const parsed = JSON.parse(field);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return field.split('\n').filter((item) => item.trim());
  }
}
