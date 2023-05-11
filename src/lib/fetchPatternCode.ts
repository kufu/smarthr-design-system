import { PATTERNS_GITHUB_RAW } from '../constants/application'

export const fetchPatternCode = async (patternName: string) => {
  let patternCode = ''
  const filePath = `${PATTERNS_GITHUB_RAW}${patternName}/${patternName}.tsx`

  const res = await fetch(filePath)
  patternCode = res.ok ? await res.text() : ''

  return patternCode
}
