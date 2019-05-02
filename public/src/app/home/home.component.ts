import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  login = false;

  constructor(private _service: HttpService) {
    document.body.style.background="grey";
  }

  ngOnInit() {
    console.log("in home component");
  }

  loginBtn() {
    console.log("Login click received");
    this.login = true;
  }
}
