import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { News } from '../model/news'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private afs : AngularFirestore) { }

  // insert news into firestore
  AddNews(news : News) {
    return this.afs.collection('/Students').add(news)
  }

  // get all the news from firestore
  GetAllNews(){
    return this.afs.collection('/Students').snapshotChanges();
  }

  DeleteNews(news : News) {
    return this.afs.doc('/Students/' + news.id).delete();
  }

  UpdateNews(news : News) {
    this.DeleteNews(news);
    this.AddNews(news);
  }
}
