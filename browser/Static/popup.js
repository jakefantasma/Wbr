const fs = require("fs");
const path = require("path");
const popup_html_routfile = path.join(
  path.dirname(__dirname),
  "Static",
  "popup.html"
);
const popup_html = fs.readFileSync(popup_html_routfile, "utf-8");

async function Scripts() {
  //global methods
  let queso = 20;
  window.InsertHtmlPanel = (e) => {
    //window.log(e.id);
    window.log("queso");
  };
  window  .__InsertHtml = async (obj) => {
    let state_panel = document.getElementById("____ider");
    if (state_panel == null) {
      document.body.innerHTML += obj.popup_html;
    } else {
      if (state_panel.style.display == "") {
        state_panel.style.display = "none";
      } else {
        state_panel.style.display = "";
      }
    }
  };
  //validate and set state of panel view
}

async function Listener(page) {
  await page.evaluate(
    async (obj) => {
      //method will add functions when when user key press
      document.addEventListener("keydown", async (e) => {
        if (e.repeat) return; //fix por si dejan teclas precionadas
        switch (e.key) {
          case "`":
            await window.__InsertHtml(obj);
            await window.update_html();
            break;
          default:
            window.log("no traqueada");
            break;
        }
      });
    },
    { popup_html: popup_html }
  );
}

module.exports = () => {
  return { Listener, Scripts };
};
