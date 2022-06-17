export interface TaskModel{
    taskId?: string;
    taskName: string;
    taskDescription: string;
    dateCreated: Date;
    dateModified: Date;
    status?: TaskStatus
    tag: ITags[];
}

export interface IParams{
task: TaskModel;
title: string;
}

export interface ITags{
    tagId?: string;
    Name: string;
    taskId?: string;
}

export enum TaskStatus{
    New = 0,
    InProgress = 1,
    Completed = 2
}