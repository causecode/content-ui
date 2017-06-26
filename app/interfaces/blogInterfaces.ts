import {IBlog} from '../models/BlogModel';

export interface IInstanceList {
    instanceList: IBlog[];
    monthFilterList: string[];
    tagList: (string|number)[][];
    totalCount: number;
}

export interface IInstanceDataSmall {
    author?: string;
    blogImgSrc?: string;
    id?: number;
    lastUpdated?: string;
    numberOfComments?: number;
    publishedDate?: string;
    title?: string;
    body?: string;
}
