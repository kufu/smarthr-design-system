/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly AIRTABLE_BASE_ID: string;
  readonly AIRTABLE_API_KEY: string;
  readonly AIRTABLE_PERSONAL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
