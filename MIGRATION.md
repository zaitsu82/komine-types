# @komine/types 移行ガイド

フロントエンドとバックエンドで @komine/types を使用するための移行手順

## フロントエンド移行手順

### 1. API型の置き換え

**Before (src/lib/api/types.ts):**
```typescript
export interface ApiPlotListItem {
  id: string;
  plotNumber: string;
  // ... 個別定義
}
```

**After:**
```typescript
import { PlotListItem, PlotDetailResponse } from '@komine/types';

// 直接使用可能
const item: PlotListItem = response.data;
```

### 2. Enum の置き換え

**Before (src/types/customer.ts):**
```typescript
type Gender = 'male' | 'female';
type PaymentStatus = 'paid' | 'unpaid' | 'partial_paid';
```

**After:**
```typescript
import { Gender, PaymentStatus } from '@komine/types';

// Enum として使用
if (status === PaymentStatus.Paid) { ... }
```

### 3. 型変換関数の削減

**Before (src/lib/api/customers.ts):**
```typescript
// 変換関数が必要だった
export function apiPlotListItemToCustomer(item: ApiPlotListItem): Customer {
  return {
    customerCode: item.plotNumber,
    name: item.customerName || '',
    // ... 多数のマッピング
  };
}
```

**After:**
```typescript
import { PlotListItem } from '@komine/types';

// API レスポンスをそのまま使用可能
// バックエンドとフロントエンドで同じ型を共有
const plots: PlotListItem[] = response.data.data;
```

### 4. 移行対象ファイル

フロントエンドで移行が必要なファイル:

| ファイル | 対応 |
|---------|------|
| `src/lib/api/types.ts` | `@komine/types/api` で置き換え |
| `src/types/customer.ts` | `@komine/types` の models で置き換え |
| `src/lib/api/customers.ts` | 変換関数を削減 |
| `src/lib/data.ts` | 型定義を `@komine/types` に変更 |

## バックエンド移行手順

### 1. コントローラーの型定義

**Before:**
```typescript
// 型定義がインラインまたは未定義
res.json({
  success: true,
  data: { ... }
});
```

**After:**
```typescript
import { ApiSuccessResponse, PlotDetailResponse } from '@komine/types';

const response: ApiSuccessResponse<PlotDetailResponse> = {
  success: true,
  data: plotDetail
};
res.json(response);
```

### 2. Prisma Enum との対応

Prismaが生成するEnumと @komine/types のEnumは値が同じですが、TypeScript の型としては別物です。

**対応方法:**
```typescript
import { PhysicalPlotStatus as ApiPhysicalPlotStatus } from '@komine/types';
import { PhysicalPlotStatus as PrismaPhysicalPlotStatus } from '@prisma/client';

// Prisma → API 変換 (値は同じなのでキャスト可能)
const apiStatus = prismaResult.status as unknown as ApiPhysicalPlotStatus;
```

### 3. レスポンスビルダーの更新

**Before (src/utils/responseBuilder.ts):**
```typescript
// 型定義なし
export function buildPlotResponse(plot: any) { ... }
```

**After:**
```typescript
import { PlotDetailResponse, PlotListItem } from '@komine/types';

export function buildPlotDetailResponse(
  contractPlot: ContractPlotWithRelations
): PlotDetailResponse {
  // 型安全なレスポンス構築
}
```

## 移行スケジュール案

### Phase 1: 基盤整備 (完了)
- [x] @komine/types パッケージ作成
- [x] Enum 定義
- [x] Model 型定義
- [x] API 型定義

### Phase 2: バックエンド統合
- [ ] responseBuilder.ts で @komine/types を使用
- [ ] コントローラーのレスポンス型を明示
- [ ] テストで型を検証

### Phase 3: フロントエンド統合
- [ ] src/lib/api/types.ts を @komine/types に置き換え
- [ ] 型変換関数を削減
- [ ] コンポーネントで新しい型を使用

### Phase 4: クリーンアップ
- [ ] 不要な型定義ファイルを削除
- [ ] 型変換関数を削除
- [ ] ドキュメント更新

## 注意点

### 日付の扱い

@komine/types では日付を ISO 文字列 (`string`) として定義しています。
これはJSON シリアライズ/デシリアライズで Date オブジェクトが文字列になるためです。

```typescript
// API レスポンス
interface Customer {
  birthDate: string | null;  // "2000-01-01" or null
}

// 使用時に Date に変換
const birthDate = customer.birthDate ? new Date(customer.birthDate) : null;
```

### null vs undefined

- APIレスポンス: `null` を使用（JSON シリアライズ対応）
- 入力型 (Input): `undefined` を許容（オプショナルフィールド）

```typescript
// レスポンス型
interface Customer {
  email: string | null;  // 明示的な null
}

// 入力型
interface CustomerInput {
  email?: string | null;  // undefined または null
}
```
