import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  newChar(char)  {
    console.log("new char on service");
    return this._http.post('/char/new', char);
  }

  getOne(id) {
    console.log("login on service");
    return this._http.get(`/char/login/${id}`)
  }

  newDuel(duel) {
    console.log("new duel on service");
    return this._http.post('/duel/new', duel);
  }

  getDuels() {
    console.log("Get all duels on service");
    return this._http.get('/duel/all');
  }

  getADuel(duel) {
    console.log("Get a duel on service");
    return this._http.get(`/duel/${duel}`);
  }

  joinDuel(info) {
    console.log("join duel on service");
    return this._http.put('/duel/join', info)
  }

  sendResults(info){
    console.log("Sending results of duel");
    return this._http.put('/char/results', info);
  }
}
