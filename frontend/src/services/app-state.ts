import { getTitleForRoute, updateDocumentTitle } from '../utils/meta-titles';
import { router } from './router';

export type ViewState = 'home' | 'search' | 'character-detail';

export interface AppState {
  view: ViewState;
  searchQuery: string;
  selectedCharacterId: number | null;
  isLoading: boolean;
}

export const EVENTS = {
  STATE_UPDATED: 'state-updated',
} as const;

let state: AppState = {
  view: 'home',
  searchQuery: '',
  selectedCharacterId: null,
  isLoading: false,
};

let stateListeners: Array<() => void> = [];

export function getState(): AppState {
  return { ...state };
}

export function subscribeToState(callback: () => void): () => void {
  stateListeners.push(callback);
  return () => {
    const index = stateListeners.indexOf(callback);
    if (index > -1) {
      stateListeners.splice(index, 1);
    }
  };
}

function notifyStateChange(): void {
  stateListeners.forEach((listener) => listener());
  window.dispatchEvent(
    new CustomEvent(EVENTS.STATE_UPDATED, {
      detail: getState(),
    })
  );
}

export function updateStateFromRoute(
  path: string,
  query: Record<string, string>,
  params: Record<string, string>
): void {
  const oldState = { ...state };

  if (path.startsWith('/character/') && params.id) {
    const characterId = parseInt(params.id, 10);
    if (!isNaN(characterId)) {
      state.view = 'character-detail';
      state.selectedCharacterId = characterId;
      state.searchQuery = '';
    } else {
      state.view = 'home';
      state.selectedCharacterId = null;
      state.searchQuery = '';
    }
  } else if (path === '/search') {
    const searchQuery = query.q || '';
    if (searchQuery.trim()) {
      state.view = 'search';
      state.searchQuery = searchQuery.trim();
      state.selectedCharacterId = null;
    } else {
      state.view = 'home';
      state.searchQuery = '';
      state.selectedCharacterId = null;
    }
  } else {
    state.view = 'home';
    state.searchQuery = '';
    state.selectedCharacterId = null;
  }

  if (
    oldState.view !== state.view ||
    oldState.searchQuery !== state.searchQuery ||
    oldState.selectedCharacterId !== state.selectedCharacterId
  ) {
    const title = getTitleForRoute(path, query, params);
    updateDocumentTitle(title);
    notifyStateChange();
  }
}

export function setSearchQuery(query: string): void {
  router.goToSearch(query);
}

export function selectCharacter(characterId: number): void {
  router.goToCharacter(characterId);
}

export function resetToHome(): void {
  router.goHome();
}

export function setLoading(isLoading: boolean): void {
  if (state.isLoading === isLoading) {
    return;
  }
  state.isLoading = isLoading;
  notifyStateChange();
}
