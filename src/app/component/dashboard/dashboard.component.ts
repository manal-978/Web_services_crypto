import { Component } from '@angular/core';
import { News } from 'src/app/model/news';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
import { ApiService } from 'src/app/shared/api.service';
import * as AOS from 'aos';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent {

  Newslist : News[] = [];

  newsObj : News = {
    id : '',
    src_image : '',
    link_url : '',
    headline : '',
    provider : ''
  };

  id : string = '';
  src_image : string = '';
  link_url : string = '';
  headline : string = '';
  provider : string = '';

  constructor(private auth : AuthService , private data : DataService , public apiService : ApiService) {}

  ngOnInit(): void {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
     });
  }

  fetch_api_data(){
    
    this.apiService.getNews('1057391' , '1').subscribe((data) => {
      let news = {} as News;
      for (let i = 0; i < data.data[0].screen_data.news.length ; i++) {
        let news = {} as News;
        news.headline = data.data[0].screen_data.news[i].HEADLINE;
        //console.log(data.data[0].screen_data.news[i].HEADLINE);
        news.src_image = data.data[0].screen_data.news[i].related_image_big;
        //console.log(data.data[0].screen_data.news[i].related_image_big);
        news.link_url = data.data[0].screen_data.news[i].news_link;
        //console.log(data.data[0].screen_data.news[i].news_link);
        news.provider = data.data[0].screen_data.news[i].news_provider_name;
        //console.log(data.data[0].screen_data.news[i].news_provider_name);
        news.id = data.data[0].screen_data.news[i].news_ID;
        //console.log(data.data[0].screen_data.news[i].news_ID)

        this.Newslist.push(news);
      }
      console.log(this.Newslist);
    });
    //console.log(news)
    /*
    news = {
      src_image : (data as any).data[0].screen_data.news[0].related_image_big,
      link_url :  (data as any).data[0].screen_data.news[0].news_link,
      headline : (data as any).data[0].screen_data.news[0].HEADLINE,
      id : (data as any).data[0].screen_data.news[0].news_ID,
      provider :  (data as any).data[0].screen_data.news[0].news_provider_name
    };
    console.log(news.id);
    console.log(news.src_image);
    console.log(news.link_url);
    console.log(news.headline);
    console.log(news.provider);
    */
  }

  register() {
    this.auth.logout();
  }

  getAllNews(){
    this.data.GetAllNews().subscribe(res => {
      this.Newslist = res.map((e: any) => {
        const data = e.payload.doc.data();
        data.id = e.payload.doc.id ; 
        return data;
      })

    }, err => {
      alert('error while fetching the data ')
    })
  }

  resetForm() {
    this.id = '';
    this.headline = '';
    this.provider = '';
    this.link_url = '';
    this.src_image = '';
  }

  addNews(){
    if(this.src_image == '' || this.link_url == '' || this.headline == '' || this.provider == '' ){
      alert("fill all the feilds first");
    }

    this.newsObj.id = '';
    this.newsObj.src_image = this.src_image;
    this.newsObj.link_url = this.link_url;
    this.newsObj.headline = this.headline;
    this.newsObj.provider = this.provider;
    

    this.data.AddNews(this.newsObj)
    this.resetForm();
  }

  updateNews(news: News){

  }

  deleteNews(news: News){
    if(window.confirm('Are you sure you want to delete this news')){
      this.data.DeleteNews(news)
    }
  }
}
