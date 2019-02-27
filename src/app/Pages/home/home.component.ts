import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _opened: boolean = false;
 
  private _toggleSidebar() {
    this._opened = !this._opened;
  }
  
  events: any;
  location: any;
  pagination: any;
  
  data: any = {};
  categories: any;
  subCategories: any;
  
  keysName: string;
  cityName: string;
  categorieName: string;
  subCategoriesName: string;
  
  private url = 'https://www.eventbriteapi.com/v3/events/search/?token=HITNZH2IL3GZZCF6OTFP';
  private urlCategories = 'https://www.eventbriteapi.com/v3/categories/?token=HITNZH2IL3GZZCF6OTFP';
  private urlGeolocalisation;
  private lat;
  private lon;

  constructor(private http: Http) {
    if (window.navigator && window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(
        position => {
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          this.urlGeolocalisation = 'http://nominatim.openstreetmap.org/reverse?format=json&lat=' + this.lat + '&lon=' + this.lon + '&zoom=18&addressdetails=1';
          this.getCategories(this.urlCategories);
          this.getLocation(this.urlGeolocalisation);
        },
        error => {
          switch (error.code) {
            case 1:
            console.log('Permission Denied');
            break;
            case 2:
            console.log('Position Unavailable');
            break;
            case 3:
            console.log('Timeout');
            break;
          }
        }
      );
    };
  }
    
  filter() {
    this.url = 'https://www.eventbriteapi.com/v3/events/search/?token=HITNZH2IL3GZZCF6OTFP';
    if (this.keysName) {
      this.url = this.url + '&q=' + this.keysName;
    }
    if (this.categorieName && !this.subCategoriesName) {
      this.url = this.url + '&categories=' + this.categorieName;
    }
    if (this.cityName) {
      this.url = this.url + '&location.address=' + this.cityName;
    }
    if (this.subCategoriesName) {
      this.url = this.url + '&subcategories=' + this.subCategoriesName;
    }
    this.getEvents(this.url);
  }
    
  getData(url) {
    return this.http.get(url);
  }
    
  getLocation(url) {
    this.getData(url).subscribe(data => {
      this.data = data;
      this.cityName = data.json().address.town;
      this.url = this.url + '&location.address=' + this.cityName;
      this.getEvents(this.url)
    })
  }
    
  getEvents(url) {
    this.getData(url).subscribe(data => {
      this.data = data
      this.events = data.json().events
      if (data.json().pagination) {
        this.pagination = data.json().pagination;
        
      }
      if (data.json().location) {
        this.location = data.json().location;
      }
    })
  }

  getCategories(url) {
    this.getData(url).subscribe(data => {
      this.data = data
      this.categories = data.json().categories
    })
  }

  getSubCategories(url) {
    this.urlCategories = 'https://www.eventbriteapi.com/v3/categories/' + url + '/?token=HITNZH2IL3GZZCF6OTFP';
    this.getData(this.urlCategories).subscribe(data => {
      this.data = data
      this.subCategories = data.json().subcategories
    })
  }
  
  ngOnInit() { 
  }
  
}
