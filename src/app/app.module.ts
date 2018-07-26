import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { WarenkorbKundenService } from './services/warenkorb-kunden.service';
import { KundenComponent } from './components/kunden/kunden.component';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WarenkorbService } from './services/warenkorb.service';
import { BerechnungComponent } from './components/berechnung/berechnung.component';

@NgModule({
  declarations: [
    AppComponent,
    KundenComponent,
    BerechnungComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    WarenkorbKundenService,
    WarenkorbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
