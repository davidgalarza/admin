import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  commerceKey:string;
  constructor(private route:ActivatedRoute) {
    this.commerceKey = route.snapshot.params['id'];
  }

  ngOnInit() {
  }

}
