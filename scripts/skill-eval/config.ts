import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** リポジトリルート (scripts/skill-eval から 2 つ上) */
export const REPO_ROOT = path.resolve(__dirname, '..', '..');

/** component-guidelines プラグイン (Progressive Disclosure 構成) のルート */
export const SKILL_ROOT = path.join(
  REPO_ROOT,
  'plugins',
  'smarthr-design-system',
  'skills',
  'component-guidelines',
);

export const SKILL_MD_PATH = path.join(SKILL_ROOT, 'SKILL.md');
export const COMPONENT_SELECTOR_PATH = path.join(SKILL_ROOT, 'component-selector.md');
export const COMPONENTS_DIR = path.join(SKILL_ROOT, 'components');

/** 評価成果物の出力ルート (workspace/iteration-N/eval-<id>/<condition>) */
export const WORKSPACE_ROOT = path.join(__dirname, 'workspace');

/**
 * モデル設定。with/without は同一の生成モデルを使い、バイアスを左右対称に保つ
 * (Notion Phase 1: 「生成も Judge も同系統だが with/without 同一モデル生成」)。
 * 環境変数で上書き可能。
 */
export const GEN_MODEL = process.env.SKILL_EVAL_GEN_MODEL ?? 'claude-sonnet-4-6';
export const JUDGE_MODEL = process.env.SKILL_EVAL_JUDGE_MODEL ?? 'claude-opus-4-8';

/** 各 (プロンプト × 条件) の生成反復回数。中央値集計に使う (Phase 1: N=5) */
export const REPETITIONS = Number(process.env.SKILL_EVAL_N ?? 5);

/** 生成・採点の最大トークン */
export const GEN_MAX_TOKENS = 4096;
export const JUDGE_MAX_TOKENS = 1500;

export type Condition = 'with_skill' | 'without_skill';
export const CONDITIONS: Condition[] = ['with_skill', 'without_skill'];
