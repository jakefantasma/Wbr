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
const contexto = {
  br: null,
};
let EXTENSION_PATH = path.join(__dirname, "../../../", "ext", "Inyector");
console.log(EXTENSION_PATH);

//load by profile
let r_ = process.env.APPDATA;
r_ = path.resolve(r_, "..");
r_ = path.join(r_, "Local");

console.log("----------------");
console.log(r_);
console.log("----------------");

let current_br = "brave";
let b_co = {
  chrome: {
    executable:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    session: path.join(r_, "Google", "Chrome", "User Data"),
  },
  brave: {
    executable:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    session: path.join(r_, "BraveSoftware", "Brave-Browser", "User Data"),
  },
};
console.log(b_co)
console.log(b_co[current_br].executable)
console.log(b_co[current_br].session)

async function InitBrowser() {
  contexto.br = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    executablePath: b_co[current_br].executable,
    //"C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    //  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    // userDataDir:
    //   "C:\\Users\\Caballeros\\AppData\\Local\\Google\\Chrome\\User Data",
    userDataDir: b_co[current_br].session,
    //"C:\\Users\\Caballeros\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data",
    args: [
      // "--window-position=-1000,250",
      //`--window-size=${screenSize.windows.w},${screenSize.windows.h}`,
      //"--start-fullscreen",
      //"--incognito",
      //"--aggressive-cache-discard",
      "--no-default-browser-check",
      //`--disable-extensions-except=${EXTENSION_PATH}`,
      //`--load-extension=${EXTENSION_PATH}`,
      "--start-maximized",
    ],
    ignoreDefaultArgs: [
      "--enable-automation",
      "--disable-default-browser-check",
    ],
  });
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
