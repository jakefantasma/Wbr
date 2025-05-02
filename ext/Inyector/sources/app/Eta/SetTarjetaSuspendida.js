function SetTarjetaSuspendida(){
    var tarjeta = document.getElementsByClassName("CG jet-css-only");
    if(tarjeta.length !=0 ){
        //obtenemos el segmento correcto 
        tarjeta = tarjeta[0];
        //cambiamos la pocicion del bloque 
        tarjeta.style.top = "120px"
        var contenedor = tarjeta.getElementsByClassName("CGcontent")[0];
        contenedor.style.maxWidth ="600px"
        var textdato = document.getElementsByName("p[6]")[0];
        textdato.style.width = "500px"
        textdato.style.height = "200px"
        //convertimos la lista en un list de check box 
        var select_list = document.getElementsByName("p[306]")[0];
        if (select_list.style.display != "none" && document.getElementById("slected_items") == null){
            var valor_set = select_list.value;
            var division = CreateWidget("div", {
                id:"slected_items", 
            });    
            division.appendChild(CreateBr());    
            //select_list.style.display = "none"
            for(var p = 1; p <= select_list.options.length-1; p++){
                //creamos un objeto para agregar a la lista 
                var item = select_list.options[p];
                var _id = p+"_select"; 
                var option = CreateWidget("input", 
                    {
                        value:item.value, 
                        id:_id, 
                        type:"radio", 
                        no: "motivo_sus",
                        style:{
                            marginL:"5",
                        }
                    }
                );       
                var info = CreateWidget("label", 
                    {
                       value:'', 
                        type:"radio", 
                        style:{
                            marginL:"5",
                        }
                    }
                );  
                option.onclick = function(){
                    var select_list = document.getElementsByName("p[306]")[0];
                    select_list.value = this.value; 
                    //alert(this.value);
                }
                info.innerHTML =item.text;
                info.htmlFor  =_id;
                if(valor_set == item.value){
                    option.checked = true;
                }
                division.appendChild(option);    
                division.appendChild(info);    
                division.appendChild(CreateBr());    
            }
            select_list.parentElement.appendChild(division);    
        };
   }
}