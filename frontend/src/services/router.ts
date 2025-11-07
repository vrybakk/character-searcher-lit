export type Route = {
  path: string;
  params: Record<string, string>;
  query: Record<string, string>;
};

export type RouteHandler = (route: Route) => void;

class Router {
  private handlers: RouteHandler[] = [];

  constructor() {
    window.addEventListener('popstate', () => {
      this.notifyHandlers();
    });
  }

  init(): void {
    this.notifyHandlers();
  }

  onRouteChange(handler: RouteHandler): () => void {
    this.handlers.push(handler);
    return () => {
      const index = this.handlers.indexOf(handler);
      if (index > -1) {
        this.handlers.splice(index, 1);
      }
    };
  }

  private notifyHandlers(): void {
    const route = this.getCurrentRoute();
    this.handlers.forEach((handler) => handler(route));
  }

  getCurrentRoute(): Route {
    const path = window.location.pathname;
    const search = window.location.search;
    const query: Record<string, string> = {};

    if (search) {
      const params = new URLSearchParams(search);
      params.forEach((value, key) => {
        query[key] = value;
      });
    }

    const pathParams: Record<string, string> = {};
    const characterMatch = path.match(/^\/character\/(\d+)$/);
    if (characterMatch) {
      pathParams.id = characterMatch[1];
    }

    return {
      path,
      params: pathParams,
      query,
    };
  }

  navigate(path: string, query?: Record<string, string>): void {
    let url = path;
    if (query && Object.keys(query).length > 0) {
      const params = new URLSearchParams();
      Object.entries(query).forEach(([key, value]) => {
        if (value) {
          params.append(key, value);
        }
      });
      const queryString = params.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }
    window.history.pushState({}, '', url);
    this.notifyHandlers();
  }

  goHome(): void {
    this.navigate('/');
  }

  goToSearch(query: string): void {
    if (query.trim()) {
      this.navigate('/search', { q: query.trim() });
    } else {
      this.goHome();
    }
  }

  goToCharacter(id: number): void {
    this.navigate(`/character/${id}`);
  }
}

export const router = new Router();
