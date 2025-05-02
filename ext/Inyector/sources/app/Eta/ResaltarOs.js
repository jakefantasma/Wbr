/*Metodo encargado de actualizar la vista y pintara de otro 
colora las contenidas en la lista*/
function ResaltarOs() {
  var res = [];
  //var listaElementos = document.getElementsByClassName("toaGantt-tb");
  var listaElementos = document.getElementsByClassName("toaGantt-tb-travel");
  //obtenemos
  for (var i = 0; i < listaElementos.length; i++) {
    var value = listaElementos[i].parentElement.innerText;
    //console.log(listaElementos[i].parentElement.innerText)
    var item = listaElementos[i].parentElement;
    if (value.includes("PISATK") || value.includes("PISAOS") ||value.includes("Instalación de servicio GT")  ) {
      value = value.replace("PISATK", "").replace("PISAOS", "").substring(0, 8);
      if (existInDb("timbradas", value)) {
        SetViewTimbrada(item, value);
        //res.push({});
      }else{
        //res.push();
      }
    }
  }
  return { ResaltarOs: res };
}
//metodo que cambia los colores del item <orden>
function SetViewTimbrada(Item) {
  //estado del item actual
  var item_color = Item.style.backgroundColor;
  //colores pre establecidos
  var EnRuta = [
    "rgb(204, 255, 0)", //VerdeClaro
    "rgb(255, 222, 0)", //amarillo
    "rgb(255, 170, 170)", //Rosado
  ];
  var Completada = [
    "rgb(121, 182, 235)", //Azul
    "#CCCCCC", //Gris
    "rgb(204, 204, 204)", //?
  ];
  var Suspendida = [
    "rgb(153, 255, 255)", //Celeste
  ];
  var Iniciada = [
    "rgb(93, 190, 63)", //Verde
  ];
  //si cliente contesto <- sera verde claro <-
  var BordeTimbradaTimbrada = "rgb(0, 0, 0)"; //negro
  var TimbradaLetra_1 = "rgb(97, 97, 97)"; //gris
  var TimbradaLetra_2 = "rgb(255, 255, 255)"; //blanca
  //dependiendo del estado
  var TimbradaEnRuta = "rgb(133, 193, 255)"; //negro
  var TimbradaCompletada = "rgb(255, 255, 255)"; //blanco
  var TimbradaIniciada = "rgb(0, 214, 16)"; //verde
  //dependiendo del color
  if (Completada.includes(item_color)) {
    Item.style.borderColor = BordeTimbradaTimbrada; //borde negro
    Item.style.background = TimbradaCompletada; //fondo blanco
    Item.style.color = TimbradaLetra_1; //letra negra
  } else if (Iniciada.includes(item_color)) {
    Item.style.borderColor = BordeTimbradaTimbrada; //borde negro
    Item.style.background = TimbradaIniciada; //fondo blanco
    Item.style.color = TimbradaLetra_1; //letra negra
  } else if (EnRuta.includes(item_color)) {
    Item.style.borderColor = BordeTimbradaTimbrada; //borde negro
    Item.style.color = TimbradaLetra_1; //letra negra
    Item.style.background = TimbradaEnRuta; //fondo blanco
  } else if (Suspendida.includes(item_color)) {
    Item.style.borderColor = BordeTimbradaTimbrada; //borde negro
    Item.style.color = TimbradaLetra_1; //letra negra
  }
}
