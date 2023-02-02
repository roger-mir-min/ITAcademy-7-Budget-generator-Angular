import { Component, OnInit, ViewChild } from '@angular/core';
import { Servei1Service } from '../servei1.service';
import { FormsModule, FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pairwise, startWith, delay } from 'rxjs/operators';
import { PressupostListComponent } from '../pressupost-list/pressupost-list.component';
import { PanellComponent } from '../panell/panell.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  totalSum: number = 0;
  pressupostos: Object[] = [];

  @ViewChild(PressupostListComponent) pres: PressupostListComponent;
  @ViewChild(PanellComponent) panell: PanellComponent;

  //S'actualitza el preu del pressupost actual, calculat a servei
  // getTotalSum() {
  //   this.totalSum = this.servei.getTotalSum();
  // }

  constructor(private servei: Servei1Service, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
  }

  //Es crea form
  initialForm: FormGroup;
  subscription;
  Press: number = 0;

  minimumValueValidator(control: FormControl) {
    const value = control.value;
    return value >= 0 ? null : { minValue: true };
  }

  //S'obtenen valors del form Child (PanellComponent)
  funcioFillPare($event: string) {
    //this.getTotalSum();
    let value = $event;
    console.log("La funció FillPare va bé: ");
    this.initialForm.get("numbersForm").setValue(value);
  }

  number1Init;
  number2Init;

  ngOnInit() {
    //S'inicialitza form
    this.initialForm = new FormGroup({
      inputNom: new FormControl(""),
      inputPre: new FormControl(""),
      checkbox1: new FormControl(false),
      checkbox2: new FormControl(false),
      checkbox3: new FormControl(false),
      numbersForm: this.fb.group({
        number1: 0,
        number2: 0
      })
    });

//subscrivim form a params: si canvien paràmetres, el form també
    this.subscription = this.route.queryParams.subscribe(params => {
      this.initialForm.patchValue({
        checkbox1: params["checkbox1"] === 'true',
        checkbox2: params["checkbox2"] === 'true',
        checkbox3: params["checkbox3"] === 'true',
        inputNom: params["inputNom"] || '',
        inputPre: params["inputPre"] || '',
        numbersForm: {
          number1: parseInt(params["number1"]) || 0,
          number2: parseInt(params["number2"]) || 0,
        }
      }, { emitEvent: false });

      let valuesT = { bool1: this.initialForm.get("checkbox1").value, bool2: this.initialForm.get("checkbox2").value, bool3: this.initialForm.get("checkbox3").value, pags: this.initialForm.get("numbersForm.number1").value, idioms: this.initialForm.get("numbersForm.number2").value };
      this.servei.calcPres(valuesT);
      this.Press = this.servei.getPres();
      console.log("Component ha obtingut el pres.: " + this.Press);
      //this.panell.setValue1(this.initialForm.get("numbersForm.number1").value);
      //this.panell.setValue2(this.initialForm.get("numbersForm.number2").value);
      this.number1Init = this.initialForm.get("numbersForm.number1").value;
      this.number2Init = this.initialForm.get("numbersForm.number2").value;
      console.log(this.number1Init, this.number2Init);
    });

    //Si canvia valor d'initialForm, es canvia URL
    this.initialForm.valueChanges.subscribe(values => {
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
      });
      let valuesT = {bool1:values.checkbox1, bool2: values.checkbox2, bool3: values.checkbox3, pags:values.numbersForm.number1, idioms:values.numbersForm.number2}
      this.servei.calcPres(valuesT);
      this.Press = this.servei.getPres();
      console.log("Component ha obtingut el pres.: " + this.Press);
      //potser fer Pres = calcPres i calc pres retorna?

    });

    // this.getTotalSum();
    //Quan canvien valors dels checkboxes, s'envien a servei per recalcular el preu total i es mostra aquest preu per pantalla
    // this.initialForm.get("checkbox1").valueChanges.subscribe(currentValue => {
    //   console.log("Comença subscribe checkbox1");
    //   if (currentValue) {
    //     this.servei.addValue(530);
    //     this.initialForm.get("numbersForm").setValue({ number1: 1, number2: 1 });
    //   } else {
    //     this.getTotalSum();
    //     this.servei.addValue(-this.totalSum);
    //     if (this.initialForm.get("checkbox2").value) { this.servei.addValue(300) }
    //     if (this.initialForm.get("checkbox3").value) { this.servei.addValue(200) }
    //     this.initialForm.get("numbersForm").setValue({ number1: 0, number2: 0 });
    //   }
    //   this.getTotalSum();
    //   console.log("Acaba subscribe 1")
    // });

    // this.initialForm.get("checkbox2").valueChanges.subscribe(currentValue => {
    //   console.log("Comença Subscribe checkbox2");
    //   if (currentValue) {
    //     this.servei.addValue(300);
    //   } else {
    //     this.servei.addValue(-300);
    //   }
    //   this.getTotalSum();
    //   console.log("Acaba subscribe 2")
    // });

    // this.initialForm.get("checkbox3").valueChanges.subscribe(currentValue => {
    //   console.log("Comença subscribe checkbox3");
    //   if (currentValue) {
    //     this.servei.addValue(200);
    //   } else {
    //     this.servei.addValue(-200);
    //   }
    //   this.getTotalSum();
    //   console.log("Acaba subscribe 3")
    // });
  
    //Inserim a url els params inicials
    //this.router.navigate(["input", this.params]);

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //En fer submit, s'emmagatzemen els valors del form en objecte i s'envia al servei
  onClickSubmit(formValue) {
    console.log("S'ha submitejat num de baix:");
    console.log(formValue);
    let obj = Object.keys(formValue);
    console.log(formValue[obj[5]]);
    let date = new Date(Date.now()).toLocaleString(); //.split(',')[0];
    let pressupost: Object = { usuari: formValue[obj[0]], pressupost: formValue[obj[1]], preu: this.Press, data: date, serveis: { web: formValue[obj[2]], pags: formValue[obj[5]].number1, idioms: formValue[obj[5]].number2, seo: formValue[obj[3]], ads: formValue[obj[4]] } };
    console.log(pressupost);
    this.servei.addPres(pressupost);
    this.pres.getTotal();
  }



  //Funció del botó per tornar a la pantalla inicial
  tornar() {
    this.router.navigate(['']);
    this.servei.Pres = 0;
  }

}
