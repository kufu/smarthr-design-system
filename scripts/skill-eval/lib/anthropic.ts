// @anthropic-ai/sdk は遅延 import する。
// これにより dry-run や機械チェック単体は SDK 未インストールでも tsx で実行でき、
// 実際に API を叩く生成・Judge 実行時のみ SDK を要求する。

type TextBlock = { type: 'text'; text: string };
type AnthropicClient = {
  messages: {
    create(args: {
      model: string;
      max_tokens: number;
      system?: string;
      messages: Array<{ role: 'user'; content: string }>;
    }): Promise<{ content: Array<{ type: string; text?: string }> }>;
  };
};

let client: AnthropicClient | null = null;

async function getClient(): Promise<AnthropicClient> {
  if (client) return client;
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY が未設定です。.env もしくは環境変数に設定してください。');
  }
  // 文字列変数経由にして tsc がインストール前にモジュール解決を試みないようにする。
  const pkg = '@anthropic-ai/sdk';
  const mod = await import(pkg).catch(() => {
    throw new Error(
      '@anthropic-ai/sdk が見つかりません。`pnpm install --filter sds-skill-eval` を実行してください。',
    );
  });
  const Anthropic = (mod as { default: new (o: { apiKey: string }) => AnthropicClient }).default;
  client = new Anthropic({ apiKey });
  return client;
}

/** messages API を叩いてテキスト本文を返す薄いラッパ */
export async function complete(opts: {
  model: string;
  maxTokens: number;
  system?: string;
  user: string;
}): Promise<string> {
  const c = await getClient();
  const res = await c.messages.create({
    model: opts.model,
    max_tokens: opts.maxTokens,
    system: opts.system,
    messages: [{ role: 'user', content: opts.user }],
  });
  return res.content
    .filter((b): b is TextBlock => b.type === 'text' && typeof b.text === 'string')
    .map((b) => b.text)
    .join('\n');
}
