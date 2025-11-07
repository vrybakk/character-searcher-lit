/**
 * Custom Event Type Definitions
 *
 * This file provides TypeScript type safety for custom events used throughout the application.
 * It extends the global WindowEventMap to enable proper typing when using window.addEventListener
 * and window.removeEventListener, eliminating the need for unsafe type assertions.
 */

import type { Character } from '../services/api';
import type { AppState } from '../services/app-state';

/**
 * Event dispatched when a character detail has been loaded.
 * Used to notify components (like character-summary) that character data is available.
 */
export interface CharacterLoadedEvent extends CustomEvent {
  detail: {
    character: Character;
  };
}

/**
 * Event dispatched when the application state has been updated.
 * Used to notify components (like search) about state changes (e.g., loading state).
 */
export interface StateUpdatedEvent extends CustomEvent {
  detail: AppState;
}

/**
 * Extends the global WindowEventMap interface to include our custom events.
 * This allows TypeScript to provide proper type checking and autocomplete when using:
 * - window.addEventListener('character-loaded', handler)
 * - window.removeEventListener('state-updated', handler)
 *
 * Without this, we would need to use unsafe type assertions like:
 * handler as unknown as EventListener
 */
declare global {
  interface WindowEventMap {
    'character-loaded': CharacterLoadedEvent;
    'state-updated': StateUpdatedEvent;
  }
}
