import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { Routes, RouterModule } from '@angular/router';
import { UsPageComponent } from './us/usPage.component';
import { RTCQueryAPIModule, RtcQueryService } from 'rtcquery-api';
import { OrderByPipe } from './pipes/order-by.pipe';
import { GroupByPipe } from './pipes/group-by.pipe';
import { AppComponent } from './app.component';
import { RtcService } from './us/rtc.service';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{ path: 'iterations/:iterationid', component: UsPageComponent },
	
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    UsPageComponent,
    GroupByPipe,
		OrderByPipe
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    RTCQueryAPIModule,
    FormsModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    RtcQueryService,
    RtcService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
