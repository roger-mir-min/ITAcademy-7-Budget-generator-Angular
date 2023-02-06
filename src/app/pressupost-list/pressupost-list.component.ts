import { Component, Input } from '@angular/core';
import { Servei1Service } from '../servei1.service';
import { Pressupost } from '../Interfaces';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.scss']
})
export class PressupostListComponent {
  constructor(private servei: Servei1Service) { }

  //Es declaren arrays de pressupostos
  pressupostos: Pressupost[] = [...this.servei.pressupostosList()];
  pressupostosDisplay: Pressupost[] = [];

  //Es declara preu de tots els pressupostos de la llista
  pressupostTotal: number;

  //S'obté la llista dels pressupostos i el preu total (tots dos s'imprimeixen per pantalla)
  getTotal(): void {
    this.pressupostos = [...this.servei.pressupostosList()];
    this.pressupostosDisplay = [...this.servei.pressupostosList()];

    this.pressupostTotal = this.servei.presTotal();
  }

  //S'ordenen pressupostos alfabèticament
  ordAlfab(): void {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["pressupost"] > b["pressupost"]) { return 1; } else { return -1; } })];
  }

  //S'ordenen pressupostos per data
  ordDate(): void {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["data"] > b["data"]) { return 1; } else { return -1; } })];
  }

  ordOrigin(): void {
    this.pressupostosDisplay = [...this.pressupostos];
  }

  //Funció del cercador
  filterArray(event: Event): void {
    this.pressupostosDisplay = [...this.pressupostos.filter(obj => {
      if (typeof obj["pressupost"] == "string" && obj["pressupost"].includes((event.target as HTMLInputElement).value)) { return true } else { return false };
    })];

  }

}
