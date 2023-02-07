import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./modal.component.scss']
})
  
  

export class ModalComponent {

  ngOnInit(): void {
  }

  constructor(private modal: NgbModal) { }


  openWindow(contenido) {
    this.modal.open(contenido);
  }

}
