import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

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
import { RtcQueryBuilderService } from './pages/usPage/service/rtcQueryBuilder.service';

const routes: Routes = [
	//TODO
	{ path: 'login', redirectTo: 'iteration/current'},

	{ path: 'iteration/:id', component: UsPageComponent },
	{ path: 'pi', component: PiPageComponent },
	
	{ path: '', redirectTo: 'iteration/current', pathMatch: 'full' },
	{ path: '**', redirectTo: 'iteration/current'}
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
		CardDeckComponent
	],
	imports: [
		NgbModule.forRoot(),
		RouterModule.forRoot(routes),
		BrowserModule,
		HttpClientModule
	],
	providers: [
		PageTitleService,
		RtcService,
		LoginService,
		CookieService,
		RtcQueryBuilderService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
