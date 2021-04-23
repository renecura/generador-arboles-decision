import { generar } from "./modules/generador-arboles.js";
import { dibujarArbol } from "./modules/dibujar-arbol.js";

console.log("Hello world!");

function ejemplo() {
  const a = generar(12,3);
  console.log(a);
  document.getElementById('response').innerHTML = JSON.stringify(a);

  //dibujarArbol(a);
}

document.getElementById('btn-generar').addEventListener('click', ejemplo);