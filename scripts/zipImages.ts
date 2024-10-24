import path from 'node:path';

import AdmZip from 'adm-zip';

import { ZIP_IMAGE_OUTPUT_ROOT_PATH, ZIP_IMAGE_README_PATH, ZIP_IMAGE_TARGETS } from '../src/constants/zip';

const zipDirectory = (zipName: string, targetRootPath: string) => {
  const zip = new AdmZip();
  const targetAbsolutePath = path.join(process.cwd(), targetRootPath);
  const readmeAbsolutePath = path.join(process.cwd(), ZIP_IMAGE_README_PATH);
  zip.addLocalFolder(targetAbsolutePath);
  zip.addLocalFile(readmeAbsolutePath);

  try {
    zip.writeZip(path.join(process.cwd(), ZIP_IMAGE_OUTPUT_ROOT_PATH, `${zipName}.zip`));
  } catch (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
  }
};

ZIP_IMAGE_TARGETS.forEach((target) => {
  zipDirectory(target.zipName, target.rootPath);
});
