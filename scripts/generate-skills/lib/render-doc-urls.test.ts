import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { describe, it } from 'node:test';

import { articlePathToUrl, collectPatternDocUrls, renderDocUrls } from './render-doc-urls.js';

describe('articlePathToUrl', () => {
  it('コンポーネントのディレクトリはそのままパスになる', () => {
    assert.equal(
      articlePathToUrl('products/components/layout/stack'),
      'https://smarthr.design/products/components/layout/stack/',
    );
  });

  it('index.mdx と拡張子を落とす', () => {
    assert.equal(
      articlePathToUrl('products/design-patterns/confirmation-step/index.mdx'),
      'https://smarthr.design/products/design-patterns/confirmation-step/',
    );
    assert.equal(
      articlePathToUrl('products/design-patterns/empty-data.mdx'),
      'https://smarthr.design/products/design-patterns/empty-data/',
    );
  });
});

describe('collectPatternDocUrls', () => {
  it('記事へのシンボリックリンクだけを対象にする', () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), 'doc-urls-'));
    const articles = path.join(root, 'articles');
    const patterns = path.join(root, 'patterns');
    fs.mkdirSync(path.join(articles, 'products/design-patterns/wizard'), { recursive: true });
    fs.writeFileSync(path.join(articles, 'products/design-patterns/wizard/index.mdx'), '');
    fs.writeFileSync(path.join(articles, 'products/design-patterns/feedback.mdx'), '');
    fs.mkdirSync(patterns);
    fs.symlinkSync('../articles/products/design-patterns/wizard/index.mdx', path.join(patterns, 'wizard.mdx'));
    fs.symlinkSync('../articles/products/design-patterns/feedback.mdx', path.join(patterns, 'feedback.mdx'));
    fs.writeFileSync(path.join(patterns, 'not-a-link.mdx'), '');

    const entries = collectPatternDocUrls(patterns, articles).sort((a, b) => a.guide.localeCompare(b.guide));
    assert.deepEqual(entries, [
      { guide: 'patterns/feedback.mdx', url: 'https://smarthr.design/products/design-patterns/feedback/' },
      { guide: 'patterns/wizard.mdx', url: 'https://smarthr.design/products/design-patterns/wizard/' },
    ]);
    fs.rmSync(root, { recursive: true, force: true });
  });
});

describe('renderDocUrls', () => {
  it('ガイドのパスの順に表を描く', () => {
    const out = renderDocUrls([
      { guide: 'patterns/wizard.mdx', url: 'https://smarthr.design/products/design-patterns/wizard/' },
      { guide: 'components/Button.md', url: 'https://smarthr.design/products/components/button/' },
    ]);
    const rows = out.split('\n').filter((line) => line.startsWith('| ') && !line.startsWith('| ガイド'));
    assert.deepEqual(rows, [
      '| components/Button.md | https://smarthr.design/products/components/button/ |',
      '| patterns/wizard.mdx | https://smarthr.design/products/design-patterns/wizard/ |',
    ]);
  });
});
