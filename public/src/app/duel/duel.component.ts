import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  full = false;
  oppo = {};
  char = {};
  duel = {};
  info = {};
  done = false;
  turn = false;
  player1 = false;
  player2 = false;
  atk = {};
  msg = "";
  display = "";
  over = false;
  final = "";

  constructor(
    private _service:HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _socket: Socket
  ) { }

  ngOnInit() {
    this.getChar(this._route.params['_value'].user);
    this._socket.emit('joinGame');
  }

  getChar(user) {
    console.log("getting char data");
    console.log(user);
    let self = this;
    let observ = this._service.getOne(user);
    observ.subscribe(data => {
      console.log(data);
      if(data['status']==false) {
        this._router.navigate(['/dash', user]);
      }
      else {
        console.log("You've entered the duel")
        this.char = data['char'];

        this._socket.on('waiting', function() {
          console.log("First player here")
          
        });
        this._socket.on('ready', function() {
          console.log("Got ready message");
          self.beginGame();
        });
        this._socket.on('chilling', function() {
          this._router.navigate(['/dash', this.char['_id']]);
        });
        this._socket.on('sendAtk', function(info) {
          self.takeTurn(info);
        })
      }
    })
  }

  beginGame(){
    console.log("Start function");
    this.getDuel(this._route.params['_value'].id);
  }

  getDuel(duel) {
    console.log("get duel data")
    console.log(duel);
    let observ = this._service.getADuel(duel);
    observ.subscribe(data => {
      console.log(data);
      if(data['status']==false) {
        console.log("Didn't get duel info");
        this._router.navigate(['/dash', this.char['_id']]);
      }
      else {
        console.log("Got duel info")
        this.duel = data['duel'];
        console.log(this.duel);
        this.getOppo();
      }
    })
  }

  getOppo() {
    console.log("Get Oppo function");
    console.log(this.char['_id']);
    console.log(this.duel['creator'])
    if(this.char['_id'] == this.duel['creator'][0]._id){
      console.log("You are creator");
      this.oppo = this.duel['opponent'][0];
      console.log(this.oppo);
      this.full=true;
      this.player1 = true;
      this.turn = true;
    }
    else if(this.char['_id'] == this.duel['opponent'][0]._id){
      console.log("Opponent is creator");
      this.oppo = this.duel['creator'][0];
      console.log(this.oppo);
      this.full=true;
      this.player2 = true;
      console.log(this.full);
    }
    else{
      console.log("Somethign went very wrong.")
    }
  }

  takeTurn(info){
    console.log(info);
    this.display = info.msg;
    if(info.id == this.char['_id']){
      if(info.self == false){
        this.oppo['health'] -=info.dmg;
      }
      else{
        this.char['health'] += info.dmg;
      }
    }
    else{
      if(info.self == false){
        this.char['health'] -= info.dmg;
      }
      else{
        this.oppo['health'] += info.dmg;
      }
    }
    if(this.char['health'] <= 0 || this.oppo['health'] <= 0 ) {
      this.finalMessage();
    }
    else{
      this.switchTurns();
    }
  }
  switchTurns(){
    if(this.turn){
      this.turn = false;
    }
    else{
      this.turn = true;
    }
  }

  finalMessage(){
    this.over = true;
    if(this.char['health'] <= 0){
      this.final = "You have proven beyond a measure of doubt that you are a lil bitch. Enjoy 7-11."
    }
    else{
      this.final = "Congrats! You won...this time."
    }
  }

  action1() {
    if(this.char['moves'][0].self){
      this.msg = this.char['name'] + " used " + this.char['moves'][0].name + " and it healed for " + this.char['moves'][0].mod + " damage!";
    }
    else{
      this.msg = this.char['name'] + " used " + this.char['moves'][0].name + " and it did " + this.char['moves'][0].mod + " damage!";
    }
    this.atk = {msg: this.msg, dmg: this.char['moves'][0].mod, id: this.char['_id'], self: this.char['moves'][0].self};
    this._socket.emit('turn', this.atk);
  }

  action2() {
    if(this.char['moves'][1].self){
      this.msg = this.char['name'] + " used " + this.char['moves'][1].name + " and it healed for " + this.char['moves'][1].mod + " damage!";
    }
    else{
      this.msg = this.char['name'] + " used " + this.char['moves'][1].name + " and it did " + this.char['moves'][1].mod + " damage!";
    }
    this.atk = {msg: this.msg, dmg: this.char['moves'][1].mod, id: this.char['_id'], self: this.char['moves'][1].self};
    this._socket.emit('turn', this.atk);
  }

  action3() {
    if(this.char['moves'][2].self){
      this.msg = this.char['name'] + " used " + this.char['moves'][2].name + " and it healed for " + this.char['moves'][2].mod + " damage!";
    }
    else{
      this.msg = this.char['name'] + " used " + this.char['moves'][2].name + " and it did " + this.char['moves'][2].mod + " damage!";
    }
    this.atk = {msg: this.msg, dmg: this.char['moves'][2].mod, id: this.char['_id'], self: this.char['moves'][2].self};
    this._socket.emit('turn', this.atk);
  }

  winz() {
    if(this.char['health'] <= 0) {
      this.duel['win'] = this.char['name']
      this.char['rating'] += 10;
      this.char['gold'] += this.duel['wager']
      this.duel['lost'] = this.oppo['name']
      this.oppo['rating'] -= 10;
      this.oppo['gold'] -= this.duel['wager'];
      this.info = {char: this.char, oppo: this.oppo};
      let observ = this._service.sendResults(this.info);
      observ.subscribe(data => {
        console.log(data);
        if(data['status']==false) {
          this._router.navigate(['/dash', this.char['_id']]);
        }
        else {
          this._router.navigate(['/dash', this.char['_id']]);
        }
      })
    }
    else if(this.oppo['health'] <= 0) {
      this.duel['win'] = this.oppo['name']
      this.oppo['rating'] += 10;
      this.oppo['gold'] += this.duel['wager']
      this.duel['lost'] = this.char['name']
      this.char['rating'] -= 10;
      this.char['gold'] -= this.duel['wager'];
      this.info = {char: this.char, oppo: this.oppo};
      let observ = this._service.sendResults(this.info);
      observ.subscribe(data => {
        console.log(data);
        if(data['status']==false) {
          this._router.navigate(['/dash', this.char['_id']]);
        }
        else {
          this._router.navigate(['/dash', this.char['_id']]);
        }
      })
    }
  }
}
