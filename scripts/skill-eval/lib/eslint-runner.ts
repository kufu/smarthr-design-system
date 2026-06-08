// ESLint と eslint-config-smarthr は遅延 import する。
// eslint-plugin-smarthr は読み込み時に tsconfig.json の `@/*` paths を検証するため、
// dry-run や AST 機械チェック単体ではこのコストを負わせない。

export type EslintResult = {
  /** smarthr/* ルールの違反総数（error + warning） */
  smarthrViolations: number;
  /** 全ルールの違反総数（参考） */
  totalViolations: number;
  /** 違反ルール名ごとの件数（smarthr/* のみ） */
  smarthrByRule: Record<string, number>;
  /** lint 実行自体が失敗した場合のエラーメッセージ */
  error?: string;
};

// eslint の ESLint クラスのインスタンス（型は any で受ける）
let eslintInstance: { lintText: (code: string, opts: { filePath: string }) => Promise<Array<{ messages: Array<{ ruleId: string | null }> }>> } | null = null;

async function getEslint() {
  if (eslintInstance) return eslintInstance;
  const { ESLint } = await import('eslint');
  const smarthrConfig = (await import('eslint-config-smarthr')).default;
  eslintInstance = new ESLint({
    // プロジェクトの eslint.config を探索させず、ここで渡す config だけを使う
    overrideConfigFile: true,
    // eslint-config-smarthr は Linter.Config[] を default export する
    baseConfig: smarthrConfig as never,
  }) as never;
  return eslintInstance!;
}

/** 生成コードを eslint-config-smarthr で lint し、smarthr/* 違反数を返す */
export async function runEslint(code: string): Promise<EslintResult> {
  try {
    const eslint = await getEslint();
    const results = await eslint.lintText(code, { filePath: 'eval.tsx' });
    const byRule: Record<string, number> = {};
    let smarthrViolations = 0;
    let totalViolations = 0;
    for (const r of results) {
      for (const m of r.messages) {
        totalViolations += 1;
        if (m.ruleId && m.ruleId.startsWith('smarthr/')) {
          smarthrViolations += 1;
          byRule[m.ruleId] = (byRule[m.ruleId] ?? 0) + 1;
        }
      }
    }
    return { smarthrViolations, totalViolations, smarthrByRule: byRule };
  } catch (e) {
    return {
      smarthrViolations: 0,
      totalViolations: 0,
      smarthrByRule: {},
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
