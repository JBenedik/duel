import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HttpService } from './http.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { NewCharComponent } from './new-char/new-char.component';
import { LoginComponent } from './home/login/login.component';
import { MakeDuelComponent } from './dash/make-duel/make-duel.component';
import { DuelComponent } from './duel/duel.component';

const config: SocketIoConfig = { url: 'http://localhost:8000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    NewCharComponent,
    LoginComponent,
    MakeDuelComponent,
    DuelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
