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

  postCalculo(Calculo: Calculadora) {

    return this.http.post(this.URL_POST, Calculo)
      .subscribe(res => {
        console.log(res);
      });

  }

}
