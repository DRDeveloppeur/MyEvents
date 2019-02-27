import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  idEvent: number;
  event: any;
  categorie: string;
  subCategorie: string;

  private url = 'https://www.eventbriteapi.com/v3/events/';
  private urlCat = 'https://www.eventbriteapi.com/v3/categories/';
  private urlSubCat = 'https://www.eventbriteapi.com/v3/subcategories/';
  private token = '/?token=HITNZH2IL3GZZCF6OTFP';
  
  constructor(private route: ActivatedRoute, private http: Http) { }
  
  getData(url) {
    return this.http.get(url);
  }
  
  getEvent() {
    this.url = this.url + this.idEvent + this.token;
    this.getData(this.url).subscribe(data => {
      this.event = data.json();
      console.log(this.event);
      
      this.getCategorie();
      this.getSubCategorie();
    })
  }

  getCategorie() {
    if (this.event.category_id) {
      this.urlCat = this.urlCat + this.event.category_id + this.token;
      this.getData(this.urlCat).subscribe(data => {
        this.categorie = data.json().name
      })
    }
  }
  
  getSubCategorie() {
    if (this.event.subcategory_id) {
      this.urlSubCat = this.urlSubCat + this.event.subcategory_id + this.token;
      this.getData(this.urlSubCat).subscribe(data => {
        this.subCategorie = data.json().name
      })
    }
  }
  ngOnInit() {
    this.idEvent = this.route.snapshot.params['id'];
    this.getEvent();
  }

}
