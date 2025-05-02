//variables globales
var registro = [];
var developer = true;
//funcion log
function log(msg) {
  if (developer) {
    console.log(msg);
  }
}
//wait in web
function sleep(milliseconds) {
  let timeStart = new Date().getTime();
  while (true) {
    let elapsedTime = new Date().getTime() - timeStart;
    if (elapsedTime > milliseconds) {
      break;
    }
  }
}

function CreateBr() {
  var _br = CreateWidget("br", {});
  return _br;
}
function CreateWidget(TipoWidget, opciones) {
  var elemento = document.createElement(TipoWidget);
  elemento = aplicarAjustes(elemento, opciones);
  return elemento;
}
function setAtt(elemento, key, value) {
  if (value != null) {
    elemento.setAttribute(key, value);
  }
  return elemento;
}
function setSt(elemento, style) {
  if (style != null) {
    //elemento.setAttribute(key, value);'
    //dimension's
    if ((style.height || null) != null) {
      elemento.style.height = style.height;
    }
    if ((style.width || null) != null) {
      elemento.style.width = style.width;
    }
    //pading
    if ((style.padingL || null) != null) {
      elemento.style.paddingLeft = style.padingL;
    }
    if ((style.padingR || null) != null) {
      elemento.style.paddingRight = style.padingR;
    }
    //margin
    if ((style.marginL || null) != null) {
      elemento.style.marginLeft = style.marginL;
    }
    if ((style.marginR || null) != null) {
      elemento.style.marginRight = style.marginR;
    }
  }
  return elemento;
}
function setCla(elemento, clas) {
  if (clas != null) {
    elemento.className = clas;
  }
  return elemento;
}
function setInnT(elemento, innerT) {
  if (innerT != null) {
    elemento.innerText = innerT;
  }
  return elemento;
}
function setName(elemento, name) {
  if (name != null) {
    elemento.name = name;
  }
  return elemento;
}
function serSrc(elemento, recurso) {
  if (recurso != null) {
    elemento.src = recurso;
  }
  return elemento;
}
function aplicarAjustes(elemento, opciones) {
  elemento = setAtt(elemento, "id", opciones.id || null);
  elemento = setAtt(elemento, "type", opciones.type || null);
  elemento = setAtt(elemento, "value", opciones.value || null);
  elemento = setAtt(elemento, "name", opciones.no || null);
  elemento = setCla(elemento, opciones.clas || null);
  elemento = setInnT(elemento, opciones.innerT || null);
  elemento = setSt(elemento, opciones.style || null);
  elemento = serSrc(elemento, opciones.src || null);
  if (opciones.onpress) {
    elemento.onclick = opciones.onpress;
  }
  return elemento;
}
const copyToClipboard = (str) => {
  const el = document.createElement("textarea");
  el.value = str;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

function getCookieByName(name) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [k, v] = el.split("=");
    cookie[k.trim()] = v;
  });
  return cookie[name];
}

//gestion de los datos internos
function getSetting(value) {
  const k = "Jf_setting_";
  const key = "Bitacora_05";
  return JSON.parse(localStorage.getItem(k + key)) || value;
}
function setSetting(value) {
  console.log("set: " + key);
  const key = "Bitacora_05";
  const k = "Jf_setting_";
  localStorage.setItem(k + key, JSON.stringify(value));
  return true;
}
