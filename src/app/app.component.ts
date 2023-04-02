import { Component } from '@angular/core';
import {CryptoService} from './crypto.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularfiebaseAuthentification';
  constructor(private crypto:CryptoService){
    this.crypto.getData().subscribe(data=>{
      console.warn(data)
    })
  }
}
