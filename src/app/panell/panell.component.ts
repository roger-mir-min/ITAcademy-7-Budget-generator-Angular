import { Component, EventEmitter, Output, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-panell',
  templateUrl: './panell.component.html',
  styleUrls: ['./panell.component.scss']
})
export class PanellComponent implements OnInit {

  @ViewChild(ModalComponent) modal: ModalComponent;

  openWindow1() {
    this.modal.openWindow1();
  }
  
  openWindow2() {
    this.modal.openWindow2();
  }


  constructor(private fb: FormBuilder, private modalService: NgbModal) { }

  //Es crea form
  numbersForm: FormGroup = this.fb.group({
    number1: [1, [this.minimumValueValidator]],
    number2: [1, [this.minimumValueValidator]]
  });
  //funció de validació del form
  minimumValueValidator(control: FormControl) {
    const value = control.value;
    return value >= 1 ? null : { minValue: true };
  }

  //Funcions per augmentar o reduir el valor dels number inputs en clicar botons "+" i "-"
  suma(fc: string): void {
    this.numbersForm.get(fc).setValue(this.numbersForm.get(fc).value + 1);
  }

  resta(fc: string): void {
    if (this.numbersForm.get(fc).value > 0) {
      this.numbersForm.get(fc).setValue(this.numbersForm.get(fc).value - 1);
    }
  }

  //INPUT. S'estableix com a valors del form els valors rebuts des del component pare (a partir de l'url)
  //Valors rebuts via @Input:
  @Input() number1Init: number;
  @Input() number2Init: number;

  //Funcions que s'aplicaran als valors rebuts via @Input
  setValue1(num: number): void {
    this.numbersForm.get("number1").setValue(num);
  }

  setValue2(num: number): void {
    this.numbersForm.get("number2").setValue(num);
  }

  ngOnInit() {
    //S'activen les funcions per introduir al form els valors rebuts via @Input
    this.setValue1(this.number1Init);
    this.setValue2(this.number2Init);

    //OUTPUT. Quan canvien valors de form, s'envia el nou valor a HomeComponent
    this.numbersForm.valueChanges.subscribe(() => {
      this.funcioPare();
    });
  }

  @Output() newItemEvent = new EventEmitter<string>;

  funcioPare(): void {
    this.newItemEvent.emit(this.numbersForm.value);
  }


}
