import { FormGroup, FormControl, FormArray, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new-char',
  templateUrl: './new-char.component.html',
  styleUrls: ['./new-char.component.css']
})
export class NewCharComponent implements OnInit {
  char: any
  errors = {};

  //Create values for race and class to effect to figure out final stats
  rstr: any
  rint: any
  rdex: any
  rchar: any
  rdef: any
  rluck: any
  rhealth: any
  cstr: any
  cint: any
  cdex: any
  cchar: any
  cdef: any
  cluck: any
  chealth: any
  citem: any
  cmoves1: any
  cmoves2: any
  cmoves3: any
  rolly: any

  constructor(
    private _service:HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  
  ngOnInit() {
    //Create character for form
    this.rolly=false;
    this.char = {
      name: "",
      race: "",
      job: "",
      sex: "",
      health: 0,
      stats: {
        str: 0,
        int: 0,
        dex: 0,
        char: 0,
        def: 0,
        luck: 0
      },
      gold: 100,
      items: [],
      moves: [],
      rating: 1000
    }
  }

  newChar(info:any){
    console.log("New char");
    console.log(info);

    let observ = this._service.newChar(info);
    observ.subscribe(data => {
      console.log(data);
      if(data['success']==false){
        this.errors['message'] = "Something went wrong, please try again!";
      }
      else {
        console.log("Character added");
        this._router.navigate([`/dash`, data['char']._id]);
      }
    })
  }

  rollStats(info: any){
    console.log("Rolling for stats");
    console.log(info);
    info.items = [];
    info.moves = [];
    console.log(info);
// RACE STAT CHANGES
    if(info.race =="human"){
      this.rstr=0;
      this.rint=0;
      this.rdex=1;
      this.rchar=1;
      this.rdef=0;
      this.rluck=-2;
      this.rhealth=0;
    }
    else if(info.race=="elf"){
      this.rstr=-1;
      this.rint=2;
      this.rdex=2;
      this.rchar=-2;
      this.rdef=-2;
      this.rluck=1;
      this.rhealth=-7;
    }
    else if(info.race=="halfElf"){
      this.rstr=0;
      this.rint=1;
      this.rdex=2;
      this.rchar=-1;
      this.rdef=-1;
      this.rluck=1;
      this.rhealth=-4;
    }
    else if(info.race=="orc"){
      this.rstr=2;
      this.rint=-2;
      this.rdex=-1;
      this.rchar=-2;
      this.rdef=2;
      this.rluck=-1;
      this.rhealth=7;
    }
    else if(info.race=="halfOrc"){
      this.rstr=1;
      this.rint=-1;
      this.rdex=0;
      this.rchar=-1;
      this.rdef=1;
      this.rluck=0;
      this.rhealth=4;
    }
    else if(info.race=="dwarf"){
      this.rstr=1;
      this.rint=-1;
      this.rdex=-2;
      this.rchar=2;
      this.rdef=1;
      this.rluck=1;
      this.rhealth=4;
    }
    else if(info.race=="gnome"){
      this.rstr=-2;
      this.rint=2;
      this.rdex=1;
      this.rchar=1;
      this.rdef=-1;
      this.rluck=2;
      this.rhealth=-5;
    }
// CLASS STAT CHANGES
    console.log(info.job);
    if(info.job =="warrior"){
      this.cstr=5;
      this.cint=-3;
      this.cdex=-1;
      this.cchar=-1;
      this.cdef=3;
      this.cluck=-2;
      this.chealth=15;
      this.citem={
        name: "Sword of Stabbing",
        desc: "Named after the famous knight Sir Stabbing",
        stat: "Strength +1",
      };
      this.cmoves1={
          name: "Stab",
          desc: "...c'mon",
          self: false
        };
      this.cmoves2= {
          name: "Stab really hard",
          desc: "I mean really hard.",
          self: false,
          cd: 1
        };
      this.cmoves3={
          name: "Block",
          desc: "Well, try anyways.",
          self: true
        };
    }
    else if(info.job =="ranger"){
      this.cstr=0;
      this.cint=1;
      this.cdex=6;
      this.cchar=0;
      this.cdef=1;
      this.cluck=-1;
      this.chealth=8;
      this.citem={
        name: "Bow of pulling back too far",
        desc: "Gasp in it's glory, and the strain of it",
        stat: "Dexterity +1",
      };
      this.cmoves1=
        {
          name: "Shoot",
          desc: "Like with a bow",
          self: false
        };
      this.cmoves2=
        {
          name: "Shoot from behind",
          desc: "Coward",
          self: false,
          cd: 1
        }
      this.cmoves3=
        {
          name: "Hide",
          desc: "Worth a shot you pansy",
          self: true,
          cd: 2
        }
    }
    else if(info.job =="wizard"){
      this.cstr=-5;
      this.cint=7;
      this.cdex=0;
      this.cchar=2;
      this.cdef=-3;
      this.cluck=2;
      this.chealth=-20;
      this.citem={
        name: "Staff of wood",
        desc: "Don't worry, it's really nice wood",
        stat: "Dexterity +1",
      };
      this.cmoves1=
        {
          name: "Fireblast",
          desc: "It's hot?",
          self: false
        }
      this.cmoves2=
        {
          name: "Magic Missssssiles",
          desc: "I don't know what you expected",
          self: false,
          cd: 2
        }
      this.cmoves3=
        {
          name: "Heal",
          desc: "Magic is fun",
          self: true,
          cd: 1
        }
    }
    else if(info.job =="paladin"){
      this.cstr=3;
      this.cint=0;
      this.cdex=-3;
      this.cchar=3;
      this.cdef=5;
      this.cluck=1;
      this.chealth=23;
      this.citem={
        name: "Sword and Board",
        desc: "It's a literal board, I'm sorry.",
        stat: "Defense +1",
      };
      this.cmoves1={
          name: "Judgement",
          desc: "And make them feel bad about themselves",
          self: false
        }
      this.cmoves2=
        {
          name: "Pray",
          desc: "To whatever diety you like",
          self: true,
          cd: 1
        }
      this.cmoves3=
        {
          name: "Bubble",
          desc: "And hearth",
          self: true,
          cd: 3
        }
    }
    else if(info.job =="bard"){
      this.cstr=-2;
      this.cint=1;
      this.cdex=3;
      this.cchar=6;
      this.cdef=-2;
      this.cluck=6;
      this.chealth=6;
      this.citem={
        name: "Ukelele",
        desc: "Just please don't play wonderwall",
        stat: "Charisma +1",
      };
      this.cmoves1=
        {
          name: "Sing",
          desc: "Your voice is really that bad",
          self: false
        },
      this.cmoves2=
        {
          name: "Play music",
          desc: "Preferabbly not despacito.",
          self: false
        }
      this.cmoves3=
        {
          name: "Flirt",
          desc: "Musicians get all the ladies.",
          self: false,
          cd: 2
        }
    }
    else if(info.job =="thief"){
      this.cstr=2;
      this.cint=1;
      this.cdex=5;
      this.cchar=-3;
      this.cdef=-2;
      this.cluck=-2;
      this.chealth=-14;
      this.citem={
        name: "Fork",
        desc: "Have you ever been stabbed with a fork? It really hurts",
        stat: "Dexterity +1",
      };
      this.cmoves1=
        {
          name: "Backstab",
          desc: "Sneaky sneaky",
          self: false
        }
      this.cmoves2=
        {
          name: "Pickpocket",
          desc: "You are a thief afterall",
          self: false
        }
      this.cmoves3=
        {
          name: "Cloak",
          desc: "Well, try anyways.",
          self: true,
          cd: 1
        }
    }
    else if(info.job =="necro"){
      this.cstr=-3;
      this.cint=6;
      this.cdex=4;
      this.cchar=-5;
      this.cdef=2;
      this.cluck=-5;
      this.chealth=-7;
      this.citem={
        name: "Murderball",
        desc: "It's a magic-eight ball you painted black",
        stat: "Intelligence +1",
      };
      this.cmoves1=
        {
          name: "Evil sounding spell",
          desc: "It does sound bad, doesn't it?",
          self: false
        }
      this.cmoves2=
        {
          name: "Summon dead",
          desc: "It's a zombie!",
          self: false,
          cd: 2
        }
      this.cmoves3=
        {
          name: "Sacrifice",
          desc: "You really are heartless",
          self: true,
          cd: 1
        }
    }
    if(info.name =="All hail the mightiest potato") {
      info.name = "King Potato"
      this.rstr=50;
      this.rint=50;
      this.rdex=50;
      this.rchar=50;
      this.rdef=50;
      this.rluck=50;
      this.rhealth=400;
      this.cstr=50;
      this.cint=50;
      this.cdex=50;
      this.cchar=50;
      this.cdef=50;
      this.cluck=50;
      this.chealth=100;
      this.citem={
        name: "A potato",
        desc: "I am your king",
        stat: "You shall not survive",
      }
    }
    info.stats.str = Math.floor(Math.random() * 10 + 10 + this.cstr + this.rstr);
    info.stats.int = Math.floor(Math.random() * 10 + 10 + this.cint + this.rint);
    info.stats.dex = Math.floor(Math.random() * 10 + 10 + this.cdex + this.rdex);
    info.stats.char = Math.floor(Math.random() * 10 + 10 + this.cchar + this.rchar);
    info.stats.def = Math.floor(Math.random() * 10 + 10 + this.cdef + this.rdef);
    info.stats.luck = Math.floor(Math.random() * 10 + 10 + this.cluck + this.rluck);
    info.health = Math.floor(Math.random() * 20 + 150 + this.chealth + this.rhealth);
    info.stats.hp = info.health
    console.log("stats");
    console.log(info.stats);
    info.items.push(this.citem);
    info.moves.push(this.cmoves1);
    info.moves.push(this.cmoves2);
    info.moves.push(this.cmoves3);
    console.log("Finished Rolls")
    console.log(info);
    this.moves(info);
    this.rolly=true;
  }

  moves(info: any){
    console.log("Moves function");
    console.log(info);
    if(info.job=="warrior"){
      info.moves[0].mod = info.stats.str;
      info.moves[1].mod = Math.floor(info.stats.str*.5)+ Math.floor(info.stats.dex*.75) + 7;
      info.moves[2].mod = info.stats.def;
    }
    else if(info.job == "ranger"){
      info.moves[0].mod = info.stats.dex;
      info.moves[1].mod = Math.floor(info.stats.dex *.75) + Math.floor(info.stats.luck*.5) + 4;
      info.moves[2].mod = info.stats.dex;
    }
    else if(info.job == "wizard"){
      info.moves[0].mod = info.stats.int;
      info.moves[1].mod = Math.floor(info.stats.int *.75) + Math.floor(info.stats.luck*.5) + 6;
      info.moves[2].mod = info.stats.int + Math.floor(info.stats.luck*.6);
    }
    else if(info.job == "paladin"){
      info.moves[0].mod = info.stats.str;
      info.moves[1].mod = Math.floor(info.stats.def *.75) + Math.floor(info.stats.int*.5) + 8;
      info.moves[2].mod = info.stats.def;
    }
    else if(info.job == "bard"){
      info.moves[0].mod = info.stats.char;
      info.moves[1].mod = Math.floor(info.stats.char *.75) + Math.floor(info.stats.luck*.5) + 5;
      info.moves[2].mod = info.stats.char;
    }
    else if(info.job == "thief"){
      info.moves[0].mod = Math.floor(info.stats.dex *.5) + Math.floor(info.stats.str*.5)+5;
      info.moves[1].mod = Math.floor(info.stats.dex *.5) + Math.floor(info.stats.luck*.5);
      info.moves[2].mod = info.stats.dex;
    }
    else if(info.job == "necro"){
      info.moves[0].mod = info.stats.int;
      info.moves[1].mod = Math.floor(info.stats.int *.75) + Math.floor(info.stats.dex*.5) + 5;
      info.moves[2].mod = info.stats.int;
    }
    console.log(info.moves);
  }
}

