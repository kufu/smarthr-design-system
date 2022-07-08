import fs from 'fs/promises'
import path from 'path'
import glob from 'glob'

const CONTENT_PATH = path.join(__dirname, '../content/articles/**/*.mdx')
const IMAGE_PATH = path.join(__dirname, '../content/articles/**/*.+(png|jpg|jpeg)')
const DOWNLOAD_PATH = path.join(__dirname, '../static/**/*')

const IGNORE_LIST = ['URL', '#ページ内リンク']

type LinkItem = { link: string; filePath: string; pagePath: string; lineNo: number; type: 'link' | 'image' }

const collectExistLinks = async () => {
  const existPathList: string[] = []
  const linkList: LinkItem[] = []
  for await (const file of await glob.sync(CONTENT_PATH)) {
    // ビルド後のパス
    const pagePath = file
      .replace(/^.*\/content\/articles/, '')
      .replace(/\/index\.mdx$/, '/')
      .replace(/\.mdx$/, '/')
    // ファイル自体のビルド後のパスを配列に入れておく
    existPathList.push(pagePath)

    // ファイル内のリンク表記を探す
    const content = await fs.readFile(file, 'utf8')
    content.split('\n').forEach((line, index) => {
      const sdsLinks = line.matchAll(/!?\[.*?\]\(([^[]+)\)/g)
      for (const link of sdsLinks) {
        linkList.push({
          link: link[1].split(' ')[0], // "![sample image](./images/sample.jpg '#width=300px')"のような表記が可能なので
          filePath: file,
          pagePath: pagePath,
          lineNo: index + 1,
          type: /^!/.test(link[0]) ? 'image' : 'link',
        })
      }
    })

    // 見出しを探して、アンカーリンク付きのパスも配列に入れておく
    const headingList = content.matchAll(/^(#{2,5})\s.*$/gm)
    const headingCount: { [key in number]: number } = { 2: 0, 3: 0, 4: 0, 5: 0 }
    for (const heading of headingList) {
      const level = heading[1].length
      existPathList.push(`${pagePath}#h${level}-${headingCount[level]}`)
      headingCount[level] += 1
    }
  }

  // 画像ファイル
  for await (const file of await glob.sync(IMAGE_PATH)) {
    //ビルド後のパスを配列に入れておく
    const filePath = file.replace(/^.*\/content\/articles/, '')
    existPathList.push(filePath)
  }

  // ダウンロード用のファイル
  for await (const file of await glob.sync(DOWNLOAD_PATH)) {
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

    //「/」で始まるルートパス表記の場合
    if (/^\//.test(srcPath)) {
      if (!existPathList.includes(srcPath)) list.push(linkItem)
      continue
    }

    // 上記以外（間接パス表記）の場合 - リンク
    if (linkItem.type === 'link') {
      const pagePath = path.normalize(`${linkItem.pagePath}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!existPathList.includes(pagePath)) list.push(linkItem)
    }

    // 間接パス表記の場合 - 画像
    if (linkItem.type === 'image') {
      const imagePath = path.normalize(`${path.dirname(linkItem.filePath)}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!existPathList.includes(imagePath)) list.push(linkItem)
    }
  }

  return list
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
  if (missingLinkList.length > 0) {
    missingLinkList.forEach((item) => {
      console.error(
        `Missing ${item.type === 'image' ? 'image source' : 'link'}: ${item.link} in /${path.relative(
          `${__dirname}/../`,
          item.filePath,
        )} at L:${item.lineNo}`,
      )
    })
    console.log(`Found ${missingLinkList.length} missing links. Link check finished.`)
    process.exit(1)
  }
  console.log('✨ No missing link was found. Link check finished.')
})()
