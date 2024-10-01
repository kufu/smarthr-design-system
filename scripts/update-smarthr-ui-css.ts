import fs from 'fs';
import fetch from 'node-fetch';

const downloadSmarthrUiCss = async () => {
  const url = 'https://www.unpkg.com/smarthr-ui/smarthr-ui.css';

  try {
    const response = await fetch(url);
    const cssContent = await response.text();
    fs.writeFileSync('static/smarthr-ui2.css', cssContent);
    console.log('最新の smarthr-ui.css をダウンロードしました!!');
  } catch (error) {
    console.error('Error downloading smarthr-ui.css:', error);
  }
};

downloadSmarthrUiCss();
