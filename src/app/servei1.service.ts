import { Injectable } from '@angular/core';
import { Pressupost } from 'src/app/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class Servei1Service {

  //PART VINCULADA A HOME COMPONENT
  //Calculem el preu del pressupost
  Pres: number = 0;

  //Transformem valors de form en objecte més manejable, el guardem a localstore i recalculem el pressupost
  setPres(initialForm) {
    const obj = { bool1: initialForm.get("checkbox1").value, bool2: initialForm.get("checkbox2").value, bool3: initialForm.get("checkbox3").value, pags: initialForm.get("numbersForm.number1").value, idioms: initialForm.get("numbersForm.number2").value };
    localStorage.setItem("pressupost", JSON.stringify(obj));
    this.calcPres();
  }

  calcPres(): void {
    this.Pres = 0;
    const PresActual = JSON.parse(localStorage.getItem("pressupost"));
    if (PresActual["bool1"]) { this.Pres = 500 + 30 * PresActual["pags"] * PresActual["idioms"]; } else {
      (this.Pres = 0)
    }
    if (PresActual["bool2"]) { this.Pres += 300 }
    if (PresActual["bool3"]) { this.Pres += 200 }
  }

  //Retornem el preu del pressupost
  getPres(): number {
    return this.Pres;
  }

  //PART VINCULADA A PRESSUPOSTOSLIST COMPONENT

  //pressupostos: Pressupost[] = [];

  pressupostTotal: number;

  //Funció que afegeix un pressupost a la llista de pressupostos (pressupostos)
  addPres(pressupost: Pressupost) {
    const array = JSON.parse(localStorage.getItem("array"));

    if (array) {
      array.push(pressupost);
      localStorage.setItem("array", JSON.stringify(array));
    } else {
      localStorage.setItem("array", JSON.stringify([pressupost]));
    }
    this.calcPresTotal();
  }

  //Funció que calcula el cost de tots els pressupostos (pressupostTotal)
  calcPresTotal(): void {
    this.pressupostTotal = 0;
    let pressupostos = [];
    if (localStorage.getItem("array") != null) {
      pressupostos = JSON.parse(localStorage.getItem("array"));
      (pressupostos).forEach(pres => {
        if (typeof pres["preu"] == "number") {
          this.pressupostTotal += pres["preu"];
        }
      });
    }
  }

  //Funció que retorna el cost de tots els pressupostos (pressupostTotal)
  presTotal(): number {
    return this.pressupostTotal;
  }

  //Funció que retorna la llista de pressupostos (cridada per PressupostosList Component)
  retList() {
    if (localStorage.getItem("array")) {
      return [...JSON.parse(localStorage.getItem("array"))];
    }else{return []}
  }

}
