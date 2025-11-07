import { API_BASE_URL } from '../config/api';

export interface Character {
  id: number;
  name: string;
  birth_year?: string | null;
  gender?: string | null;
  homeworld?: string | null;
  films?: string | null;
  description?: string | null;
  traits?: string | null;
  key_moments?: string | null;
  relationships?: string | null;
  icon?: string | null;
}

class ApiError extends Error {
  status?: number;
  statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
  }
}

export async function getCharacters(search?: string): Promise<Character[]> {
  try {
    const url = new URL(`${API_BASE_URL}/characters`);
    if (search && search.trim()) {
      url.searchParams.append('search', search.trim());
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new ApiError(`Failed to fetch characters: ${response.statusText}`, response.status, response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function getCharacterById(id: number): Promise<Character> {
  try {
    const response = await fetch(`${API_BASE_URL}/characters/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new ApiError('Character not found', 404, 'Not Found');
      }
      throw new ApiError(`Failed to fetch character: ${response.statusText}`, response.status, response.statusText);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
