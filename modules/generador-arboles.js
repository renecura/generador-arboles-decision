const DP = 'punto_decision';
const EV = 'evento';
const VAL = 'valor';


function generar_punto_decision(options) {
  const result = {
    type: DP,
    min_value: undefined,
    max_value: undefined,
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

function generar_opcion(options, p) {
  return (Math.random() < p) ? generar_evento(options) : generar_punto_decision(options);
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
        options.splice(0, randRange(2, Math.min(options.length, max_options))),
        options.length * 2 / n_options
      )
    );
  }

  const rs = resolver(options[0]); 

  console.log(rs);

  return rs;
}

function resolver(tree) {

  // Cacula el value de todos los hijos.
  if(tree.children)
    tree.children = tree.children.map(resolver);
  
  switch (tree.type) {
    case EV: 
      tree.value = tree.children.reduce((acc, x) => acc + x.probability * x.value,0);
      break;
    case DP: 
      tree.max_value = Math.max(...tree.children.map(x => x.value? x.value : x.max_value)); 
      tree.min_value = Math.min(...tree.children.map(x => x.value? x.value : x.min_value));
      break;
  }

  //tree.value = Math.round(tree.value * 100) / 100.0;

  // Retorna el valor esperado del árbol.
  return tree;
}


export { generar, resolver }
