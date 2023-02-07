import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal2',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss']
})
  
  

export class ModalComponent2 {

  ngOnInit(): void {
  }

  constructor(private modal: NgbModal) { }


  openWindow(contenido) {
    this.modal.open(contenido);
  }

}
