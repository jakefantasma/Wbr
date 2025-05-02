/*metodo que agrega el boton del panel
TODO agregar control para los ajustes
*/
function controller_ResaltarOs() {
  var div = CreateWidget("div", { id: "controllerTimbrado" });
  var inputTimbrada = CreateWidget("input", {
    id: "num_timbrada",
    plc: "Timbrada",
    autocomplete: "off",
    type: "text",
    style: {
      width: "100px",
    },
  });
  var btn_AgregarTimbrada = CreateWidget("input", {
    id: "btn_buscar",
    type: "button",
    value: "Add",
    placeholder: "datos",
  });
  btn_AgregarTimbrada.onclick = function () {
    var numero_orden = document.getElementById("num_timbrada");
    if (numero_orden != null && numero_orden.value != "") {
      Add("timbradas", numero_orden.value);
      numero_orden.value = "";
    }
  };
  //boton borrar
  var btn_borrar = CreateWidget("input", {
    id: "btn_borrar",
    type: "button",
    value: "Borrar timbradas",
  });
  btn_borrar.onclick = function () {
    BorrarRegistro("timbradas");
    BorrarRegistro("ListTec");
  };
  div.appendChild(inputTimbrada);
  div.appendChild(btn_AgregarTimbrada);
  div.appendChild(btn_borrar);
  return div;
}
function controller_SetEtaTem(config) {
  var div = CreateWidget("div", { id: "controllerSetEtaTem" });
  //Color targets
  var sel_color_tg = CreateWidget("input", {
    id: "sel_color_tarjeta",
    type: "color",
    style: {
      width: "25px",
      height: "17px",
    },
  });
  sel_color_tg.onchange = function () {
    //is necesari a fix
    var tmp_config = config;
    tmp_config.component.SetEtaTem.color = this.value.replace("#", "");
    setSetting(tmp_config);
  };
  //Color backgroundColor
  var sel_color_bg = CreateWidget("input", {
    id: "sel_color",
    type: "color",
    style: {
      width: "25px",
      height: "17px",
    },
  });
  sel_color_bg.onchange = function () {
    //is necesari a fix
    var tmp_config = config;
    tmp_config.component.UpdateTecList.color = this.value.replace("#", "");
    setSetting(tmp_config);
  };
  div.appendChild(sel_color_tg);
  div.appendChild(sel_color_bg);
  return div;
}
function AddPAnel(config) {
  var res = [];
  if (document.getElementById("divMaster") == null) {
    var divp = CreateWidget("div", { id: "divMaster" });
    document.getElementsByClassName("middle-part")[0].appendChild(divp);
    sleep(1000 * 2);
    var divMaster = document.getElementById("divMaster");
    sleep(1000 * 2);
    divMaster.appendChild(controller_ResaltarOs());
    divMaster.appendChild(controller_SetEtaTem(config));
    //divMaster.appendChild(sel_color_bg);
    res.push({ status: "create", msg: "Build panel" });
  } else {
    res.push({ status: "exist", msg: "already exist Panel" });
  }
  return { Add_Panel: res };
} 
//TODO es necesario segmentar