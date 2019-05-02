import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  makeDuel = false;
  hero = {};
  duels =[];
  info: any;
  
  constructor(
    private _service:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    console.log(this._route.params['_value']);
    this.getChar(this._route.params['_value'].id);
    this.getDuels();
  }

  getChar(id) {
    console.log(id);
    console.log("getting char data");
    let observ = this._service.getOne(id);
    observ.subscribe(data => {
      console.log(data);
      if(data['status']==false){
        this._router.navigate(['/']);
      }
      else {
        console.log("Here we go again!");
        this.hero = data['char'];
        this.changeBG();
      }
    })
  }

  getDuels() {
    let observ = this._service.getDuels();
    observ.subscribe(data => {
      console.log("Get Duels");
      console.log(data);
      if(data['status']==false){
        this._router.navigate(['/']);
      }
      else {
        console.log("Got all duels!");
        this.duels = data['duels'];
        console.log(this.duels);
      }
    })
  }

  joinDuel(duel, hero){
    console.log("Join Duel");
    console.log(duel);
    console.log(hero)
    this.info = {duel: duel, hero:hero}
    let observ = this._service.joinDuel(this.info);
    observ.subscribe(data => {
      if(data['status']==false){
        console.log("Shit went bad");
      }
      else{
        console.log("Got something");
        console.log(data);
        console.log(data['duel']._id);
        console.log(data['duel'].opponent[0]._id);
        this._router.navigate(['/duel', data['duel']._id, data['duel'].opponent[0]._id])
      }
    })
  }

  newDuel() {
    console.log("New duel click received");
    this.makeDuel = true;
  }

  trigger() {
    this.makeDuel = false;
  }

  

  changeBG() {
    if(this.hero['job'] =="warrior"){
      document.body.style.background="linear-gradient(to top right, #990000 0%, #1a0000 100%)";
    }
    else if(this.hero['job']=="ranger"){
      document.body.style.background="linear-gradient(to top right, #00cc00 0%, #001a00 100%)";
    }
    else if(this.hero['job']=="wizard"){
      document.body.style.background="linear-gradient(to top right, #9966ff 0%, #33001a 100%)";
    }
    else if(this.hero['job']=="paladin"){
      document.body.style.background="linear-gradient(to top right, #ffff66 0%, #ff6600 100%)";
    }
    else if(this.hero['job']=="bard"){
      document.body.style.background="linear-gradient(to top right, #ff6699 0%, #66ffff 100%)";
    }
    else if(this.hero['job']=="thief"){
      document.body.style.background="linear-gradient(to top right, #4d4d4d 0%, #1a1a1a 100%)";
    }
    else if(this.hero['job']=="necro"){
      document.body.style.background="linear-gradient(to top right, #4d004d 0%, #006600 100%)";
    }
  }

}
