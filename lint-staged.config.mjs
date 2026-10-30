const quote = (files) => files.map((file) => JSON.stringify(file)).join(' ');

export default {
  // prelint と lint:check はプロジェクト全体を対象にし、.astro/ や _check/ に書き込むため、
  // glob を分けて並列に走らせると書き込みが衝突する。src/ 以下は 1 つの glob で受け、1 回だけ実行する
  'src/**/*.{astro,ts,tsx,md,mdx}': (files) => {
    const codeFiles = files.filter((file) => /\.(astro|tsx?)$/.test(file));
    const docFiles = files.filter((file) => /\.mdx?$/.test(file));
    const checks = [
      'lint:check',
      ...(codeFiles.length > 0 ? ['lint:ts:content', 'lint:ts:codeblock'] : []),
      ...(docFiles.length > 0 ? ['lint:text'] : []),
    ];

    return [
      'pnpm prelint',
      `pnpm run-p ${checks.join(' ')}`,
      ...(codeFiles.length > 0 ? [`eslint --fix ${quote(codeFiles)}`, `prettier --write ${quote(codeFiles)}`] : []),
      ...(docFiles.length > 0 ? [`textlint --fix ${quote(docFiles)}`] : []),
    ];
  },
  '!(src/**/*.{astro,ts,tsx,md,mdx})': 'prettier --write --ignore-unknown',
};
