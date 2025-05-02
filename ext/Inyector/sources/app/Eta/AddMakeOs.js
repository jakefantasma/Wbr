//example format
// { "Tipo":"LT", "Servicio":"30", "Nombre":"---", "Direccion":"----"}
//metopdo encargado de cargar los datos de json a eta

function SetSelectMakeOs() {
  //get data
  const datos = document.getElementById("in_json");
  const info = JSON.parse(datos.value);
  //document.getElementsByName("p[cname]")[0].document.getElementsByName("p[cname]")[0].value  = info.Tipo;
  document.getElementsByName("p[cname]")[0].value = info.Nombre; //nombre del cliente
  document.getElementsByName("p[208]")[0].value = info.Servicio;
  document.getElementsByName("p[215]")[0].value = info.Tipo;
  //numero de os //document.getElementsByName("p[appt_number]")[0].value  = info.Nombre;
  document.getElementsByName("p[230]")[0].value = info.Direccion;
  document.getElementsByName("p[appt_number]")[0].value = info.Numero;
  document.getElementsByName("p[166]")[0].value = info.Etapa;
  datos.value = "";
}
/*verifica si  puede agregar el panel para carga por json*/
function AddMakeOs() {
  const result = {
    error: "",
  };
  var Cambiar = CreateWidget("input", {
    value: "Set",
    id: "btn_Cargar",
    type: "button",
    onpress: (ev) => {
      const in_json = document.getElementById("in_json");
      const datos_crear = JSON.parse(in_json.value);
      HandlerSetData(datos_crear);
      ev.target.disabled = true;
    },
    style: {
      marginL: "5",
    },
  });
  var in_json = CreateWidget("input", {
    id: "in_json",
    type: "text",
    style: {
      marginL: "5",
    },
  });
  //handler to se activity
  function HandlerSetData(datos_crear) {
    let tipo = document.getElementsByClassName("form-item")[4];
    tipo.value = datos_crear.tipo;
    sleep(500);
    tipo.dispatchEvent(new Event("change", { bubbles: true }));
    let nombre = document.getElementsByClassName("form-item")[2];
    nombre.value = datos_crear.nombre;
    let orden = document.getElementsByClassName("form-item")[3];
    orden.value = datos_crear.orden;
    let duracion = document.getElementsByClassName("form-item")[4];
    duracion.value = datos_crear.duracion;
    let subTipo = document.getElementsByClassName("form-item")[9];
    subTipo.value = datos_crear.subTipo;
    sleep(500);
    subTipo.dispatchEvent(new Event("change", { bubbles: true }));
    let name_proyecto = document.getElementsByClassName("form-item")[10];
    name_proyecto.value = datos_crear.name_proyecto;
    let memo = document.getElementsByTagName("textarea")[0];
    memo.value = datos_crear.memo;
  }
  const layoutAddActiviti = document.getElementById("display-layout");
  result.error = layoutAddActiviti == null ? "Ruta incorrecta" : "";
  if (result.error == "" && document.getElementById("btn_Cargar") == null) {
    document.getElementById("screen-title").appendChild(Cambiar);
    document.getElementById("screen-title").appendChild(in_json);
  }
  return result;
}
