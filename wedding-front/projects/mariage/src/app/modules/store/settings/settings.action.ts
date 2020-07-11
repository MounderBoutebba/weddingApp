export enum SettingsAction {
  INIT_STATE = 'init_state',
  SET_LANGUAGE = 'set_language',
  SET_DARK_THEME = 'set_dark_theme',
  GET_CURRENT_LANGUAGE = 'get_current_language',
  IS_DARK_THEME_ACTIVATED = 'is_dark_theme_activated'
}

export interface SettingsStoreInterface {
  SetLanguage(language: string): void;

  SetDarkTheme(darkTheme: boolean): void;

  getCurrentLanguage(): string;

  isDarkTheme(): boolean;
}
