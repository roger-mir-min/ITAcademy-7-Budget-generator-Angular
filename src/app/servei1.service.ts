import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Servei1Service {

//Coses noves
Pres: number = 0;

  calcPres({ bool1, bool2, bool3, pags, idioms }) {
    this.Pres = 0;
  if (bool1) { this.Pres = 500 + 30 * pags * idioms; } else {
    (this.Pres = 0)
  }
  if (bool2) { this.Pres += 300 }
  if (bool3) { this.Pres += 200 }
  console.log("S'ha calculat pressupost: " + this.Pres);
}
  
getPres() {
    return this.Pres;
}
  
// A parti d'aquí comença lo antic

  constructor() { }

  // totalSum = 0;

  pressupostos: Object[] = [];

  pressupostTotal: number;

  addPres(pressupost: Object) {
    this.pressupostos.push(pressupost);
    console.log("S'ha afegit pressupost. Ara hi ha: ");
    console.log(this.pressupostos);
    this.calcPresTotal();
  }

  calcPresTotal() {
    this.pressupostTotal = 0;
    this.pressupostos.forEach(pres => {
      this.pressupostTotal += pres["preu"];
    });
    console.log("El preu totalíssim és: ");
    console.log(this.pressupostTotal);
  }

  presTotal() {
    return this.pressupostTotal;
  }

  pressupostosList() {
    return this.pressupostos;
  }

  // addValue(value: number) {
  //   this.totalSum += value;
  //   console.log("addValue: " + value);
  //   //console.log("S'ha sumat " + value + "; sumTotal és " + this.totalSum);
  // }

  // getTotalSum() {
  //   console.log("pare getTotaSum: " + this.totalSum);
  //   return this.totalSum;
  // }

  // addProd(a: number, b: number) {
  //   this.addValue(a * b * 30);
  //   (console.log("addProd"))
  // }

}
