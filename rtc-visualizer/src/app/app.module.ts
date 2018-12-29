import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { RTCQueryAPIModule } from 'rtcquery-api';

//User defined
//TODO plusieurs modules
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsPageComponent } from './pages/usPage/usPage.component';
import { NamedBlockComponent } from './blocks/namedBlock.component';
import { PageTitleComponent } from './pages/pageTitle/pageTitle.component';
import { PiPageComponent } from './pages/piPage/piPage.component';
import { PageTitleService } from './pages/pageTitle/pageTitle.service';
import {TimelineComponent} from './timeline/timeline.component';
import {TimelineEntryComponent} from './timeline/timelineEntry.component';
import {CardComponent} from './cards/card.component';
import {CardDeckComponent} from './cards/cardDeck.component';

import { RtcService } from './pages/usPage/service/rtc.service';
import {LoginService} from './pages/usPage/service/login.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { GroupByPipe } from './pipe/group-by.pipe';
import { FormsModule } from '@angular/forms';
import { OrderByPipe } from './pipe/order-by.pipe';
import {RtcQueryService} from 'rtcquery-api';

const routes: Routes = [
	//TODO
	{ path: 'login', redirectTo: ''},

	{ path: 'iterations/:iterationid', component: UsPageComponent },
	{ path: 'pi', component: PiPageComponent },
	
	{ path: '', redirectTo: '', pathMatch: 'full' },
	{ path: '**', redirectTo: ''}
];

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		PageTitleComponent,
		UsPageComponent,
		PiPageComponent,
		NamedBlockComponent,
		TimelineComponent,
		TimelineEntryComponent,
		CardComponent,
		CardDeckComponent,
		GroupByPipe,
		OrderByPipe
	],
	imports: [
		NgbModule.forRoot(),
		RouterModule.forRoot(routes),
		BrowserModule,
		HttpClientModule,
		FormsModule,
		RTCQueryAPIModule
	],
	providers: [
		PageTitleService,
		RtcService,
		LoginService,
		CookieService,
		RtcQueryService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
