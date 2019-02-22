import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule } from '@angular/forms';


import { CalculadoraService } from '../services/calculadora.service';
import { Calculadora } from '../models/calculadora';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.css'],
  providers: [CalculadoraService]
})
export class CalculadoraComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private calculosService: CalculadoraService,
  ) { }

  calculos: any = [];

  @Input()
  formCalculo: FormGroup;

  createForm() {
    this.formCalculo = this.formBuilder.group({
      id: [""],
      valor1: [],
      valor2: [],
      operacao: [""],
      // resultado[]
    });
  }

  calcular() {
    let { valor1, valor2, operacao } = this.formCalculo.controls;
    let resultado;

    switch (operacao.value) {
      case "soma":
        resultado = (valor1.value + valor2.value);
        console.log(resultado);
        break;
      case "subtração":
        resultado = (valor1.value - valor2.value);
        console.log(resultado);
        break;
      case "divisão":
        resultado = (valor1.value / valor2.value);
        console.log(resultado);
        break;
      case "multiplicação":
        resultado = (valor1.value * valor2.value);
        console.log(resultado);
        break;

      default:
        console.log("Operação invalida")
        break;
    }

    this.salvarCalculo(this.formCalculo.value);
  }

  getCalculos() {
    this.calculosService.getCalculos()
      .subscribe(res => {
        this.calculosService.calculos = res as Calculadora[];
      })
  }

  salvarCalculo(form: Calculadora) {
    this.calculosService.postCalculo(form);
  }


  ngOnInit() {
    this.createForm();
    this.getCalculos();
  }

}
