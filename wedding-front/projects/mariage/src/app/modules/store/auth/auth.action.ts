export enum AuthAction {
  INIT_STATE = 'init_state',
  SET_TOKEN = 'set_token',
  IS_AUTHENTICATED = 'is_authenticated'
}

export interface AuthStoreInterface {
  setToken(token: string): void;

  getToken(): string;

  isAuthenticated(): boolean;
}
