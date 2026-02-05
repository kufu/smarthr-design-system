import SmartHRUIPreset from 'smarthr-ui/lib/smarthr-ui-preset'

export default {
  presets: [SmartHRUIPreset],
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
    './node_modules/smarthr-ui/lib/**/*.js',
  ],
}

