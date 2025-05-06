//browser
let metodos_pp = require("./browser/Contexto/Navegador/PP_context");
const { getBrowser, getCurrentPage, sleep } = metodos_pp();
const popup_methods = require("./browser/Static/popup");
const { Listener, Scripts } = popup_methods();
const express = require("express");

const app = express();

//db
const structurs_db = require("./Db/Estructuras");
const { BlackList, Whitelist } = structurs_db();

//Main method
async function Main() {
  await sleep(2000);

  //referencia a la primera tab
  let browser = await getBrowser();
  const pages = await browser.pages();
  const firstPage = pages[0];

  ///todo remove this
  let blackListDomain = BlackList();
  let whiteListDomain = Whitelist();

  async function SyncDbs() {
    let tmp_lenght_black = blackListDomain.getall().length;
    if (tmp_lenght_black == 0 && tmp_lenght_black < 3) {
      blackListDomain.add({
        dominio: "www.facebook.com",
        redirect: "localhost:3000/msg",
        active: 1,
      });
      blackListDomain.add({
        dominio: "www.xvideos.com",
        redirect: "localhost:3000/msg",
        active: 1,
      });
      blackListDomain.add({
        dominio: "xvideos.com",
        redirect: "localhost:3000/msg",
        active: 1,
      });
      blackListDomain.add({
        dominio: "xvideos.com",
        redirect: "localhost:3000/msg",
        active: 1,
      });
    }
    let tmp_lenght_white = whiteListDomain.getall().length;
    if (tmp_lenght_white == 0 && tmp_lenght_white < 3) {
      whiteListDomain.add({
        dominio: "chatgpt.com",
        redirect: "default",
        active: 1,
      });
    }
  }
  await SyncDbs();
  await browser.on("targetcreated", async (target) => {
    console.log("tab creada");
    if (target.type() === "page") {
      let tab = await target.page();
      await tab.evaluateOnNewDocument(Scripts);

      //funcion del log
      await tab.exposeFunction("log", async (datos) => {
        console.log(datos);
      });
      //sync view and db
      await tab.exposeFunction("update_html", async () => {
        let tmp = blackListDomain.getall();
        await tab.evaluate(async (data) => {
          let listado_dom = document.getElementById("listado_dominios");
          listado_dom.innerHTML = "";
          function target(contenido) {
            //copy base item
            let item_li_Base = document.getElementById("item_list");
            let item_li = item_li_Base.cloneNode(true);
            console.log(contenido);
            //set target info
            item_li.querySelector(
              'p[name="numero_id"]'
            ).textContent = `RefId: ${contenido.id}`;
            item_li.querySelector('p[name="url"]').textContent =
              contenido.dominio;
            item_li.querySelector(
              'p[name="activo"]'
            ).textContent = `Estado: ${contenido.active}`;
            item_li.querySelector('p[name="redirecion"]').textContent =
              contenido.redirect;
            return item_li;
          }
          for (const el of data) {
            listado_dom.appendChild(target(el));
          }
        }, tmp);
      });

      await tab.on("load", async () => {
        console.log("--------navigate payload-----------");
        //validamos que la pagina no sea una de las white para no precargar scripts
        console.log("data");
        console.log(tab.url());
        let contain = whiteListDomain.LookByDomain(tab.url());
        console.log("-----------------");
        console.log(contain);
        console.log("-----------------");

        if (contain == undefined) {
          await Listener(tab);
        }
      });
      await tab.on("request", async (request) => { 
        if (request.url != undefined) {
          let contain = blackListDomain.LookByDomain(request.url());
          if (contain != undefined) {
            console.log(request.url())
            if (contain.active == 1) {
              try {
                console.log("aplica");
                if (contain.redirect.includes("localhost:3000")) {
                  await tab.goto(`http://${contain.redirect}`);
                } else {
                  await tab.goto(`https://${contain.redirect}`);
                }
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

  //await page.setRequestInterception(true);
  app.get("/msg", (req, res) => {
    let listado = [
      "Cada minuto que pierdes procrastinando es dinero que dejas de ganar.",
      "El tiempo no se repone; el dinero sí, pero solo si actúas a tiempo.",
      "Procrastinar es regalarle tu futuro al vacío.",
      "Mientras tú dudas, alguien más ya está ganando dinero con esa misma idea.",
      "No es que no tengas tiempo, es que estás gastándolo sin darte cuenta.",
      "El reloj no se detiene por tu falta de motivación.",
      "El tiempo es un recurso más valioso que el dinero: no lo puedes ahorrar ni recuperar.",
      "Dejarlo para mañana es dejar pasar una oportunidad hoy.",
      "Procrastinar es el lujo que los exitosos no se permiten.",
      "El tiempo que pierdes hoy se reflejará en el dinero que no tendrás mañana.",
      "Si valoras tu dinero, empieza por valorar tu tiempo.",
      "Cada excusa es una inversión negativa en tu futuro financiero.",
      "Las metas no se cumplen solas: cada minuto cuenta.",
      "Procrastinar es como tirar billetes por la ventana del tiempo.",
      "No hacer nada también cuesta: cuesta tiempo, cuesta dinero y cuesta sueños.",
      "El que espera el momento perfecto, pierde todos los momentos valiosos.",
      "Invertir tu tiempo sabiamente es el primer paso para multiplicar tu dinero.",
      "No es que no tengas oportunidades, es que las estás dejando pasar mientras procrastinas.",
      "Hoy es el único día que puedes usar para construir tu riqueza.",
      "El tiempo perdido es la factura más cara que pagarás.",
    ];
    let msg = Math.floor(Math.random() * (listado.length - 0)) + 0;
    res.send(`<h1>${listado[msg]}</h1>`);
  });

  app.listen(3000, async () => {
    console.log("expres cargado y redirigiendo");
    await firstPage.goto("https://www.google.com");
  });
}
Main();

//test();
//sub panel mach plugins an create and add excepcions like a custom inspector
//set opcions from panel like url redireccion, add ulrs to black list
//add a pay coin <- need a coin if you want t o navigate
//alert for dowloads and try to visit adult page
//add function to allow access for a time period,
