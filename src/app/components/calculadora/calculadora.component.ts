import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

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
      num1: [""],
      num2: [""],
      operacao: [""],
      resultado: [""]
    });
  }

  calcular() {
    let { num1, num2, operacao, resultado } = this.formCalculo.controls

    switch (operacao.value) {
      case "+":
        resultado = (num1.value + num2.value);
        break;
      case "-":
        resultado = (num1.value - num2.value);
        break;
      case "/":
        resultado = (num1.value / num2.value);
        break;
      case "*":
        resultado = (num1.value * num2.value);
        break;

      default:
        console.log("Operação invalida")
        break;
    }
  }

  getCalculos(){
    this.calculosService.getCalculos()
    .subscribe( res => {
      this.calculosService.calculos = res as Calculadora[];
    })
  }


  ngOnInit() {
    this.createForm();
    this.getCalculos();
  }

}
