import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-berechnung',
  templateUrl: './berechnung.component.html',
  styleUrls: ['./berechnung.component.css']
})
export class BerechnungComponent implements OnInit {

  @Input('berechnung') berechnung: any;

  constructor() { }

  ngOnInit() {
  }

}
