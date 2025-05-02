function SetTarjetasChat(config) {
  var res = [];
  var Chatsize = config.component.SetTarjetasChat.sizeArea;
  var shortcuts_Data = config.component.SetTarjetasChat.shortChats;
  res.push({ set: "chat", msg: "Set size text area " });
  var chat = document.getElementById("community-msg-text");
  var view = document.getElementById("community-send-message-box");
  chat.setAttribute("style", "height:" + Chatsize);
  if (document.getElementById("Panel_textos_rapidos") == null) {
    res.push({ make_panel: "not exist", msg: "Create panel to chat" });
    var internal_panel = document.getElementById("community-send-message-field");
    internal_panel.style.height = Chatsize;
    AddPanelBotones(view, shortcuts_Data);
  }else{
    document.getElementById("Panel_textos_rapidos").remove()
    AddPanelBotones(view, shortcuts_Data);
  }
  res.push({ make_panel: "already existe panel", msg: "Create panel to chat" });
  return { SetTarjetasChat: res };
}

function AddPanelBotones(view, data) {
  var controlador_chats = CreateWidget("div", { id: "Panel_textos_rapidos"  });
  controlador_chats.style.display = "flex"
  controlador_chats.style.flexWrap  = "wrap" 
  controlador_chats.style.padding = "30px"
  data.forEach((d) => {
    controlador_chats.appendChild(BotonChat(d));
  });
  view.appendChild(controlador_chats);
}
function BotonChat(datos) {
  var Boton = CreateWidget("button", {
    innerT: datos.valor,
    no: datos.texto,
  });
  if (datos.Modo == "set") {
    Boton.onclick = function (ev) {
      var chat = document.getElementById("community-msg-text");
      chat.value = ev.target.name;
    };
  } else {
    Boton.onclick = function (ev) {
      var chat = document.getElementById("community-msg-text");
      chat.value = chat.value + ev.target.name;
    };
  }
  return Boton;
}
