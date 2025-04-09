import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { TextEncoder } from 'util';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_DIR = resolve(__dirname, '../src/content/articles');
const OUTPUT_DIR = resolve(__dirname, '../public');

interface FrontMatter {
  title: string;
  description: string;
  order?: number;
}

interface Article {
  frontmatter: FrontMatter;
  content: string;
  path: string;
}

function parseYamlFrontMatter(content: string): { frontmatter: FrontMatter; content: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) {
    return {
      frontmatter: { title: '', description: '' },
      content,
    };
  }

  const yamlContent = match[1];
  const mainContent = match[2];

  // Simple YAML parser for frontmatter
  const frontmatter: FrontMatter = {
    title: '',
    description: '',
  };

  yamlContent.split('\n').forEach((line) => {
    const [key, ...values] = line.split(':');
    const value = values
      .join(':')
      .trim()
      .replace(/^['"]|['"]$/g, '');
    if (key === 'title') frontmatter.title = value;
    if (key === 'description') frontmatter.description = value;
    if (key === 'order') frontmatter.order = parseInt(value, 10) || 0;
  });

  return {
    frontmatter,
    content: mainContent,
  };
}

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];
  const items = readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const path = join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...getAllMdxFiles(path));
    } else if (item.name.endsWith('.mdx')) {
      files.push(path);
    }
  }

  return files;
}

function readMdxFile(path: string): Article {
  const content = readFileSync(path, 'utf-8');
  const { frontmatter, content: mdxContent } = parseYamlFrontMatter(content);
  return {
    frontmatter,
    content: mdxContent,
    path: path.replace(ARTICLES_DIR, ''),
  };
}

function generateLlmsTxt(articles: Article[]) {
  let content = '# SmartHR Design System Documentation Structure\n\n';

  // Group articles by directory
  const groupedArticles = articles.reduce(
    (acc, article) => {
      const dir = article.path.split('/')[1] || 'root';
      if (!acc[dir]) acc[dir] = [];
      acc[dir].push(article);
      return acc;
    },
    {} as Record<string, Article[]>,
  );

  // Generate TOC
  const encoder = new TextEncoder();
  for (const [dir, dirArticles] of Object.entries(groupedArticles)) {
    const sortedArticles = dirArticles.sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0));
    content += `\n## ${dir}\n`;
    for (const article of sortedArticles) {
      const { title, description } = article.frontmatter;
      content += `- ${title}${description ? `: ${description}` : ''}\n`;
    }
  }

  writeFileSync(join(OUTPUT_DIR, 'llms.txt'), content, { encoding: 'utf-8' });
}

function generateLlmsFullTxt(articles: Article[]) {
  let content = '# SmartHR Design System Full Documentation\n\n';

  const sortedArticles = articles.sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0));

  const encoder = new TextEncoder();
  for (const article of sortedArticles) {
    const { title, description } = article.frontmatter;
    content += `\n## ${title}\n`;
    if (description) {
      content += `\n${description}\n`;
    }
    content += `\n${article.content}\n`;
    content += '\n---\n';
  }

  writeFileSync(join(OUTPUT_DIR, 'llms-full.txt'), content, { encoding: 'utf-8' });
}

async function main() {
  try {
    // Create output directory if it doesn't exist
    if (!existsSync(OUTPUT_DIR)) {
      mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const mdxFiles = getAllMdxFiles(ARTICLES_DIR);
    const articles = mdxFiles.map((file) => readMdxFile(file));

    generateLlmsTxt(articles);
    generateLlmsFullTxt(articles);

    console.log('Successfully generated llms.txt and llms-full.txt');
  } catch (error) {
    console.error('Error generating LLM documentation:', error);
    process.exit(1);
  }
}

main();
