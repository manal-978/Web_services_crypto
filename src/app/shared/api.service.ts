import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
//import { Observable } from 'rxjs';
//import { News } from '../model/news'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl: string = "https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news";
  public news_data: string = "";
  constructor(private http: HttpClient ) { }

  getNews(ID:string, page_number:string) : Observable<any> {  

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
 
    return this.http.get(this.baseUrl, { 
        params: params,
        headers: headers,
        responseType: 'json',
    })
  }
}
