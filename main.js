/////////////////////////PRIMER ALGORITMO/////////////////////////////////////
alert("Especifique su edad para poder pasar al boliche");
let respuesta = parseInt(prompt("ingrese su edad:"));
if (respuesta >=18 && respuesta <=50){
  alert("Podes ingresar");
}
else if(respuesta>50){
  alert("No puede ingresar porque es muy mayor");
}
else{
alert("No podes ingresar");
}

//////////////////////////////////////SEGUNDO ALGORITMO///////////////////////////////////////////////////

alert ("AHORA PASEMOS AL SEGUNDO ALGORITMO");
alert("Adiviná el número que se encuentra del 1 al 10");
let res = parseInt(prompt("Ingrese un número del 1 al 10"));
while(res != 8){
  alert("intentá de nuevo");
  res = parseInt(prompt("ingrese otro número"));
}
alert("GANASTE!!!");

///////////////////////////////TERCER Y ÚLTIMO ALGORITMO/////////////////////////////////////
alert("Para salir, solo escriba la palabra SALIR");
alert("Para salir, solo escriba la palabra SALIR");
let entrada = prompt("Ingresar un nombre");
while (entrada != "SALIR") {
  switch (entrada) {
    case `${entrada}`:
      alert("Hola!!! "+`${entrada}`);
      break;
    default:
      alert("¿Nombre?");
      break;
  }
  entrada = prompt("Ingresar un nombre");
}