import path from 'path'
import glob from 'glob'

import { generateOgImage } from './generateOgImageByFile'

const CONTENT_PATH = path.join(__dirname, '../../content/articles/**/*.mdx')

;(async () => {
  for await (const file of await glob.sync(CONTENT_PATH)) {
    console.log(`Generating OGP image for ${file}`)
    await generateOgImage(file).catch((error) => {
      console.error(error)
      process.exit(1)
    })
  }
})()
