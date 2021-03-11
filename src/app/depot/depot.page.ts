import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {
  private selected : string = 'emeteur';
  
  segmentChanged(ev: any) {
    console.log( ev.target.value );
    this.selected = ev.target.value
  }
  constructor() { }

  ngOnInit() {
  }

}
