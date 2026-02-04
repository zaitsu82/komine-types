/**
 * Staff API types - Request/Response types for /api/v1/staff
 */

import { PaginationMeta, SearchParams } from './common';
import { StaffRole } from '../enums';

/**
 * Staff list item
 */
export interface StaffApiListItem {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

/**
 * Staff list response (GET /staff)
 */
export interface StaffListResponse {
  items: StaffApiListItem[];
  pagination: PaginationMeta;
}

/**
 * Staff search parameters
 */
export interface StaffSearchParams extends SearchParams {
  role?: StaffRole;
  isActive?: boolean;
}

/**
 * Staff detail response (GET /staff/:id)
 */
export interface StaffDetailResponse {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create staff request (POST /staff)
 */
export interface CreateStaffRequest {
  name: string;
  email: string;
  password: string;
  role?: StaffRole;
}

/**
 * Create staff response (POST /staff)
 */
export interface CreateStaffResponse {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  message: string;
  invitationSent: boolean;
}

/**
 * Update staff request (PUT /staff/:id)
 */
export interface UpdateStaffRequest {
  name?: string;
  email?: string;
  role?: StaffRole;
  isActive?: boolean;
}

/**
 * Update staff response (PUT /staff/:id)
 */
export interface UpdateStaffResponse {
  id: number;
  name: string;
  email: string;
  role: StaffRole;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Delete staff response (DELETE /staff/:id)
 */
export interface DeleteStaffResponse {
  message: string;
  supabaseAccountDeleted: boolean;
}

/**
 * Toggle active response (PUT /staff/:id/toggle-active)
 */
export interface ToggleActiveResponse {
  id: number;
  isActive: boolean;
  message: string;
}

/**
 * Resend invitation response (POST /staff/:id/resend-invitation)
 */
export interface ResendInvitationResponse {
  message: string;
}
