import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormsModule, NgForm } from '@angular/forms';


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
      numero1: [],
      numero2: [],
      operacao: [],
      resultado: []
    });
  }

  calcular() {
    switch (this.formCalculo.value.operacao) {
      case "soma":
        this.formCalculo.value.resultado = (this.formCalculo.value.numero1 + this.formCalculo.value.numero2);
        break;
      case "subtração":
        this.formCalculo.value.resultado = (this.formCalculo.value.numero1 - this.formCalculo.value.numero2);
        break;
      case "divisão":
        this.formCalculo.value.resultado = (this.formCalculo.value.numero1 / this.formCalculo.value.numero2);
        break;
      case "multiplicação":
        this.formCalculo.value.resultado = (this.formCalculo.value.numero1 * this.formCalculo.value.numero2);
        break;

      default:
        console.log("Operação invalida")
        break;
    }

    this.salvarCalculo();
  }

  getCalculos() {
    this.calculosService.getCalculos()
      .subscribe(res => {
        this.calculosService.calculos = res as Calculadora[];
      })
  }

  salvarCalculo() {
    debugger
    this.calculosService.postCalculo(this.formCalculo.value);
    this.getCalculos();
    console.log(this.formCalculo.value)
  }


  ngOnInit() {
    this.createForm();
    this.getCalculos();
  }

}
