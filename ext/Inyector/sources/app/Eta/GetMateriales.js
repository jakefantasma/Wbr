function extractData(){
    var blacklist = [
        "G810",
        "B000",
        "NA1730",
        "KAON",
        "NAGRAVISION",
        "A000",
        "B004",
        "Baja por traslado",
        "NL 5101",
        "NWLP02",
        "NYX",
        "H000",
        "HUAWEI",
        "NEWLAND",
        "NL-5101",

        "-",
        "Equipo Obsoleto"
    ]
    var datos = [];
    var tmp = [];
    var lista = document.getElementsByClassName("install");
    for(var i=0; i < lista.length; i++){
        var elemento = lista[i];
        if(elemento.innerText.includes("instalado")){
            if(tmp.length!=0){datos.push("["+tmp+"]");}
            tmp = [];
        }else{
            if(!blacklist.includes(elemento.innerText)){
                tmp.push('"'+elemento.innerText+'"');
            }
        }
    }
    var tmp = "";
    for(var i=0; i< datos.length; i++){
        tmp=tmp+datos[i]+"\n";
    }
    //datos en json 
    //
    //var x = JSON.parse("["+datos+"]")
    //alert(x);
    //
    copyToClipboard(tmp);

}
function GetMateriales(){
    var ventana = document.getElementsByClassName("fb fb-panel CGtabContent");
    if(ventana.length > 0){
        var lista = document.getElementsByClassName("install");
        if(lista.length > 0){
	        var down =document.getElementsByClassName("fb fb-panel CGtabButtons")[0];
            if(down.children.length  < 3){
                var btn_extract = CreateWidget(
                    "input", {
                        id:"btn_extract", 
                        type:"button", 
                        value:"Copy",
                    }
                );
                btn_extract.onclick =  function(){
                    extractData();
                };
		        down.appendChild(btn_extract);
            }
        }
    }   
}