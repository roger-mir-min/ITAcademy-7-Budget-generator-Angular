import { Injectable } from '@angular/core';
import { Pressupost } from 'src/app/Interfaces';


@Injectable({
  providedIn: 'root'
})
export class Servei1Service {

  //PART VINCULADA A HOME COMPONENT
  //Calculem el preu del pressupost
  Pres: number = 0;

  calcPres({ bool1, bool2, bool3, pags, idioms }): void {
    this.Pres = 0;
    if (bool1) { this.Pres = 500 + 30 * pags * idioms; } else {
      (this.Pres = 0)
    }
    if (bool2) { this.Pres += 300 }
    if (bool3) { this.Pres += 200 }
  }

  //Retornem el preu del pressupost
  getPres(): number {
    return this.Pres;
  }

  //PART VINCULADA A PRESSUPOSTOSLIST COMPONENT

  pressupostos: Pressupost[] = [];

  pressupostTotal: number;

  //Funció que afegeix un pressupost a la llista de pressupostos (pressupostTotal)
  addPres(pressupost: Pressupost) {
    this.pressupostos.push(pressupost);
    this.calcPresTotal();
  }

  //Funció que calcula el cost de tots els pressupostos (pressupostTotal)
  calcPresTotal(): void {
    this.pressupostTotal = 0;
    this.pressupostos.forEach(pres => {
      if (typeof pres["preu"] == "number") {
        this.pressupostTotal += pres["preu"];
      }
    });
  }

  //Funció que retorna el cost de tots els pressupostos (pressupostTotal)
  presTotal(): number {
    return this.pressupostTotal;
  }

  //Funció que retorna la llista de pressupostos (cridada per PressupostosList Component)
  pressupostosList(): Pressupost[] {
    return this.pressupostos;
  }

}
