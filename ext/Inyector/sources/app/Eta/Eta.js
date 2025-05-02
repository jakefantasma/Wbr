const def_config = {
  master: {
    startComponents: 2000,
    updateComponentes: 1500,
  },
  component: {
    UpdateTecList: {
      color: "810000",
      other: "test",
    },
    SetEtaTem: {
      color: "ce1212",
    },
    SetTarjetasChat: {
      sizeArea: "150px",
      shortChats: [
        {
          valor: "Inicio",
          texto:
            "Buenos dias compañero el dia de hoy yo sere tu seguimiento porfavor tomar en cuenta que las consultas realizadas antes de las 8 no seran atendidas por chat, nivel 1 esta apoyando en suspender ordenes desde las 7",
          Modo: "set",
        },
        { valor: "👍", texto: "👍", Modo: "add" },
        { valor: "👌", texto: "👌", Modo: "add" },
        { valor: "😅", texto: "😅", Modo: "add" },
        {
          valor: "No contesta",
          texto: "Cliente no contesta en las referencias",
          Modo: "set",
        },
        {
          valor: "Comando Enviado",
          texto:
            "Comando enviado dale unos minutos, me avisas sino llega la señal ",
          Modo: "set",
        },
        {
          valor: "Fuera de tiempo",
          texto:
            "Compañero verifica mensajes anteriores me encuentro en tiempo de almuerzo, llama al segmento porfavor",
          Modo: "set",
        },
        {
          valor: "En llamada",
          texto: "Un momento porfavor estoy en llamada",
          Modo: "set",
        },
      ],
    },
  },
};
function Eta() {
  while (true) {
    log("Bitacora is running !");
    var config = getSetting(def_config);
    var data_result = {
      panel: "",
      reslatado_ordenes: "",
      setTarget: "",
      setBgThem: "",
      setThemListTecs: "",
    };
    sleep(config.master.startComponents); //timpo de espera antes de ejecutar los scrips
    //if (document.getElementsByClassName("user-name").length == 1) {
      log("---------------------------");
      data_result.panel = AddPAnel(config);
      data_result.reslatado_ordenes = ResaltarOs();
      data_result.setTarget = SetTarjetas();
      data_result.setBgThem = SetEtaTem(config);
      data_result.setThemListTecs = UpdateTecList(config); //don't return data need update
      log(data_result);
      log(AddMakeOs());
      log("---------------------------");
      SetTarjetasChat(config);
      sleep(config.master.updateComponentes); //tiempo de refrescamiento
      //TODO es necesario segmentar los datos por carpetas y por vistas a modificar
      //de esta manera no se realizarian tantas conusltas y mejorariamos el preformece
      //AddMakeOs();
      //GetMateriales();
      //SetTarjetaSuspendida();
      //EnRtua();
      //content-manage-container
      //collaboration-pined-container
    }
  //}
}
