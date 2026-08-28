#!/usr/bin/env tsx

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ReleaseNoteArgs {
  title: string;
  description: string;
  releaseDate: string;
  humanId?: string;
  images?: string[];
}

/**
 * ランダムなhuman-idを生成
 */
function generateHumanId(): string {
  const adjectives = ['bright', 'calm', 'clever', 'eager', 'gentle', 'happy', 'kind', 'lovely', 'nice', 'smart'];
  const nouns = ['bird', 'cat', 'dog', 'fish', 'fox', 'lion', 'owl', 'star', 'tree', 'wave'];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}-${noun}-${number}`;
}

/**
 * MDXファイルのコンテンツを生成
 */
function generateMdxContent({ title, description, releaseDate, images }: ReleaseNoteArgs): string {
  const imageContent = images && images.length > 0 ? `\n\n## 画像\n\n${images.map((img) => `![](${img})`).join('\n')}\n` : '';

  return `---
title: "${title}"
description: "${description}"
date: "${releaseDate}"
---

# ${title}

${description}${imageContent}
`;
}

/**
 * リリースノートファイルを作成
 */
function createReleaseNoteFile(args: ReleaseNoteArgs): string {
  const humanId = args.humanId || generateHumanId();
  const filename = `${args.releaseDate}-${humanId}.mdx`;
  const releasesDir = path.resolve(__dirname, '../src/content/articles/releases');

  // releasesディレクトリが存在しない場合は作成
  if (!fs.existsSync(releasesDir)) {
    fs.mkdirSync(releasesDir, { recursive: true });
  }

  const filePath = path.join(releasesDir, filename);
  const content = generateMdxContent(args);

  fs.writeFileSync(filePath, content, 'utf8');

  console.log(`✅ リリースノートファイルを作成しました: ${filePath}`);
  return filePath;
}

/**
 * コマンドライン引数をパース
 */
function parseArgs(): ReleaseNoteArgs {
  const args = process.argv.slice(2);

  if (args.length < 3) {
    console.error('使用方法: tsx scripts/add-release-note-item.ts <title> <description> <releaseDate> [humanId] [images...]');
    console.error(
      '例: tsx scripts/add-release-note-item.ts "新機能追加" "新しいボタンコンポーネントを追加しました" "2024-01-15"',
    );
    process.exit(1);
  }

  const [title, description, releaseDate, humanId, ...imageArgs] = args;

  // 日付形式の簡単な検証
  if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
    console.error('リリース日はYYYY-MM-DD形式で入力してください');
    process.exit(1);
  }

  return {
    title,
    description,
    releaseDate,
    humanId,
    images: imageArgs.length > 0 ? imageArgs : undefined,
  };
}

/**
 * メイン処理
 */
function main() {
  try {
    const args = parseArgs();
    const filePath = createReleaseNoteFile(args);

    console.log('🎉 リリースノートの作成が完了しました！');
    console.log(`ファイルパス: ${filePath}`);
  } catch (error) {
    console.error('❌ エラーが発生しました:', error);
    process.exit(1);
  }
}

// スクリプトが直接実行された場合のみmain関数を実行
if (import.meta.url === `file://${__filename}`) {
  main();
}

export { createReleaseNoteFile, generateHumanId, generateMdxContent };
