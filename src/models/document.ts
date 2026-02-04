/**
 * Document-related type definitions
 */

import { DocumentType, DocumentStatus } from '../enums';

/**
 * Document - 書類
 * Matches: Prisma Document model
 */
export interface Document {
  id: string;
  contractPlotId: string | null;
  customerId: string | null;
  type: DocumentType;
  name: string;
  description: string | null;
  status: DocumentStatus;
  fileKey: string | null;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  templateType: string | null;
  templateData: Record<string, unknown> | null;
  generatedAt: string | null;
  sentAt: string | null;
  createdBy: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

/**
 * DocumentListItem - 書類一覧用（簡易版）
 */
export interface DocumentListItem {
  id: string;
  type: DocumentType;
  name: string;
  status: DocumentStatus;
  fileName: string | null;
  createdAt: string;
  createdBy: string | null;
}

/**
 * Input types
 */
export interface DocumentCreateInput {
  contractPlotId?: string | null;
  customerId?: string | null;
  type: DocumentType;
  name: string;
  description?: string | null;
  templateType?: string | null;
  templateData?: Record<string, unknown> | null;
  notes?: string | null;
}

export interface DocumentUpdateInput {
  name?: string;
  description?: string | null;
  status?: DocumentStatus;
  notes?: string | null;
}

/**
 * DocumentUploadResult - ファイルアップロード結果
 */
export interface DocumentUploadResult {
  id: string;
  fileKey: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}
