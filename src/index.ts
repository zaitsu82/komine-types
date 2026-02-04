/**
 * @komine/types - Shared type definitions for Komine Cemetery CRM
 *
 * This package provides shared type definitions used by both
 * the frontend (komine-frontend-crm-v2) and backend (komine--cemetery-crm-backend).
 *
 * Usage:
 *   import { Customer, ContractPlot, PhysicalPlotStatus } from '@komine/types';
 *   import { ApiResponse, PlotListResponse } from '@komine/types/api';
 *   import { Gender, ContractRole } from '@komine/types/enums';
 */

// Export all enums
export * from './enums';

// Export all model types
export * from './models';

// Export all API types
export * from './api';
