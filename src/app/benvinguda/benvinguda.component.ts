import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-benvinguda',
  templateUrl: './benvinguda.component.html',
  styleUrls: ['./benvinguda.component.scss']
})
export class BenvingudaComponent {
  constructor(private router: Router, private route: ActivatedRoute){}
  homeRoute() {
    this.router.navigate(["home"]);
}
}
