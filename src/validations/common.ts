/**
 * 共通バリデーションスキーマ
 *
 * フロントエンド・バックエンド共通のフィールドレベルバリデーション。
 * バックエンド（src/middleware/validation.ts）のルールを正として統一。
 */

import { z } from 'zod';

// ===== 日付 =====

/** YYYY-MM-DD 形式の日付（任意項目用） */
export const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください');

/** YYYY-MM-DD 形式の日付（任意、空文字許可） */
export const optionalDateSchema = dateSchema.optional().or(z.literal(''));

/** YYYY年MM月 形式の年月（任意、空文字許可） */
export const yearMonthSchema = z
  .string()
  .regex(/^\d{4}年\d{1,2}月$/, '年月はYYYY年MM月形式で入力してください')
  .optional()
  .or(z.literal(''));

// ===== 電話番号 =====

/** 日本の電話番号（0始まり、10-11桁、ハイフンなし）— 任意項目用 */
export const phoneSchema = z
  .string()
  .regex(
    /^0\d{9,10}$/,
    '電話番号は0始まりの10〜11桁の数字で入力してください（ハイフンなし）',
  )
  .optional()
  .or(z.literal(''));

/** 日本の電話番号（必須項目用） */
export const requiredPhoneSchema = z
  .string()
  .min(1, '電話番号は必須です')
  .regex(
    /^0\d{9,10}$/,
    '電話番号は0始まりの10〜11桁の数字で入力してください（ハイフンなし）',
  );

// ===== 郵便番号 =====

/** 日本の郵便番号（7桁、ハイフンなし） */
export const postalCodeSchema = z
  .string()
  .regex(/^\d{7}$/, '郵便番号は7桁の数字で入力してください（ハイフンなし）');

// ===== メールアドレス =====

/** メールアドレス（必須項目用） */
export const emailSchema = z
  .string()
  .email('正しいメールアドレスを入力してください');

/** メールアドレス（任意項目用、空文字許可） */
export const optionalEmailSchema = emailSchema.optional().or(z.literal(''));

// ===== カタカナ =====

/** カタカナバリデーション（必須） */
export const katakanaSchema = (fieldName: string = 'フィールド') =>
  z
    .string()
    .min(1, `${fieldName}は必須です`)
    .regex(/^[ァ-ヶー\s]+$/, `${fieldName}はカタカナで入力してください`);

// ===== 数値ヘルパー =====

/** 非負数値（空文字/NaN → null、数値 → number） */
export const optionalNonnegativeNumber = z.preprocess(
  (val) =>
    val === '' || val === null || val === undefined || Number.isNaN(val)
      ? null
      : val,
  z.coerce
    .number({ message: '数値を入力してください' })
    .nonnegative('0以上の数値を入力してください')
    .nullable(),
);

/** 非負整数（空文字/NaN → null、数値 → int） */
export const optionalNonnegativeInt = z.preprocess(
  (val) =>
    val === '' || val === null || val === undefined || Number.isNaN(val)
      ? null
      : val,
  z.coerce
    .number({ message: '数値を入力してください' })
    .int('整数を入力してください')
    .nonnegative('0以上の数値を入力してください')
    .nullable(),
);

// ===== UUID =====

/** UUID 形式 */
export const uuidSchema = z.string().uuid('有効なUUID形式で入力してください');
