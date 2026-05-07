/**
 * Billing / Payment API request/response types
 *
 * Backend endpoints: GET/POST/PUT/DELETE /api/v1/billings and /api/v1/payments
 * Source: komine-crm-backend src/billings/, src/payments/
 */

import { BillingCategory, BillingRecordStatus } from '../enums';
import { Billing, BillingPaymentSummary, Payment } from '../models/billing';
import { MessageResponse } from './common';

/**
 * Pagination metadata returned by Billing/Payment list endpoints.
 *
 * Note: this differs from the common PaginationMeta because the backend
 * billing/payment endpoints serialize the field as `totalCount` (not `total`).
 */
export interface BillingsPaginationMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

// ===== Billing =====

export interface BillingsListResponse {
  items: Billing[];
  pagination: BillingsPaginationMeta;
}

export interface BillingDetailResponse extends Billing {
  payments: BillingPaymentSummary[];
}

export interface CreateBillingRequest {
  contractPlotId: string;
  customerId: string;
  category: BillingCategory;
  amount: number;
  useStartYear?: number | null;
  useEndYear?: number | null;
  targetMonth?: number | null;
  billingYears?: number | null;
  contractDate?: string | null;
  billingDate?: string | null;
  applicationType?: number | null;
  billingType?: number | null;
  status?: BillingRecordStatus;
  notes?: string | null;
}

export interface UpdateBillingRequest {
  category?: BillingCategory;
  amount?: number;
  useStartYear?: number | null;
  useEndYear?: number | null;
  targetMonth?: number | null;
  billingYears?: number | null;
  contractDate?: string | null;
  billingDate?: string | null;
  applicationType?: number | null;
  billingType?: number | null;
  status?: BillingRecordStatus;
  terminated?: boolean;
  terminatedDate?: string | null;
  notes?: string | null;
}

export interface ListBillingsQuery {
  page?: number;
  limit?: number;
  contractPlotId?: string;
  customerId?: string;
  category?: BillingCategory;
  status?: BillingRecordStatus;
  billingDateFrom?: string;
  billingDateTo?: string;
  sortBy?: 'billing_date' | 'contract_date' | 'amount' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export type DeleteBillingResponse = MessageResponse;

// ===== Payment =====

export interface PaymentsListResponse {
  items: Payment[];
  pagination: BillingsPaginationMeta;
}

export type PaymentDetailResponse = Payment;

export interface CreatePaymentRequest {
  billingId?: string | null;
  customerId?: string | null;
  contractPlotId?: string | null;
  scheduledDate?: string | null;
  scheduledAmount?: number | null;
  paymentDate?: string | null;
  paymentAmount: number;
  feeType?: string | null;
  applicationType?: number | null;
  billingType?: number | null;
  staffInCharge?: string | null;
  notes?: string | null;
}

export interface UpdatePaymentRequest {
  billingId?: string | null;
  customerId?: string | null;
  contractPlotId?: string | null;
  scheduledDate?: string | null;
  scheduledAmount?: number | null;
  paymentDate?: string | null;
  paymentAmount?: number;
  feeType?: string | null;
  applicationType?: number | null;
  billingType?: number | null;
  staffInCharge?: string | null;
  notes?: string | null;
}

export interface ListPaymentsQuery {
  page?: number;
  limit?: number;
  billingId?: string;
  customerId?: string;
  contractPlotId?: string;
  paymentDateFrom?: string;
  paymentDateTo?: string;
  orphan?: boolean;
  sortBy?: 'payment_date' | 'scheduled_date' | 'payment_amount' | 'created_at';
  sortOrder?: 'asc' | 'desc';
}

export type DeletePaymentResponse = MessageResponse;
