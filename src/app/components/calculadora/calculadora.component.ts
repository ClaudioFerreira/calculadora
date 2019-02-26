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
    let { numero1, numero2, operacao } = this.formCalculo.controls;
    let resultado: number;

    switch (operacao.value) {
      case "soma":
        resultado = (numero1.value + numero2.value);
        break;
      case "subtração":
        resultado = (numero1.value - numero2.value);
        break;
      case "divisão":
        resultado = (numero1.value / numero2.value);
        break;
      case "multiplicação":
        resultado = (numero1.value * numero2.value);
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

  salvarCalculo(form: NgForm) {
    this.calculosService.postCalculo(form.value);
    this.getCalculos();
    console.log(form)
  }


  ngOnInit() {
    this.createForm();
    this.getCalculos();
  }

}
