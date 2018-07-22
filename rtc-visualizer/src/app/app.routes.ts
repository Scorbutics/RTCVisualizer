import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TraitementDonneesComponent } from './traitement-donnees/traitement-donnees.component';
import { DetailArtefactComponent } from './detail-artefact/detail-artefact.component';
import { KanbanAvancementComponent } from './kanban-avancement/kanban-avancement.component';
import { StatistiquesAvancementComponent } from './statistiques-avancement/statistiques-avancement.component';

export const ROUTES: Routes = [
  { path: '', component: LoginComponent },
  { path: 'data', component: TraitementDonneesComponent },
  { path: 'detail', component: DetailArtefactComponent },
  { path: 'kanban', component: KanbanAvancementComponent },
  { path: 'stats', component: StatistiquesAvancementComponent }
];
