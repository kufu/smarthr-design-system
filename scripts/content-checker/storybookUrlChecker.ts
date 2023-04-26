import fs from 'fs/promises'
import path from 'path'

import { glob } from 'glob'
import puppeteer from 'puppeteer'

import { fetchUiVersions } from '../../plugins/gatsby-source-ui-versions/fetchUiVersions'
import { SHRUI_CHROMATIC_ID, SHRUI_GITHUB_PATH } from '../../src/constants/application'
import { fetchStoryData } from '../../src/lib/fetchStoryData'

type PageItem = {
  filePath: string
  githubUrl: string
  storybookUrl: string
}

const CONTENT_PATH = path.join(__dirname, '../../content/articles/products/components/**/*.mdx')

const getPageList = async () => {
  const pageList: PageItem[] = []

  const parentPackageJson = JSON.parse(await fs.readFile(path.join(__dirname, '../../package.json'), 'utf8'))
  const defaultVersion = parentPackageJson.dependencies['smarthr-ui'].replace('^', '')
  const versionsData = await fetchUiVersions()
  const commitHash =
    versionsData.find((item) => {
      return item.version === defaultVersion
    })?.commitHash ?? null
  if (commitHash === null) {
    console.error(`Couldn't get current commit hash.`)
    process.exit(1)
  }

  for (const file of await glob(CONTENT_PATH)) {
    const content = await fs.readFile(file, 'utf8')
    const matchStoryName = content.match(/<ComponentStory\sname="(.+?)"/)
    if (matchStoryName === null) continue

    const storyName = matchStoryName[1]
    const storyData = await fetchStoryData(storyName, defaultVersion)
    const defaultStory = storyData.storyItems[0]?.iframeName ?? ''

    pageList.push({
      filePath: file,
      githubUrl: `${SHRUI_GITHUB_PATH}v${defaultVersion}/src/components/${storyName}`,
      storybookUrl: `https://${commitHash}--${SHRUI_CHROMATIC_ID}.chromatic.com/iframe.html?id=${storyData.groupPath}-${defaultStory}&viewMode=story`,
    })
  }

  return pageList
}

const checkGithub = async (pageList: PageItem[]) => {
  const errorList = []
  for (const page of pageList) {
    const githubRes = await fetch(page.githubUrl, { method: 'HEAD' }).catch((error) => {
      console.error(error)
      process.exit(1)
    })
    if (githubRes.status >= 400) {
      errorList.push(`Error: [${githubRes.status}] ${githubRes.statusText} at ${page.githubUrl}`)
    }
  }

  return errorList
}

const checkStorybook = async (pageList: PageItem[]) => {
  const errorList: string[] = []

  const browser = await puppeteer.launch({
    headless: true,
  })
  const page = await browser.newPage()

  for (const pageItem of pageList) {
    try {
      await page.goto(pageItem.storybookUrl, { timeout: 5000 })
      const bodyHandle = await page.$('body')
      if (bodyHandle === null) throw new Error(`Couldn't get HTML body element at ${pageItem.storybookUrl}`)

      const bodyClassList = await (await bodyHandle.getProperty('className')).jsonValue()
      if (bodyClassList.includes('sb-show-errordisplay')) {
        throw new Error(`Storybook error at ${pageItem.storybookUrl}`)
      }
    } catch (error) {
      if (error instanceof Error) {
        errorList.push(error.toString())
      } else {
        console.error(error)
        process.exit(1)
      }
    }
  }

  await browser.close()
  return errorList
}

;(async () => {
  const pageList = await getPageList()
  const githubErrors = await checkGithub(pageList)
  const storybookErrors = await checkStorybook(pageList)

  const errorList = [...githubErrors, ...storybookErrors]
  if (errorList.length > 0) {
    errorList.forEach((message) => {
      console.error(message)
    })
    console.log(`Found ${errorList.length} error(s). Storybook URL check finished.`)
    process.exit(1)
  }
  console.log('✨ No errors found. Storybook URL check finished.')
})()
