import { Component, OnInit, ViewChild } from '@angular/core';
import { Servei1Service } from '../servei1.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PressupostListComponent } from '../pressupost-list/pressupost-list.component';
import { Subscription } from 'rxjs';
import { Pressupost } from '../Interfaces';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  Press: number = 0; // pressupost total imprès al view

  subscription: Subscription; //la subscripció a queryParams, que en acabar destruïrem
  subscription2: Subscription; //la subscripció a valueChanges, que en acabar destruïrem

  //Propietats que passarem a Panell Component via property binding
  number1Init: number;
  number2Init: number;

  @ViewChild(PressupostListComponent) pres: PressupostListComponent; //Servirà per activar mètode de PressupostListComponent

  constructor(private servei: Servei1Service, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  //Es crea form
  initialForm: FormGroup;

  //Funció de validació dels inputs
  requiredValidator(control: FormControl) {
    const value = control.value;
    return value == null ? true : { minValue: true };
  }


  ngOnInit() {
    //S'inicialitza form
    this.initialForm = this.fb.group({
      inputNom: ["", Validators.required],
      inputPre: ["", Validators.required],
      checkbox1: [false],
      checkbox2: [false],
      checkbox3: [false],
      numbersForm: this.fb.group({
        number1: 1,
        number2: 1
      })
    });

    //S'estableix subscripció a queryParams: quan canvien, el form també, i es recalcula pressupost
    this.subscription = this.route.queryParams.subscribe(params => {
      this.initialForm.patchValue({
        checkbox1: params["checkbox1"] === 'true',
        checkbox2: params["checkbox2"] === 'true',
        checkbox3: params["checkbox3"] === 'true',
        inputNom: params["inputNom"] || '',
        inputPre: params["inputPre"] || '',
        numbersForm: {
          number1: params["number1"] === undefined ? 1 : parseInt(params["number1"], 10),
          number2: params["number2"] === undefined ? 1 : parseInt(params["number2"], 10)
        }
      });

      //Enviem els nous valors del form al servei perquè calculi el pressupost, i el recuperem per poder-lo imprimir en pantalla
      this.servei.setPres(this.initialForm);
      this.Press = this.servei.getPres();

      //Guardem els nous valors dels number inputs a les propietats que tenen property binding amb Panell Component
      this.number1Init = this.initialForm.get("numbersForm.number1").value;
      this.number2Init = this.initialForm.get("numbersForm.number2").value;
    });

    //S'estableix subscripció a initialForm: quan canvia, es canvien paràmetres
    this.subscription2 = this.initialForm.valueChanges.subscribe(values => {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: {
          inputNom: values.inputNom,
          inputPre: values.inputPre,
          checkbox1: values.checkbox1,
          checkbox2: values.checkbox2,
          checkbox3: values.checkbox3,
          number1: values.numbersForm.number1,
          number2: values.numbersForm.number2
        },
        queryParamsHandling: 'merge',
      }); //No cal recalcular pressupost perquè en canviar queryParams ja es recalcula
    });
  }

  //En tancar l'aplicació, desubscrivim per evitar memory leaks
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  //S'obtenen valors de Panell Component, quan aquest canvia
  funcioFillPare(event: string): void {
    this.initialForm.get("numbersForm").setValue(event);
  }

  //En fer submit, s'emmagatzemen els valors del form en objecte i s'envien al servei
  onClickSubmit(formValue: Pressupost): void {
    let obj = Object.keys(formValue);
    let date = new Date(Date.now()).toLocaleString(); //.split(',')[0];
    let pressupost: Pressupost = { usuari: formValue[obj[0]], pressupost: formValue[obj[1]], preu: this.Press, data: date, serveis: { web: formValue[obj[2]], pags: formValue[obj[5]]["number1"], idioms: formValue[obj[5]]["number2"], seo: formValue[obj[3]], ads: formValue[obj[4]] } };
    this.servei.addPres(pressupost);
    //ordenem a PressupostListComponent que torni a obtenir el preu de tots els pressupostos, recalculat al servei
    this.pres.getTotal();
  }


  //Funció del botó per tornar a la pantalla inicial
  tornar(): void {
    this.router.navigate(['']);
    this.servei.Pres = 0;
  }

}
