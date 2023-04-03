import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs';
//import { News } from '../model/news'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public news_data: string = "";
  constructor(private http: HttpClient ) { }

  getNews(ID:string, page_number:string) : Observable<any> {  
    let baseUrl_news: string = "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news";
    let news_data: string;

    const headers: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '569a65d82amsh8caae75e510b828p1c7061jsn36a45ff18bfc',
      'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
    });

    const params: HttpParams = new HttpParams()
      .set('pair_ID', ID)
      .set('page', page_number)
      .set('time_utc_offset','28800')
      .set('lang_ID' , '1');
 
    return this.http.get(baseUrl_news, { 
        params: params,
        headers: headers,
        responseType: 'json',
    })
  }

  get_currency_list() : Observable<any> {  
    let baseUrl_currencies: string = "https://investing-cryptocurrency-markets.p.rapidapi.com/currencies/list"

    const headers: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '569a65d82amsh8caae75e510b828p1c7061jsn36a45ff18bfc',
      'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
    });

    const params: HttpParams = new HttpParams()
      .set('lang_ID' , '1');
 
    return this.http.get(baseUrl_currencies, { 
        params: params,
        headers: headers,
        responseType: 'json',
    })
  }

  currency_exchange(from : number , to : number) : Observable<any>{
    let baseUrl_currencies: string = "https://investing-cryptocurrency-markets.p.rapidapi.com/currencies/get-rate"

    const headers: HttpHeaders = new HttpHeaders({
      'X-RapidAPI-Key': '569a65d82amsh8caae75e510b828p1c7061jsn36a45ff18bfc',
      'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com'
    });

    const params: HttpParams = new HttpParams()
      .set('fromCurrency' , from)
      .set('toCurrency' , to)
      .set('time_utc_offset',28800)
      .set('lang_ID' , 1);
 
    return this.http.get(baseUrl_currencies, { 
        params: params,
        headers: headers,
        responseType: 'json',
    })
  }
}
