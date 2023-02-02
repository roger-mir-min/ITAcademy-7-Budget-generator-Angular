import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BenvingudaComponent } from './benvinguda/benvinguda.component';
import { PanellComponent } from './panell/panell.component';
import { ModalComponent } from './modal/modal.component';
import { PressupostListComponent } from './pressupost-list/pressupost-list.component';
import { ModalComponent2 } from './modal2/modal.component';

import { AppFilterPipe } from './app-filter.pipe';
import { Injectable } from '@angular/core';

const appRoutes: Routes = [
  { path: "", component: BenvingudaComponent },
  { path: "home", component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BenvingudaComponent,
    PanellComponent,
    ModalComponent,
    PressupostListComponent,
    AppFilterPipe,
    ModalComponent2
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  exports: [
    RouterModule
  ],
  providers: [Injectable],
  bootstrap: [AppComponent, HomeComponent, PanellComponent, ModalComponent, ModalComponent2
  ]
})
export class AppModule { }
