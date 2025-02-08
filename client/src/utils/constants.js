export const HOST = import.meta.env.VITE_SERVER_URL;

export const CLOUDINARY_BASE_URL =
  "https://res.cloudinary.com/dx1ip1gbo/image/upload";

export const AUTH_ROUTES = "api/auth";

export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO = `${AUTH_ROUTES}/get-user-info`;
export const UPDATE_PROFILE = `${AUTH_ROUTES}/update-profile`;
export const ADD_PROFILE_AVATAR_ROUTE = `${AUTH_ROUTES}/add-profile-avatar`;
export const UPDATE_PROFILE_AVATAR_ROUTE = `${AUTH_ROUTES}/update-profile-avatar`;
export const REMOVE_PROFILE_AVATAR_ROUTE = `${AUTH_ROUTES}/remove-profile-avatar`;
export const CHOOSE_THEME_PREFERENCE_ROUTE = `${AUTH_ROUTES}/choose-theme-preference`;
export const UPDATE_PASSWORD_ROUTE = `${AUTH_ROUTES}/update-password`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
