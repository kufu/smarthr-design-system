import fs from 'fs/promises'
import path from 'path'
import glob from 'glob'

const CONTENT_PATH = path.join(__dirname, '../content/articles/**/*.mdx')
const IMAGE_PATH = path.join(__dirname, '../content/articles/**/*.+(png|jpg|jpeg)')
const DOWNLOAD_PATH = path.join(__dirname, '../static/**/*')

type LinkItem = { link: string; filePath: string; pagePath: string; lineNo: number; type: 'link' | 'image' }

const check = async () => {
  const sdsPageList: string[] = []
  const linkList: LinkItem[] = []
  const errorList: LinkItem[] = []

  for await (const file of await glob.sync(CONTENT_PATH)) {
    // ビルド後のパス
    const pagePath = file
      .replace(/^.*\/content\/articles/, '')
      .replace(/\/index\.mdx$/, '/')
      .replace(/\.mdx$/, '/')
    // ファイル自体のビルド後のパスを配列に入れておく
    sdsPageList.push(pagePath)

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
      sdsPageList.push(`${pagePath}#h${level}-${headingCount[level]}`)
      headingCount[level] += 1
    }
  }

  // 画像ファイル
  for await (const file of await glob.sync(IMAGE_PATH)) {
    //ビルド後のパスを配列に入れておく
    const filePath = file.replace(/^.*\/content\/articles/, '')
    sdsPageList.push(filePath)
  }

  // ダウンロード用のファイル
  for await (const file of await glob.sync(DOWNLOAD_PATH)) {
    //ビルド後のパスを配列に入れておく
    const filePath = file.replace(/^.*\/static/, '')
    sdsPageList.push(filePath)
  }

  // 見つかったリンク表記のパスが存在するかどうか確認していく
  for (const linkItem of linkList) {
    // 「https://smarthr.design」部分は不要なので削除
    const srcPath = linkItem.link.replace(/^https:\/\/smarthr.design/, '')

    // 外部サイトへのリンクを除外
    if (/^http/.test(srcPath)) continue

    // Airtableコンテンツのアンカーはソースコードからは分からないので除外（例：#recHmpb0LwZk9yHir-0）
    if (/#rec[a-zA-Z0-9]{14}-0/.test(srcPath)) continue

    // 同じページ内のアンカーへのリンクの場合（「#h2-0」など）
    if (/^#/.test(srcPath)) {
      if (!sdsPageList.includes(`${linkItem.pagePath}${srcPath}`)) errorList.push(linkItem)
      continue
    }

    //「/」で始まるルートパス表記の場合
    if (/^\//.test(srcPath)) {
      if (!sdsPageList.includes(srcPath)) errorList.push(linkItem)
      continue
    }

    // 上記以外（間接パス表記）の場合 - リンク
    if (linkItem.type === 'link') {
      const pagePath = path.normalize(`${linkItem.pagePath}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!sdsPageList.includes(pagePath)) errorList.push(linkItem)
    }

    // 間接パス表記の場合 - 画像
    if (linkItem.type === 'image') {
      const imagePath = path.normalize(`${path.dirname(linkItem.filePath)}/${srcPath}`).replace(/^.*\/content\/articles/, '')
      if (!sdsPageList.includes(imagePath)) errorList.push(linkItem)
    }
  }

  return errorList
}

check().then(
  (res) => {
    if (res.length > 0) {
      res.forEach((r) => {
        console.error(
          `Missing ${r.type === 'image' ? 'image source' : 'link'}: ${r.link} in /${path.relative(
            `${__dirname}/../`,
            r.filePath,
          )} at L:${r.lineNo}`,
        )
      })
      console.log(`Found ${res.length} missing links. Link check finished.`)
      process.exit(1)
    }
    console.log('✨ No missing link was found. Link check finished.')
  },
  (err) => {
    console.error(err)
    process.exit(1)
  },
)
