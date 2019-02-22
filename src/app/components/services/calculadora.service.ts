import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { Calculadora } from '../models/calculadora';

@Injectable({
  providedIn: 'root'
})
export class CalculadoraService {

  calculoSelecionado: Calculadora;
  calculos: Calculadora[];

  readonly URL_GET = 'https://sistema.uniso.br/rest/api/calculador/get';
  readonly URL_POST = 'https://sistema.uniso.br/rest/api/calculador/salvar';

  constructor(private http: HttpClient) {
    this.calculoSelecionado = new Calculadora();
  }

  getCalculos() {
    return this.http.get(this.URL_GET);
  }

  postCalculo(Calculo: Calculadora){
    console.log("Enviar")
    return this.http.post(this.URL_POST, Calculo);
    console.log("Enviado")
  }

  // postCalculo(form) {

  //   let body{
  //     valor1: form.value.valor1,
  //     valor2: form.value.valor2,
  //     operacao: form.value.operacao,
  //     resultado: form.value.resultado
  //   }

  //   return....post(body)
  // }
}
