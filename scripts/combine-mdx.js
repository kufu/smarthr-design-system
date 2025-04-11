import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

// 現在のファイル名と親ディレクトリを取得
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// mdxファイルを取得する関数
function getAllMdxFiles(dir) {
  return glob.sync(`${dir}/**/*.mdx`);
}

// メイン処理
async function main() {
  const contentDir = path.resolve(process.cwd(), 'src/content');
  const outputFile = path.resolve(process.cwd(), 'docs/combined_content.md');
  
  // 出力ディレクトリが存在しない場合は作成
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const mdxFiles = getAllMdxFiles(contentDir);
  console.log(`Found ${mdxFiles.length} MDX files`);
  
  let combinedContent = '# SmartHR Design System - Combined MDX Content\n\n';
  combinedContent += `*Generated on: ${new Date().toISOString()}*\n\n`;
  combinedContent += `*Total files: ${mdxFiles.length}*\n\n`;
  
  // ファイルごとに処理
  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(contentDir, file);
    
    // ファイル名と区切り線をヘッダーとして追加
    combinedContent += `\n\n## ${relativePath}\n\n`;
    combinedContent += content;
    combinedContent += '\n\n---\n\n';
  }
  
  // 結果を書き出し
  fs.writeFileSync(outputFile, combinedContent);
  console.log(`Combined content written to ${outputFile}`);
}

main().catch(err => {
  console.error('Error combining MDX files:', err);
  process.exit(1);
}); 