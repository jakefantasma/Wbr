function SetTecnico(elemento) {
  var controlador = CreateWidget("input", {
    type: "checkbox",
    style: {
      marginL: "5",
    },
  });
  controlador.onchange = function () {
    var nameTec = this.parentElement.textContent.replace(
      " Pulse para ver acciones ",
      ""
    );
    if (this.checked == true) {
      Add("ListTec", nameTec);
    } else {
      RemoveInDb("ListTec", nameTec);
    }
  };
  if (elemento.textContent.includes("Pulse para ver acciones ")) {
    if (elemento.children.length < 3) {
      elemento.prepend(controlador);
    }
  }
}
function UpdateTecList(config) {
  var r = [];
  var listaElementos = document.getElementsByClassName("toaGantt-tb");
  for (var i = 0; i < listaElementos.length; i++) {
    if (listaElementos[i].id != "") {
      SetTecnico(listaElementos[i]);
      var nameTec = listaElementos[i].textContent.replace(
        " Pulse para ver acciones ",
        ""
      );
      if (existInDb("ListTec", nameTec)) {
        listaElementos[i].children[0].checked = true;
        listaElementos[i].parentElement.style.backgroundColor =
          "#" + config.component.UpdateTecList.color;
      }
    }
  }
}
