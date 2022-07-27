import fs from 'fs/promises'
import path from 'path'
//@ts-ignore
import TinySegmenter from 'tiny-segmenter'
import { CanvasRenderingContext2D, createCanvas, loadImage } from 'canvas'
import fm from 'front-matter'
import { CSS_COLOR } from '../../src/constants/style'

const fragmentText = (text: string, maxWidth: number, ctx: CanvasRenderingContext2D) => {
  const line1: string[] = []
  const line2: string[] = []
  const segmenter = new TinySegmenter()
  for (const word of segmenter.segment(text)) {
    if (line2.length === 0) {
      line1.push(word)
      //2単語目以降で横幅がはみ出る場合は2行目に送る
      //ただし、句読点などは除く（行頭の禁則処理）
      if (ctx.measureText(line1.join('')).width > maxWidth && line1.length > 1 && !['、', '。', ')', '）'].includes(word)) {
        line1.pop()
        line2.push(word)
      }
    } else {
      line2.push(word)
      //2単語目以降で横幅がはみ出る場合
      if (ctx.measureText(line2.join('')).width > maxWidth && line2.length > 1) {
        line2.pop()
        line2.pop()
        line2.push('…')
        break
      }
    }
    //行末の禁食処理
    if (['(', '（'].includes(line1[line1.length - 1])) {
      line2.unshift(line1[line1.length - 1])
      line1.pop()
    }
  }

  return line2.length === 0 ? [line1.join('')] : [line1.join(''), line2.join('')]
}

const generateOgp = async (title: string, description: string) => {
  const canvas = createCanvas(1200, 630)
  const ctx = canvas.getContext('2d')

  const image = await loadImage(path.join(__dirname, './OGP-Image-base.png'))
  ctx.drawImage(image, 0, 0, 1200, 630)

  ctx.fillStyle = CSS_COLOR.TEXT_BLACK
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = 'bold 96px sans-serif'
  const titleLines = fragmentText(title, 1000, ctx)
  if (titleLines.length === 1) {
    ctx.fillText(titleLines[0], 600, 280, 1000)
  } else {
    ctx.fillText(titleLines[0], 600, 200, 1000)
    ctx.fillText(titleLines[1], 600, 330, 1000)
  }

  ctx.fillStyle = CSS_COLOR.TEXT_GREY
  ctx.textAlign = 'left'
  ctx.font = 'bold 32px sans-serif'
  const descriptionLines = fragmentText(description, 1000, ctx)
  ctx.fillText(descriptionLines[0], 100, 510, 1000)
  if (descriptionLines.length > 1) ctx.fillText(descriptionLines[1], 100, 560, 1000)

  return canvas.toBuffer('image/png')
}

export const generateOgImage = async (filePath: string) => {
  type Attributes = { title: string; description: string }

  const fileContent = await fs.readFile(path.resolve(__dirname, filePath), 'utf8')
  const fmContent = fm(fileContent)

  if (typeof fmContent.attributes !== 'object') {
    console.error("Couldn't read frontmatter")
    process.exit(1)
  }

  const attributes = fmContent.attributes as Attributes
  const buffer = await generateOgp(attributes.title, attributes.description)
  const fileName = filePath
    .replace(/^.*?\/content\/articles\//, '')
    .split('/')
    .join('_')

  await fs.writeFile(path.join(__dirname, '../../static/images/', `ogp-${fileName}.png`), buffer)
}
