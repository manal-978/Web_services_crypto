// next
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/shared/auth.service';

interface News {
  news_ID: string;
  news_provider_name: string;
  HEADLINE: string;
  news_link?: string;
  third_party_url?: string;
  related_image_big: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  page = 1;
  response: News[] = [];
  noMoreArticles = false;

  constructor(private auth : AuthService, private http: HttpClient) {}

  ngOnInit() {
    this.getNews();
  }

  async getNews() {
    const options = {
      headers: new HttpHeaders({
        'x-rapidapi-host': 'investing-cryptocurrency-markets.p.rapidapi.com',
        'x-rapidapi-key': 'c6ec9e8c5dmshe6275a48e10c817p1301b9jsna84ae075ddc2'
      }),
      params: {
        pair_ID: '1057391',
        page: this.page.toString(),
        time_utc_offset: '28800',
        lang_ID: '1'
      }
    };

    try {
      const response = await this.http.get<any>('https://investing-cryptocurrency-markets.p.rapidapi.com/coins/get-news', options).toPromise();
      // console.log(response);
      this.response = response.data[0].screen_data.news;

      // If there are no more articles to load, disable the "Load next page" button
      if (this.response.length === 0) {
        this.noMoreArticles = true;
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadNextPage(event: Event) {
    event.preventDefault(); // prevent default form submission behavior
    this.page++;
    this.getNews();
}

  trackById(index: number, news: News): string {
    return news.news_ID;
  }

  register(){
    this.auth.logout();
  }

}