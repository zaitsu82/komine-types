/**
 * Staff-related type definitions
 */

import { StaffRole } from '../enums';

/**
 * Staff - スタッフ
 * Matches: Prisma Staff model
 */
export interface Staff {
  id: number;
  supabaseUid: string;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * StaffListItem - スタッフ一覧用（簡易版）
 */
export interface StaffListItem {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

/**
 * Input types
 */
export interface StaffCreateInput {
  name: string;
  email: string;
  password: string;
  role?: StaffRole;
}

export interface StaffUpdateInput {
  name?: string;
  email?: string;
  role?: StaffRole;
  isActive?: boolean;
}

/**
 * AuthUser - 認証済みユーザー情報
 */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  supabaseUid: string;
  createdAt: string;
  updatedAt: string;
  lastLoginAt: string | null;
}

/**
 * Session - セッション情報
 */
export interface Session {
  expiresAt: number;
}

/**
 * LoginCredentials - ログイン認証情報
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * ChangePasswordInput - パスワード変更
 */
export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}
