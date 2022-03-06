import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  content: any;

  constructor(private activatedRoute: ActivatedRoute,
              private http: HttpClient) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(val => this.http.get(`assets/rezepte/${val['id']}/${val['id']}.txt`, {responseType: 'text' as const}))
      )
      .subscribe(data => this.content = data);
  }

  load(param: any) { console.log(param)
    this.http.get(`assets/rezepte/${param}/${param}.txt`, {responseType: 'text' as const})
      .subscribe(data => { console.log(data)
        this.content = data;
      });
  }

}
