class Ponto {
    #x;
    #y;
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }


const ponto1 = new Ponto(3, 5);
console.log(ponto1.x); // Saída: 3
console.log(ponto1.y); // Saída: 5

const ponto2 = new Ponto(-2, 7);
console.log(ponto2.x); // Saída: -2
console.log(ponto2.y); // Saída: 7
