import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  
  @Input() url: string;
  @Input() events: any;
  @Input() location: any;
  @Input() pagination: any;
  @Input() categories: any;
  
  constructor(private http: Http) {
    console.log('ICI ok :: ', this.url);
  }

  getData(url) {
    return this.http.get(url);
  }
  
  paginSwitch(page) {
    this.url = this.url + '&page=' + page;
    console.log(this.url);
    this.getData(this.url).subscribe(data => {
      this.events = data.json().events;
      this.pagination = data.json().pagination;
    })
  }

  ngOnInit() {
  }

}
