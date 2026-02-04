/**
 * Collective Burial API types - Request/Response types for /api/v1/collective-burials
 */

import { PaginationMeta, SearchParams } from './common';
import { BillingStatus, Gender } from '../enums';

/**
 * Collective burial list item
 */
export interface CollectiveBurialListItem {
  id: string;
  contractPlotId: string;
  plotNumber: string;
  areaName: string;
  applicantName: string | null;
  applicantNameKana: string | null;
  burialCapacity: number;
  currentBurialCount: number;
  capacityReachedDate: string | null;
  validityPeriodYears: number;
  billingScheduledDate: string | null;
  billingStatus: BillingStatus;
  billingAmount: number | null;
  notes: string | null;
  buriedPersons: Array<{
    id: string;
    name: string;
    burialDate: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Collective burial list response (GET /collective-burials)
 */
export interface CollectiveBurialListResponse {
  items: CollectiveBurialListItem[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}

/**
 * Collective burial search parameters
 */
export interface CollectiveBurialSearchParams extends SearchParams {
  billingStatus?: BillingStatus;
  areaName?: string;
  year?: number;
}

/**
 * Collective burial detail response (GET /collective-burials/:id)
 */
export interface CollectiveBurialDetailResponse {
  id: string;
  contractPlotId: string;
  plotNumber: string;
  areaName: string;
  contractDate: string;
  applicant: {
    id: string;
    name: string;
    nameKana: string;
    phone: string;
    email: string | null;
    postalCode: string;
    address: string;
  } | null;
  burialCapacity: number;
  currentBurialCount: number;
  capacityReachedDate: string | null;
  validityPeriodYears: number;
  billingScheduledDate: string | null;
  billingStatus: BillingStatus;
  billingAmount: number | null;
  notes: string | null;
  buriedPersons: Array<{
    id: string;
    name: string;
    nameKana: string | null;
    relationship: string | null;
    deathDate: string | null;
    age: number | null;
    gender: Gender | null;
    burialDate: string | null;
    notes: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
}

/**
 * Create collective burial request (POST /collective-burials)
 */
export interface CreateCollectiveBurialRequest {
  contractPlotId: string;
  burialCapacity: number;
  validityPeriodYears: number;
  billingAmount?: number | null;
  notes?: string | null;
}

/**
 * Create collective burial response (POST /collective-burials)
 */
export interface CreateCollectiveBurialResponse {
  id: string;
  contractPlotId: string;
  burialCapacity: number;
  currentBurialCount: number;
  validityPeriodYears: number;
  billingStatus: BillingStatus;
  billingAmount: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update collective burial request (PUT /collective-burials/:id)
 */
export interface UpdateCollectiveBurialRequest {
  burialCapacity?: number;
  validityPeriodYears?: number;
  billingStatus?: BillingStatus;
  billingAmount?: number | null;
  notes?: string | null;
}

/**
 * Update collective burial response (PUT /collective-burials/:id)
 */
export interface UpdateCollectiveBurialResponse {
  id: string;
  contractPlotId: string;
  plotNumber: string;
  burialCapacity: number;
  currentBurialCount: number;
  capacityReachedDate: string | null;
  validityPeriodYears: number;
  billingScheduledDate: string | null;
  billingStatus: BillingStatus;
  billingAmount: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * Update billing status request (PUT /collective-burials/:id/billing-status)
 */
export interface UpdateBillingStatusRequest {
  billingStatus: BillingStatus;
  billingAmount?: number | null;
}

/**
 * Update billing status response
 */
export interface UpdateBillingStatusResponse {
  id: string;
  billingStatus: BillingStatus;
  billingAmount: number | null;
  updatedAt: string;
}

/**
 * Sync burial count response (POST /collective-burials/:id/sync-burial-count)
 */
export interface SyncBurialCountResponse {
  id: string;
  currentBurialCount: number;
  burialCapacity: number;
  capacityReached: boolean;
  capacityReachedDate: string | null;
  billingScheduledDate: string | null;
}

/**
 * Stats by year item
 */
export interface CollectiveBurialYearStats {
  year: number;
  count: number;
  pendingCount: number;
  billedCount: number;
  paidCount: number;
}

/**
 * Stats by year response (GET /collective-burials/stats/by-year)
 */
export type CollectiveBurialStatsByYearResponse = CollectiveBurialYearStats[];
