//browser
let metodos_pp = require("./browser/Contexto/Navegador/PP_context");
const { getBrowser, getCurrentPage, sleep } = metodos_pp();
const popup_methods = require("./browser/Static/popup");
const { Listener, Scripts } = popup_methods();

//db
const structurs_db = require("./Db/Estructuras");
const { BlackList } = structurs_db();

//Main method
async function Main() {
  await sleep(2000);
  //referencia a la primera tab
  let browser = await getBrowser();
  const pages = await browser.pages();
  const firstPage = pages[0];
  //todo set method to read data base, depend of how many elements we have it
  //time is important, we most not affect the user experiences
  let blackListDomain = new BlackList("setting", "dominios_bloqueados");
  async function SyncBlacklist() {
    let tmp_res = blackListDomain.getall();
    if (tmp_res.length == 0 && tmp_res.length < 3) {
      blackListDomain.add({
        dominio: "www.facebook.com",
        redirect: "www.google.com",
        active: 1,
      });
      blackListDomain.add({
        dominio: "www.xvideos.com",
        redirect: "www.google.com",
        active: 1,
      });
      blackListDomain.add({
        dominio: "xvideos.com",
        redirect: "www.google.com",
        active: 1,
      });
      blackListDomain.add({
        dominio: "xvideos.com",
        redirect: "default",
        active: 1,
      });
      console.log(tmp_res);
    }
  }
  await SyncBlacklist();
  await browser.on("targetcreated", async (target) => {
    console.log("tab creada");
    if (target.type() === "page") {
      let tab = await target.page();
      await tab.evaluateOnNewDocument(Scripts);
      await tab.exposeFunction("log", async (datos) => {
        console.log(datos);
      });
      await tab.exposeFunction("update_html", async () => {
        console.log("--------datos-----------");
        console.log("--------llamando a metodo-----------");
        let tmp = blackListDomain.getall();
        await tab.evaluate(async (data) => {
          let listado_dom = document.getElementById("listado_domionios");
          listado_dom.innerHTML = "";
          function target(msg) {
            let item_li = document.createElement("li");
            let info = document.createElement("p");
            info.textContent = msg;
            item_li.appendChild(info);
            return item_li;
          }
          for (const el of data) {
            listado_dom.appendChild(target(el.dominio));
          }
        }, tmp);
      });
      await tab.on("load", async () => {
        console.log("--------navigate payload-----------");
        await Listener(tab);
      });
      await tab.on("request", async (request) => {
        if (request.url != undefined) {
          let contain = blackListDomain.LookByDomain(request.url());
          if (contain != undefined) {
            if (contain.active == 1) {
              try {
                console.log("aplica");
                await tab.goto(`https://${contain.redirect}`);
              } catch (e) {
                console.log("Redundancia en bloqueo ");
                console.error(e);
              }
            }
          }
        }
      });
      await tab.on("response", (response) => {
        //console.log(response);
      });
    }
  });
  console.log("--------navegando-----------");
  await firstPage.goto("https://www.google.com");
  //await page.setRequestInterception(true);
}
Main();

//test();
//sub panel mach plugins an create and add excepcions like a custom inspector
//set opcions from panel like url redireccion, add ulrs to black list
//add a pay coin <- need a coin if you want t o navigate
//alert for dowloads and try to visit adult page
//add function to allow access for a time period,
