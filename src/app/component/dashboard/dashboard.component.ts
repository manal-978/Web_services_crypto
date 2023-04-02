import { Component } from '@angular/core';
import { News } from 'src/app/model/news';
import { AuthService } from 'src/app/shared/auth.service';
import { DataService } from 'src/app/shared/data.service';
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

  constructor(private auth : AuthService , private data : DataService) {}

  ngOnInit(): void {
    AOS.init({
      duration: 800, // values from 0 to 3000, with step 50ms
     });
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
