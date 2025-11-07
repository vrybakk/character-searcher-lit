export function updateDocumentTitle(title: string): void {
  document.title = title ? `${title} | StarFolk Wiki` : 'StarFolk Wiki';
}

export function getTitleForRoute(
  path: string,
  query: Record<string, string>,
  params: Record<string, string>,
  characterName?: string | null
): string {
  if (path.startsWith('/character/') && params.id) {
    return characterName || 'Character';
  } else if (path === '/search') {
    const searchQuery = query.q;
    return searchQuery ? `Search: ${searchQuery}` : 'Search';
  } else {
    return '';
  }
}
