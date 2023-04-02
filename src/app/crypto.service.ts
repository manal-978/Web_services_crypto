import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})




export class CryptoService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const url = 'https://investing-cryptocurrency-markets.p.rapidapi.com/get-meta-data';
    const options = {
      params: {
        locale_info: 'en_US',
        lang_ID: '1',
        time_utc_offset: '28800',
      },
      headers: {
        'X-RapidAPI-Key': 'c6ec9e8c5dmshe6275a48e10c817p1301b9jsna84ae075ddc2',
        'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
        useQueryString: 'true',
      },
    };
    return this.http.get(url, options);
  }

  ngOnInit() {
    const subscription = this.getData().subscribe(data => {
      console.log(data);
    });
    subscription.unsubscribe();
  }



  
}
