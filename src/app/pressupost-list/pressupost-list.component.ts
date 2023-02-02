import { Component, OnInit } from '@angular/core';
import { Servei1Service } from '../servei1.service';

@Component({
  selector: 'app-pressupost-list',
  templateUrl: './pressupost-list.component.html',
  styleUrls: ['./pressupost-list.component.scss']
})
export class PressupostListComponent {
  constructor(private servei: Servei1Service) { }

  pressupostTotal: number;

  //S'obté preu total de tots els pressupostos
  getTotal() {
    this.pressupostTotal = this.servei.presTotal();
    this.pressupostos = [...this.servei.pressupostosList()];
    this.pressupostosCopy = [...this.servei.pressupostosList()];
    this.pressupostosDisplay = [...this.servei.pressupostosList()];
  }

  //S'obté array de pressupostos
  pressupostos: Object[] = [...this.servei.pressupostosList()];
  pressupostosDisplay: Object[] = [];
  pressupostosCopy: Object[] = [];

  //S'ordenen pressupostos alfabèticament
  ordAlfab() {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["pressupost"] > b["pressupost"]) { return 1; } else{ return -1; }})];
  }

  //S'ordenen pressupostos per data
  ordDate() {
    this.pressupostosDisplay = [...this.pressupostos.sort((a, b) => { if (a["data"] > b["data"]) { return 1; } else { return -1; } })]; 
  }

  ordOrigin() {
    this.pressupostosDisplay = [...this.pressupostosCopy];
  }

  //Filtre del cercador
  filterArray(event) {
    console.log("filtre activat");
    console.log(event.target.value);
    this.pressupostosDisplay = [...this.pressupostos.filter(obj => {
      console.log(obj["pressupost"].includes(event.target.value));
      if(obj["pressupost"].includes(event.target.value)){return true}else{return false};
    })];
    
  }



}
