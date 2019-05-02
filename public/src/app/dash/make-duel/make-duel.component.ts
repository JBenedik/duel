import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import {Location} from '@angular/common';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-make-duel',
  templateUrl: './make-duel.component.html',
  styleUrls: ['./make-duel.component.css']
})
export class MakeDuelComponent implements OnInit {
  @Input() heroCreator: any;
  duel: any
  errors = {};
  makeDuel = false;
  @Output() back = new EventEmitter();
  
  constructor(
    private _service:HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _location: Location,
    private _socket: Socket
    ) { }

  ngOnInit() {
    this.duel = {
      name: "",
      private: false,
      password: "",
      wager: Number,
      creator: {}
    }
    this.errors = {};
    console.log(this.heroCreator);
  }

  backClicked() {
    this.back.emit();
  }

  newDuel(info: any){
    console.log("New Duel");
    console.log(info);
    console.log(this.heroCreator)
    info.creator = this.heroCreator;
    console.log(info);
    let observ = this._service.newDuel(info);
    observ.subscribe(data => {
      console.log(data);
      if(data['success']==false){
        this.errors['message']="Something went wrong, please try again!";
      }
      else {
        console.log("Duel Created, let's go!");
        this._socket.emit('createGame');
        this._router.navigate(['/duel', data['duel']._id, this.heroCreator._id]);
      }
    })
  }
}
