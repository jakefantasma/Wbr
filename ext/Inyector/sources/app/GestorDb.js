//obtiene los datos guardados en localstorage  y actualiza los datos en el script
function getDb(registro){
	var tmp_registro = localStorage[registro] || [];
	if (tmp_registro.length > 0) {
		tmp_registro = tmp_registro.split(",");
	}
	//developer = localStorage['developer'] || true;
	return tmp_registro;
}
function existDb(registro){
	var tmp = localStorage[registro] || 'vacio' ;
	if(tmp == 'vacio'){
		return false;
	}
	return true;
}
//solo aplica en arrays 
function existInDb(registro, key){
	var rtmp = localStorage[registro] || 'vacio' ;
	if(rtmp != 'vacio'){
		rtmp = rtmp.split(",");
		var index =  rtmp.indexOf(key);
		if(index > -1){
			return true;
		}
	}
	return false;
}
//elimina un el registro 
function RemoveInDb(registro, key){
	var rtmp = localStorage[registro] || 'vacio' ;
	if(rtmp != 'vacio'){
		rtmp = rtmp.split(",");
		var index =  rtmp.indexOf(key);
		 if(index > -1){
			rtmp.splice(index, 1);
			localStorage[registro] = rtmp;
			return true;
		 }
	}else{
		return "no existe en db";
	}
}
function Simpleget(registro){
	return localStorage[registro] || null;
}
function Simpleset(registro, clave){
	localStorage[registro] =  clave;
}
function Add(registro, clave){
	var tmp = getDb(registro);
	tmp.push(clave);
	localStorage[registro] =  tmp;
}
/**fix this opcion */
function BorrarRegistro(registro){
	var retVal = confirm("Eliminar todos los registros?");
	if( retVal == true ) {
		localStorage[registro] = [];
	}
}