import fs from 'fs/promises'
import path from 'path'

import { glob } from 'glob'

const args = process.argv.slice(2)
const targetFiles = args
  .filter((arg) => arg !== '--fix')
  .map((filePath) => (filePath.startsWith('/') ? filePath : path.join(process.cwd(), filePath)))

const isAutoFixEnabled = args.includes('--fix')

const CONTENT_PATH = path.join(__dirname, '../../content/articles/**/*.mdx')
const IMAGE_PATH = path.join(__dirname, '../../content/articles/**/*.+(png|jpg|jpeg|gif)')
const DOWNLOAD_PATH = path.join(__dirname, '../../static/**/*')

const IGNORE_LIST = ['URL', '#ページ内リンク']

type LinkItem = { link: string; filePath: string; pagePath: string; lineNo: number; type: 'link' | 'image' }

const collectExistLinks = async () => {
  const existPathList: string[] = ['/search/'] // /src/pages/以下に存在するページ
  const linkList: LinkItem[] = []
  for (const file of await glob(CONTENT_PATH)) {
    // ビルド後のパス
    const pagePath = file
      .replace(/^.*\/content\/articles/, '')
      .replace(/\/index\.mdx$/, '/')
      .replace(/\.mdx$/, '/')
    // ファイル自体のビルド後のパスを配列に入れておく
    existPathList.push(pagePath)

    const content = await fs.readFile(file, 'utf8')

    // 見出しを探して、アンカーリンク付きのパスも配列に入れておく
    const headingList = content.matchAll(/^(#{2,5})\s.*$/gm)
    const headingCount: { [key in number]: number } = { 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const heading of headingList) {
      const level = heading[1].length
      existPathList.push(`${pagePath}#h${level}-${headingCount[level]}`)
      headingCount[level] += 1
    }

    // 対象のファイルでなければスキップ
    if (targetFiles.length > 0 && !targetFiles.includes(file)) continue

    // ファイル内のリンク表記を探す
    content.split('\n').forEach((line, index) => {
      const sdsLinks = line.matchAll(/!?\[.*?\]\(([^[|*<>]+)\)/g)
      for (const link of sdsLinks) {
        linkList.push({
          link: link[1].split(' ')[0], // "![sample image](./images/sample.jpg '#width=300px')"のような表記が可能なので
          filePath: file,
          pagePath,
          lineNo: index + 1,
          type: /^!/.test(link[0]) ? 'image' : 'link',
        })
      }
    })
  }

  // 画像ファイル
  for (const file of await glob(IMAGE_PATH)) {
    //ビルド後のパスを配列に入れておく
    const filePath = file.replace(/^.*\/content\/articles/, '')
    existPathList.push(filePath)
  }

  // ダウンロード用のファイル
  for (const file of await glob(DOWNLOAD_PATH)) {
    //ビルド後のパスを配列に入れておく
    const filePath = file.replace(/^.*\/static/, '')
    existPathList.push(filePath)
  }

  return { existPathList, linkList }
}

const check = async (existPathList: string[], linkList: LinkItem[]) => {
  const list: LinkItem[] = []
  // 見つかったリンク表記のパスが存在するかどうか確認していく
  for (const linkItem of linkList) {
    if (IGNORE_LIST.includes(linkItem.link)) continue

    // 「https://smarthr.design」部分は不要なので削除
    const srcPath = linkItem.link.replace(/^https:\/\/smarthr.design/, '')

    // 外部サイトへのリンクを除外
    if (/^http/.test(srcPath)) continue

    // Airtableコンテンツのアンカーはソースコードからは分からないので除外（例：#recHmpb0LwZk9yHir-0）
    if (/#rec[a-zA-Z0-9]{14}-0/.test(srcPath)) continue

    // 同じページ内のアンカーへのリンクの場合（「#h2-0」など）
    if (/^#/.test(srcPath)) {
      if (!existPathList.includes(`${linkItem.pagePath}${srcPath}`)) list.push(linkItem)
      continue
    }

    //「/」で始まるルートパス表記の場合 - リンク
    if (/^\//.test(srcPath) && linkItem.type === 'link') {
      if (!existPathList.includes(srcPath)) list.push(linkItem)
      continue
    }

    // 上記以外（間接パス表記）の場合 - リンク
    if (linkItem.type === 'link') {
      const pagePath = path.normalize(`${linkItem.pagePath}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!existPathList.includes(pagePath)) list.push(linkItem)
    }

    // 画像全般
    if (linkItem.type === 'image') {
      const imagePath = path.normalize(`${path.dirname(linkItem.filePath)}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!existPathList.includes(imagePath)) list.push(linkItem)
    }
  }

  return list
}

const autoFixTrailingSlash = async (item: LinkItem) => {
  const content = await fs.readFile(item.filePath, 'utf8')
  const output: string[] = []
  content.split('\n').forEach((line, index) => {
    if (index + 1 === item.lineNo) {
      // リンクが存在する行に達したら、末尾にスラッシュを追加したURLに置き換える
      const pagePath = item.link.replace(/#.*?$/, '')
      output.push(line.replace(pagePath, pagePath.replace(/\/?$/, '/')))
    } else {
      // 対象の行以外はそのまま出力
      output.push(line)
    }
  })
  await fs.writeFile(item.filePath, output.join('\n'))
}

;(async () => {
  const { existPathList, linkList } = await collectExistLinks().catch((err) => {
    console.error(err)
    process.exit(1)
  })
  const missingLinkList: LinkItem[] = await check(existPathList, linkList).catch((err) => {
    console.error(err)
    process.exit(1)
  })
  let fixedCount = 0
  for (const item of missingLinkList) {
    let errorType = `Missing ${item.type === 'image' ? 'image source' : 'link'}`
    const normalizedLink = path.normalize(`${item.pagePath}/${item.link}`).replace(/^.*\/content\/articles/, '')
    const siteRootLink = item.link.replace(/https:\/\/smarthr.design/, '')
    if (
      existPathList.includes(`${siteRootLink}/`) ||
      existPathList.includes(siteRootLink.replace('#', '/#')) ||
      existPathList.includes(`${normalizedLink}/`)
    ) {
      if (isAutoFixEnabled) {
        try {
          await autoFixTrailingSlash(item)
          errorType = `No trailing slash - fixed automatically`
          fixedCount += 1
        } catch (err) {
          errorType = `No trailing slash - could not be automatically fixed`
        }
      } else {
        errorType = `No trailing slash`
      }
    }
    console.error(`${errorType}: ${item.link} in /${path.relative(`${__dirname}/../`, item.filePath)} at L:${item.lineNo}`)
  }

  const remainingCount = missingLinkList.length - fixedCount
  if (remainingCount === 0) {
    console.log('✨ No missing link was found. Link check finished.')
    process.exit(0)
  }
  console.log(`Found ${remainingCount} missing links. Link check finished.`)
  process.exit(0)
})()
