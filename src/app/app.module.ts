import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BenvingudaComponent } from './benvinguda/benvinguda.component';
import { PanellComponent } from './panell/panell.component';
import { ModalComponent } from './modal/modal.component';
import { PressupostListComponent } from './pressupost-list/pressupost-list.component';

import { AppFilterPipe } from './app-filter.pipe';

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
    AppFilterPipe
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
  bootstrap: [AppComponent]
})
export class AppModule { }
