import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errors = {};
  info:any;

  constructor(
    private _service:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.info = {id:""};
  }

  login(info:any) {
    console.log("Login click")
    console.log(info);
    let observ = this._service.getOne(info.id);
    observ.subscribe(data => {
      console.log(data);
      if(data['status']==false){
        this.errors['message'] = "User cannot be found";
      }
      else {
        console.log("have char");
        this._router.navigate([`/dash`, data['char']._id]);
      }
    })
  }
}
