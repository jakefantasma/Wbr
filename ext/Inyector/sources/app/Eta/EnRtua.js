/*var x = document.getElementsByClassName("toaGantt-tl toaGantt-tl-elId53");
var y = document.getElementsByClassName("toaGantt-queue toaGantt-queue-start");
var TecActi = [];
var Tec = [];
var Ruta = [];
var SinRuta  = 0;
if(x.length > -1){
    //Tec
    for(var i=0; i < x.length; i++){
        if( x[i].style.left != ""){
            Tec.push(x[i].innerText);         
        }
    }
    //Ruta 
    for(var i=0; i < x.length; i++){
        if( x[i].style.left == "" && x[i].children.length > 0){         
            var rut =   x[i];  
            rut = rut.getElementsByClassName("toaGantt-tb");
            var tmplist = [];
            for(var j=0; j < rut.length; j++){
                var gestion = rut[j].innerText;
                if(gestion.length >0 && !gestion.includes("Tiempo de almuerzo" )&& !gestion.includes("Ingreso de ")  ){
                    tmplist.push(gestion);
                }
            }
        }
    }
    for(var i=0; i < Ruta.length; i++){
        if(Ruta[i].length < 1 ){
            console.log(Ruta[i]);
            SinRuta++;
        }
    }
    //TecActi
    for(var i=0; i < y.length; i++){
        var p = parseInt(y[i].style.left.replace("px", ""), 10);
        if (p > -1){
            TecActi.push(y[i].innerText);         
        }
    }
    console.log("Tecnicos: "+Tec.length);
    console.log("Total conectados: "+TecActi.length);
    console.log("Gestiones en ruta: "+Ruta.length);
    console.log("Sin ruta: "+SinRuta);
}*/