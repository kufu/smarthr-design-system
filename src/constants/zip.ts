type zipImageTarget = {
  zipName: string;
  rootPath: string;
};

export const ZIP_IMAGE_OUTPUT_ROOT_PATH = '/public/downloads/';

export const ZIP_IMAGE_README_PATH = '/scripts/downloads/readme.txt';

export const ZIP_IMAGE_TARGETS: zipImageTarget[] = [
  {
    zipName: 'icon',
    rootPath: '/src/content/articles/basics/icons/images/icons',
  },
];
