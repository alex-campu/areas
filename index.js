const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const formulas = {
  1: {
    label: "Triángulo",
    instruction: "Introduzca los 3 lados del triángulo de la forma '2, 3, 4': ",
    getArea: (sides) => {
      const heronFormula = (a, b, c) => {
        const s = (a + b + c) / 2;
        const area = s * (s - a) * (s - b) * (s - c);
        return Math.sqrt(area);
      };
      const [a, b, c] = sides;
      if (!a || !b || !c) return "Parametros incompletos";
      const area = heronFormula(parseInt(a), parseInt(b), parseInt(c));
      if (isNaN(area)) return "Parametros incorrectos";
      return `El área del triángulo introducido es: ${area.toFixed(2)}`;
    },
  },
  2: {
    label: "Rectángulo",
    instruction:
      "Introduzca la base y la altura del rectángulo de la forma '2, 3': ",
    getArea: (sides) => {
      const [a, b] = sides;
      const area = a * b;
      if (isNaN(area)) return "Parametros incorrectos";
      return `El área del rectángulo introducido es: ${area.toFixed(2)}`;
    },
  },
  3: {
    label: "Cuadrado",
    instruction: "Introduzca la medida de un lado del cuadrado: ",
    getArea: (sides) => {
      const [a] = sides;
      const area = a * a;
      if (isNaN(area)) return "Parametros incorrectos";
      return `El área del cuadrado introducido es: ${area.toFixed(2)}`;
    },
  },
  4: {
    label: "Circulo",
    instruction: "Introduzca el diámetro del circulo: ",
    getArea: (sides) => {
      const [d] = sides;
      const radio = d / 2;
      const area = Math.PI * (radio * radio);
      if (isNaN(area)) return "Parametros incorrectos";
      return `El área del circulo introducido es: ${area.toFixed(2)}`;
    },
  },
  5: {
    label: "Salir",
  },
};

const getInstructions = (inputNum) => {
  rl.question(formulas[inputNum].instruction, (sides) => {
    const removeSpaces = sides.replace(/\s/g, "");
    const parameters = removeSpaces?.split(",");

    const isValidInput = parameters.every((item) => !isNaN(item));
    if (!isValidInput) {
      console.log("El valor introducido no es correcto");
      getInstructions(inputNum);
    }

    console.log(formulas[inputNum].getArea(parameters));

    initAreasApp();
  });
};

const initAreasApp = () => {
  for (let num in formulas) {
    console.log(`${num}: ${formulas[num].label}`);
  }
  rl.question("Elija una figura entre las anteriores: ", (input) => {
    const inputNum = parseInt(input);

    if (inputNum === 5) {
      rl.close();
    }

    if (isNaN(inputNum) || inputNum > 5 || inputNum < 1) {
      console.log("Por favor introduzca un numero entre 1 y 5");

      initAreasApp();
    } else {
      getInstructions(inputNum);

      initAreasApp();
    }
  });
};

initAreasApp();
