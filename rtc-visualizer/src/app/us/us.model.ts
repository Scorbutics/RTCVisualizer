import { ItemState, Iteration, TeamArea, Category } from '../models/workitem.model';


export interface UsItem {
    state: ItemState;
    target: Iteration;
    teamArea: TeamArea;
    category: Category;
    id: string;
    summary: string
}