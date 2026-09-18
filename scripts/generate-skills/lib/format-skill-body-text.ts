/** src/constants/site.ts の SITE_URL と同値（generate-skills は Astro に依存しない） */
const SITE_URL = 'https://smarthr.design';
const COMPONENT_PATH_PREFIX = '/products/components/';

export function formatSkillBodyText(text: string): string {
  return text
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label: string, href: string) => formatLink(label, href))
    .trim();
}

function formatLink(label: string, href: string): string {
  if (href.startsWith(COMPONENT_PATH_PREFIX)) return label;
  if (href.startsWith('/')) return `${label}（${SITE_URL}${href}）`;
  if (/^https?:\/\//.test(href)) return `${label}（${href}）`;
  return label;
}
