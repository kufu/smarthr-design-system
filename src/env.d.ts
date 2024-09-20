/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
  readonly CLOUDINARY_CLOUD_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
