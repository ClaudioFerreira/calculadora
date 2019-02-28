export class Calculadora {

    numero1: any;
    numero2: any;
    operacao: any;
    resultado: any;

    constructor(numero1 = 0, numero2 = 0, operacao = 0, resultado = 0) {

        this.numero1 = numero1;
        this.numero2 = numero2;
        this.operacao = operacao;
        this.resultado = resultado;
    }
}
