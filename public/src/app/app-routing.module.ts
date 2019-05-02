import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { NewCharComponent } from './new-char/new-char.component';
import { DuelComponent } from './duel/duel.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch:'full', redirectTo:'home'},
  {path:'newchar', component: NewCharComponent},
  {path:'dash/:id', component: DashComponent},
  {path:'duel/:id/:user', component: DuelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
