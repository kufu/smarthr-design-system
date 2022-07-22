import path from 'path'
import { generateOgImage } from './generateOgImageByFile'

const filePath = path.join(process.cwd(), process.argv[2])
generateOgImage(filePath)
