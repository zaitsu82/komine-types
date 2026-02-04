# @komine/types

小峰霊園CRMシステムの共有型定義パッケージ

## 概要

このパッケージは、フロントエンド（komine-frontend-crm-v2）とバックエンド（komine--cemetery-crm-backend）間で共有される型定義を提供します。

## インストール

```bash
# npm workspace を使用する場合
npm install @komine/types --workspace=komine-frontend-crm-v2
npm install @komine/types --workspace=komine--cemetery-crm-backend

# 直接参照する場合
npm install file:../packages/types
```

## 使用方法

### 基本的なインポート

```typescript
// すべての型をインポート
import {
  Customer,
  ContractPlot,
  PhysicalPlotStatus,
  Gender,
  ApiResponse,
  PlotListResponse,
} from '@komine/types';

// enumsのみ
import { PhysicalPlotStatus, Gender, ContractRole } from '@komine/types/enums';

// API型のみ
import { ApiResponse, PlotDetailResponse, CreatePlotRequest } from '@komine/types/api';
```

### Enums

```typescript
import { PhysicalPlotStatus, PaymentStatus, Gender } from '@komine/types';

// 使用例
const status: PhysicalPlotStatus = PhysicalPlotStatus.Available;
const payment: PaymentStatus = PaymentStatus.Paid;
const gender: Gender = Gender.Male;
```

### モデル型

```typescript
import { Customer, ContractPlot, BuriedPerson } from '@komine/types';

const customer: Customer = {
  id: 'uuid',
  name: '田中太郎',
  nameKana: 'タナカタロウ',
  // ...
};
```

### API型

```typescript
import {
  ApiResponse,
  PlotListResponse,
  CreatePlotRequest,
  isSuccessResponse,
} from '@komine/types';

// レスポンス型ガード
const response: ApiResponse<PlotListResponse> = await fetchPlots();
if (isSuccessResponse(response)) {
  console.log(response.data.items);
}
```

## パッケージ構造

```
@komine/types/
├── src/
│   ├── index.ts          # メインエントリーポイント
│   ├── enums.ts          # 全enum定義
│   ├── models/           # エンティティ型定義
│   │   ├── customer.ts   # Customer, WorkInfo, BillingInfo
│   │   ├── plot.ts       # PhysicalPlot, ContractPlot, UsageFee
│   │   ├── staff.ts      # Staff, AuthUser
│   │   └── document.ts   # Document
│   └── api/              # APIリクエスト/レスポンス型
│       ├── common.ts     # ApiResponse, Pagination
│       ├── plots.ts      # Plot API types
│       ├── auth.ts       # Auth API types
│       ├── staff.ts      # Staff API types
│       └── collective-burials.ts
└── dist/                 # コンパイル済みJS + 型定義
```

## Enumの対応表

| Enum | 日本語 | 値 |
|------|--------|-----|
| PhysicalPlotStatus.Available | 利用可能 | 'available' |
| PhysicalPlotStatus.PartiallySold | 一部販売済み | 'partially_sold' |
| PhysicalPlotStatus.SoldOut | 完売 | 'sold_out' |
| PaymentStatus.Unpaid | 未払い | 'unpaid' |
| PaymentStatus.Paid | 全額入金済み | 'paid' |
| Gender.Male | 男性 | 'male' |
| Gender.Female | 女性 | 'female' |
| ContractRole.Applicant | 申込者 | 'applicant' |
| ContractRole.Contractor | 契約者 | 'contractor' |

## 開発

```bash
# ビルド
npm run build

# クリーン
npm run clean
```

## バージョニング

このパッケージは、Prismaスキーマの変更に合わせて更新してください。
変更時は両プロジェクト（frontend/backend）でテストを実行してください。
