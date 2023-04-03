import { Component } from '@angular/core';
import { Currency } from 'src/app/model/currency';
import * as AOS from 'aos';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ApiService } from 'src/app/shared/api.service';

interface Car {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ["./currency-converter.component.css"]
})

export class CurrencyConverterComponent {


  public currency_from: number = 0;
  public currency_to: number = 0;
  public quantity : number = 0;
  public output : number = 0;


  public currencies: Currency[] = [];

  constructor(private auth : AuthService , private data : DataService , public apiService : ApiService) {}

  ngOnInit(): void {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
     });
     this.fetch_currencies_list()
  }

  fetch_currencies_list(){
    
    this.apiService.get_currency_list().subscribe((data) => {
      for (let i = 0; i < data.data[0][1].data.length ; i++) {
        let currency = {} as Currency;
        currency.Currency_ID = data.data[0][1].data[i].currency_ID;
        currency.currency_short_name = data.data[0][1].data[i].currency_short_name;
        currency.full_name = data.data[0][1].data[i].fullname;
        currency.country_id = data.data[0][1].data[i].is_crypto;
        currency.is_crypto = data.data[0][1].data[i].is_crypto;
        this.currencies.push(currency);
      }
      
    });
  }

  Exchange(){
    this.apiService.currency_exchange(this.currency_from , this.currency_to).subscribe((data) => {
      this.output = data.data[0][0].basic * this.quantity
    });
  }
}
