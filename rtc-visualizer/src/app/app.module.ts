import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ROUTES } from './app.routes';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { TraitementDonneesComponent } from './traitement-donnees/traitement-donnees.component';
import { DetailArtefactComponent } from './detail-artefact/detail-artefact.component';
import { KanbanAvancementComponent } from './kanban-avancement/kanban-avancement.component';
import { StatistiquesAvancementComponent } from './statistiques-avancement/statistiques-avancement.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    TraitementDonneesComponent,
    DetailArtefactComponent,
    KanbanAvancementComponent,
    StatistiquesAvancementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
