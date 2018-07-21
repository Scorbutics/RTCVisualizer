import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from "@angular/router";

//User defined
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UsPageComponent } from './pages/usPage/usPage.component';
import { NamedBlockComponent } from './blocks/namedBlock.component';
import { PageTitleComponent } from './pages/pageTitle/pageTitle.component';
import { PiPageComponent } from './pages/piPage/piPage.component';
import { PageTitleService } from './pages/pageTitle/pageTitle.service';
import {TimelineComponent} from './timeline/timeline.component';

const routes: Routes = [
	//TODO
	{ path: 'login', redirectTo: 'us'},

	{ path: 'us', component: UsPageComponent },
	{ path: 'pi', component: PiPageComponent },
	
	{ path: '', redirectTo: 'us', pathMatch: 'full' },
	{ path: '**', redirectTo: 'us'}
];

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		PageTitleComponent,
		UsPageComponent,
		PiPageComponent,
		NamedBlockComponent,
		TimelineComponent
	],
	imports: [
		NgbModule.forRoot(),
		RouterModule.forRoot(routes),
		BrowserModule
	],
	providers: [
		PageTitleService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
