import { Component, EventEmitter, Output, OnInit, AfterViewInit, Input, ViewChild } from '@angular/core';
import { FormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { Servei1Service } from '../servei1.service';
import { pairwise, startWith, delay } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var window: any;

@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.scss']
})
export class PanellComponent implements OnInit {

  @Output() formValue = new EventEmitter<any>()

  constructor(private servei: Servei1Service, private modal: NgbModal, private fb: FormBuilder) {
    let k = 0;
   }

  //Es crea form
  numbersForm: FormGroup = this.fb.group({
    number1: new FormControl(1, [this.minimumValueValidator]),
    number2: new FormControl(1, [this.minimumValueValidator])
  });

  minimumValueValidator(control: FormControl) {
    const value = control.value;
    return value >= 0 ? null : { minValue: true };
  }

  //Funcions per augmentar o reduir el valor dels number inputs en clicar botons "+" 7 "-"
  suma(fc: string) {
    this.numbersForm.get(fc).setValue(this.numbersForm.get(fc).value + 1);
  }

  resta(fc: string) {
    if (this.numbersForm.get(fc).value > 0) {
      this.numbersForm.get(fc).setValue(this.numbersForm.get(fc).value - 1);
    }
  }

  setValue1(num: number) {
    console.log(num);
    this.numbersForm.get("number1").setValue(num);
    console.log(this.numbersForm.get("number1").value);
  }

  setValue2(num: number) {
    this.numbersForm.get("number2").setValue(num); 
  }

  //@ViewChild('input') input;
  @Input() number1Init;
  @Input() number2Init;
  //Quan canvia valor d'input, s'envia nou valor a servei perquè recalculi el pressupost
  ngOnInit() {
    console.log("Comença OnInit");
    console.log(this.number1Init);
    console.log(this.number2Init);
    this.setValue1(this.number1Init);
    this.setValue2(this.number2Init);
    this.numbersForm.valueChanges.pipe(
      startWith(this.numbersForm.value),
      pairwise()
    ).subscribe(([previousValue, currentValue]) => {
      console.log("Comença subscribe");
      // this.servei.addProd(-previousValue.number1, previousValue.number2);
      // this.servei.addProd(currentValue.number1, currentValue.number2);
      //finalment, s'envia els nous valors al Parent (HomeComponent)
      this.funcioPare();
    });
    console.log("S'acaba OnInit");
  }

  //Funció per enviar els nous valors al Parent
  @Output() newItemEvent = new EventEmitter<string>;

  funcioPare() {
    this.newItemEvent.emit(this.numbersForm.value);
    console.log("pare");
  }


}
