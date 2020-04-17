const DP = 'punto_decision';
const EV = 'evento';
const VAL = 'valor';


function generar_punto_decision(options) {
  const result = {
    type: DP,
    value: undefined,
    children: options
  };

  return result;
}

function generar_evento(options) {

  const result = {
    type: EV,
    value: undefined,
    children: []
  };

  let tp = 20;
  let count = options.length;
  for (let op of options) {
    let p = (--count > 0)? randRange(1,tp-count): tp;
    tp -= p;

    op.probability = p / 20;
    
    result.children.push(op);
  }

  return result;
}

function generar_opcion(options) {
  return (Math.random() > 0.5) ? generar_evento(options) : generar_punto_decision(options);
}


function generar_valor() {
  return {
    type: VAL,
    value: randRange(-500, 500)
  }
}


function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function generar(n_options = 12, max_options = 4) {

  let options = [];
  for (let i = 0; i < n_options; i++) {
    options.push(generar_valor());
  }

  while (options.length > 1) {
    options.push(
      generar_opcion(
        options.splice(0, randRange(2, Math.min(options.length, max_options)))
      )
    );
  }

  console.log(options);

  return options[0];
}

function resolver(tree) {

  // Hacer un recorrido en profundidad del arbol y calcular los valores.

  return tree;
}


export { generar }