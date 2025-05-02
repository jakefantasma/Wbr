/*const puppeteer = require("puppeteer-core");
async function Main(params) {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });
}

Main();
console.log("corriendo")*/
const puppeteer = require("puppeteer-core");
const path = require("path");

const screenSize = {
  windows: { w: 400 * 2, h: 400 * 2 },
  viewport: { w: 400 * 2, h: 400 * 2 },
};
const contexto = {
  br: null,
};
let EXTENSION_PATH = path.join(__dirname, "../../../", "ext", "Inyector");
console.log(EXTENSION_PATH);

async function InitBrowser() {
  contexto.br = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    //"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    //userDataDir:      "C:\\Users\\Caballeros\\AppData\\Local\\Google\\Chrome\\User Data",
    userDataDir: ".\\session",
    args: [
      "--window-position=-1000,500",
      `--window-size=${screenSize.windows.w},${screenSize.windows.h}`,
      //"--start-fullscreen",
      //"--incognito",
      //"--aggressive-cache-discard",
      "--no-default-browser-check",
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
    ],
    ignoreDefaultArgs: [
      "--enable-automation",
      "--disable-default-browser-check",
    ],
  });

  //contexto.currentPage = await contexto.br.newPage();
  /**
  await firstPage.setViewport({
    width: screenSize.viewport.w,
    height: screenSize.viewport.h,
  }); */
  //await contexto.br
}
(async function () {
  if (contexto.br == null) {
    await InitBrowser();
  }
})();

function getBrowser() {
  return contexto.br;
}
function getContext() {
  return contexto;
}
//complemento
function sleep(ms) {
  console.log("esperando ");
  return new Promise((resolve) => setTimeout(resolve, ms));
}
module.exports = () => {
  return { getBrowser, getContext, sleep };
};
