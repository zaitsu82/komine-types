/**
 * Customer-related type definitions
 */

import { Gender, AddressType, DmSetting, BillingType, AccountType } from '../enums';

/**
 * Customer - 顧客マスタ
 * Matches: Prisma Customer model
 */
export interface Customer {
  id: string;
  name: string;
  nameKana: string;
  birthDate: string | null;  // ISO date string (YYYY-MM-DD)
  gender: Gender | null;
  postalCode: string;
  address: string;
  addressLine2: string | null;  // 住所2（2行目）
  registeredAddress: string | null;
  phoneNumber: string;
  faxNumber: string | null;
  email: string | null;
  notes: string | null;
  createdAt: string;  // ISO datetime string
  updatedAt: string;  // ISO datetime string

  // Optional related data (included in detail responses)
  workInfo?: WorkInfo | null;
  billingInfo?: BillingInfo | null;
}

/**
 * WorkInfo - 勤務先情報
 * Matches: Prisma WorkInfo model
 */
export interface WorkInfo {
  id: string;
  customerId: string;
  companyName: string;
  companyNameKana: string;
  workAddress: string;
  workPostalCode: string;
  workPhoneNumber: string;
  dmSetting: DmSetting;
  addressType: AddressType;
  notes: string | null;
}

/**
 * BillingInfo - 請求情報
 * Matches: Prisma BillingInfo model
 */
export interface BillingInfo {
  id: string;
  customerId: string;
  billingType: BillingType;
  bankName: string;
  branchName: string;
  accountType: AccountType;
  accountNumber: string;
  accountHolder: string;
}

/**
 * FamilyContact - 家族・連絡先
 * Matches: Prisma FamilyContact model
 */
export interface FamilyContact {
  id: string;
  contractPlotId: string;
  customerId: string | null;
  emergencyContactFlag: boolean;
  name: string;
  nameKana: string | null;  // 読み（かな）
  birthDate: string | null;  // ISO date string
  relationship: string;
  postalCode: string | null;
  address: string;
  phoneNumber: string;
  phoneNumber2: string | null;  // 電話番号2
  faxNumber: string | null;
  email: string | null;
  registeredAddress: string | null;
  mailingType: AddressType | null;
  workCompanyName: string | null;  // 勤務先名称
  workCompanyNameKana: string | null;  // 勤務先かな
  workAddress: string | null;  // 勤務先住所
  workPhoneNumber: string | null;  // 勤務先電話番号
  contactMethod: string | null;  // 連絡区分
  notes: string | null;
}

/**
 * BuriedPerson - 埋葬者情報
 * Matches: Prisma BuriedPerson model
 */
export interface BuriedPerson {
  id: string;
  contractPlotId: string;
  name: string;
  nameKana: string | null;
  relationship: string | null;
  birthDate: string | null;  // 生年月日
  deathDate: string | null;  // ISO date string
  age: number | null;
  gender: Gender | null;
  burialDate: string | null;  // ISO date string
  posthumousName: string | null;  // 戒名
  reportDate: string | null;  // 届出日
  religion: string | null;  // 宗派
  notes: string | null;
}

/**
 * Input types for creating/updating
 */
export interface CustomerInput {
  name: string;
  nameKana: string;
  birthDate?: string | null;
  gender?: Gender | null;
  postalCode: string;
  address: string;
  addressLine2?: string | null;
  registeredAddress?: string | null;
  phoneNumber: string;
  faxNumber?: string | null;
  email?: string | null;
  notes?: string | null;
}

export interface WorkInfoInput {
  companyName: string;
  companyNameKana: string;
  workAddress: string;
  workPostalCode: string;
  workPhoneNumber: string;
  dmSetting: DmSetting;
  addressType: AddressType;
  notes?: string | null;
}

export interface BillingInfoInput {
  billingType: BillingType;
  bankName: string;
  branchName: string;
  accountType: AccountType;
  accountNumber: string;
  accountHolder: string;
}

export interface FamilyContactInput {
  emergencyContactFlag?: boolean;
  name: string;
  nameKana?: string | null;
  birthDate?: string | null;
  relationship: string;
  postalCode?: string | null;
  address: string;
  phoneNumber: string;
  phoneNumber2?: string | null;
  faxNumber?: string | null;
  email?: string | null;
  registeredAddress?: string | null;
  mailingType?: AddressType | null;
  workCompanyName?: string | null;
  workCompanyNameKana?: string | null;
  workAddress?: string | null;
  workPhoneNumber?: string | null;
  contactMethod?: string | null;
  notes?: string | null;
}

export interface BuriedPersonInput {
  name: string;
  nameKana?: string | null;
  relationship?: string | null;
  birthDate?: string | null;
  deathDate?: string | null;
  age?: number | null;
  gender?: Gender | null;
  burialDate?: string | null;
  posthumousName?: string | null;
  reportDate?: string | null;
  religion?: string | null;
  notes?: string | null;
}
