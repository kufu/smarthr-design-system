// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly CLOUDINARY_CLOUD_NAME: string;
  readonly PUBLIC_ALGOLIA_APP_ID;
  readonly ALGOLIA_ADMIN_API_KEY;
  readonly PUBLIC_ALGOLIA_SEARCH_API_KEY;
  readonly PUBLIC_ALGOLIA_INDEX_NAME;

  readonly AIRTABLE_BASE_ID: string;
  readonly AIRTABLE_API_KEY: string;
  readonly AIRTABLE_PERSONAL_ACCESS_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
