/**
 * 静的監査の検出結果（finding）の型と重大度。
 *
 * 重大度の区分案（Notion Phase 4 で確定するための叩き台）:
 * - error  : 単一ソースに対する「事実誤り」。エージェントを誤誘導しうる。
 *            例) 存在しない props 記載 / 型不一致 / 必須フラグ不一致 /
 *                非推奨コンポーネントの推奨 / 必須セクション欠落 / 非推奨なのにバナー無し
 * - warning: 「陳腐化・取りこぼし・ソース間の不整合」。要再生成・要確認。
 *            例) metadata にあるが guide に無い props / デフォルト値差異 /
 *                説明文の mdx 単一ソースからの乖離 / 非推奨ステータスのソース間不一致
 * - info   : 参考情報。監査不能・未整備など。
 *            例) 対応する index.mdx が無く mdx 整合を検査できない /
 *                displayName が metadata 非公開 / checklist.yaml 未整備
 */
export type Severity = 'error' | 'warning' | 'info';

export type CheckId = 'metadata' | 'deprecation' | 'mdx' | 'structure';

export type Finding = {
  component: string; // ガイド doc 名（PascalCase / dirName）
  check: CheckId;
  severity: Severity;
  /** 該当箇所（例: "Props.Button.variant", "section:## import", "frontmatter.description"） */
  location: string;
  message: string;
  expected?: string;
  actual?: string;
};

export const SEVERITY_ORDER: Record<Severity, number> = { error: 0, warning: 1, info: 2 };
