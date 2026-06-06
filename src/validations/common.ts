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

/**
 * 年月文字列の表記揺れを 'YYYY年M月' に正規化する。
 *
 * レガシー移行データやUI入力には 'YYYY-MM' / 'YYYY/MM' / 'YYYYMM'(6桁) /
 * 前ゼロ付き 'YYYY年0M月' が混在しており、厳格な regex 検証だけだと
 * 当該フィールドに触れていない区画まで保存不能になる（#31）。
 * 解釈できない値はそのまま返し、後段の regex 検証に委ねる。
 * 画面表示用の正規化にも使えるよう export している。
 */
export function normalizeYearMonth(value: unknown): unknown {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (trimmed === '') return '';

  // 'YYYY年M月' / 'YYYY年MM月' → 月の前ゼロを除去して統一
  const jp = trimmed.match(/^(\d{4})年(\d{1,2})月$/);
  if (jp) {
    const month = Number(jp[2]);
    return month >= 1 && month <= 12 ? `${jp[1]}年${month}月` : trimmed;
  }

  // 'YYYY-M(M)' / 'YYYY/M(M)' / 'YYYYMM'(6桁)
  const numeric =
    trimmed.match(/^(\d{4})[-/](\d{1,2})$/) ?? trimmed.match(/^(\d{4})(\d{2})$/);
  if (numeric) {
    const month = Number(numeric[2]);
    if (month >= 1 && month <= 12) return `${numeric[1]}年${month}月`;
  }

  return trimmed;
}

/**
 * YYYY年MM月 形式の年月（任意、空文字許可）
 *
 * 検証前に normalizeYearMonth で表記揺れ（'YYYY-MM'/'YYYYMM' 等）を
 * 吸収する（#31）。正規化できない値のみ regex エラーになる。
 */
export const yearMonthSchema = z.preprocess(
  normalizeYearMonth,
  z
    .string()
    .regex(/^\d{4}年\d{1,2}月$/, '年月はYYYY年MM月形式で入力してください')
    .optional()
    .or(z.literal('')),
);

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
// DB の email 列は VarChar(254)。RFC 5321 のアドレス上限と揃え、
// 超過時に P2000（500化）でなく入力時バリデーションで弾く（#36）
export const emailSchema = z
  .string()
  .max(254, 'メールアドレスは254文字以内で入力してください')
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
