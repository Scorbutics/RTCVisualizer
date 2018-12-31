export enum ItemState {
    Ready,
    InDevelopment,
    InTest,
    Done,
}

export class ItemStateMap {
    public static map = {
        "com.ibm.team.apt.storyWorkflow.state.new" : ItemState.Ready,
        "com.ibm.team.apt.storyWorkflow.state.inDevelopment" : ItemState.InDevelopment,
        "com.ibm.team.apt.storyWorkflow.state.inTest" : ItemState.InTest,
        "com.ibm.team.apt.storyWorkflow.state.done" : ItemState.Done
    };
}

export interface State {
    id: string
}

export interface Iteration {
    name: string
}

export interface ProjectArea {
    name: string
}

export interface TeamArea {
    name: string
}

export interface Category {
    name: string
}

export interface WorkItem {
    allExtensions: Array<any>;
    state: State;
    target: Iteration;
    projectArea: ProjectArea;
    teamArea: TeamArea;
    category: Category;
    id: string;
    summary: string,
    parent: WorkItem
}
