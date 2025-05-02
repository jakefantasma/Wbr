function SetTarjetas() {
  var res = [];
  var tarjeta = document.getElementsByClassName("activityDetails");
  if (tarjeta.length == 1) {
    if (document.getElementById("set_tarjet") == null) {
      tarjeta[0].children[0].innerText.includes("Orden de ");
      if (tarjeta[0].children[0].innerText.includes("Orden de ")) {
        //alert("0000000000000");
        AddControladorTarjeta(tarjeta[0].children[0].children[1]);
        res.push({ status: "ok", msg: "Find target" });
      } else {
        //alert("no agregamos controlador ");
        res.push({ status: "error", msg: "no contain value " });
      }
    } else {
      res.push({ status: "ok", msg: "controller already exist " });
    }
  } else {
    res.push({ status: "error", msg: "No show in view " });
  }
  return { SetTarjetas: res };
}
function AddControladorTarjeta(elemento) {
  var res = [];
  res.push({ status: "ok", msg: "Creando controlador " });
  var n = elemento.innerText
    .replace("Orden de Trabajo:", "")
    .replace(/\u00a0/g, "")
    .substring(0, 8);
  var Copiar = CreateWidget("input", {
    value: "Copiar",
    type: "button",
    style: {
      marginL: "5",
    },
  });
  Copiar.onclick = function () {
    var n = elemento.innerText
      .replace("PISAOS", "")
      .replace("PISATK", "")
      .replace(/\u00a0/g, "")
      .substring(0, 8);
    copyToClipboard(n);
    this.disabled = true;
  };
  var Confirmada = CreateWidget("input", {
    value: "Confirmada",
    type: "button",
    style: {
      marginL: "5px",
    },
  });
  Confirmada.onclick = function () {
    var n = elemento.innerText
      .replace("PISAOS", "")
      .replace("PISATK", "")
      .replace(/\u00a0/g, "")
      .substring(0, 8);
    copyToClipboard(n);
    Add("timbradas", n);
  };
  var Remover = CreateWidget("input", {
    value: "Remover",
    type: "button",
    style: {
      marginL: "5px",
    },
  });
  Remover.onclick = function () {
    var n = elemento.innerText
      .replace("PISAOS", "")
      .replace("PISATK", "")
      .replace(/\u00a0/g, "")
      .substring(0, 8);
    RemoveInDb("timbradas", n);
  };
  if (existInDb("timbradas", n)) {
    Confirmada = setAtt(Confirmada, "disabled", true);
  }
  var NoContesta = CreateWidget("input", {
    value: "No contesta",
    type: "button",
    style: {
      marginL: "5px",
    },
  });
  var div = CreateWidget("div", {
    id: "set_tarjet",
    style: {
      marginL: "5px",
    },
  });
  div.appendChild(Copiar);
  div.appendChild(Confirmada);
  div.appendChild(Remover);
  elemento.appendChild(div);
  return res;
}
