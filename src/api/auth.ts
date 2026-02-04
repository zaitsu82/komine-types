/**
 * Auth API types - Request/Response types for /api/v1/auth
 */

import { StaffRole } from '../enums';

/**
 * Login request (POST /auth/login)
 */
export interface LoginRequest {
  email: string;
  password: string;
}

/**
 * Login response (POST /auth/login)
 */
export interface LoginResponse {
  user: {
    id: number;
    email: string;
    name: string;
    role: StaffRole;
    supabaseUid: string;
  };
  session: {
    expiresAt: number;
  };
}

/**
 * Current user response (GET /auth/me)
 */
export interface CurrentUserResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: StaffRole;
    isActive: boolean;
    supabaseUid: string;
    createdAt: string;
    updatedAt: string;
    lastLoginAt: string | null;
  };
}

/**
 * Refresh token response (POST /auth/refresh)
 */
export interface RefreshResponse {
  session: {
    expiresAt: number;
  };
}

/**
 * Logout response (POST /auth/logout)
 */
export interface LogoutResponse {
  message: string;
}

/**
 * Change password request (PUT /auth/password)
 */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Change password response (PUT /auth/password)
 */
export interface ChangePasswordResponse {
  message: string;
}
