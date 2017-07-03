import {IBlog} from '../models/BlogModel';
import {BaseModel} from 'react-hero';
export {CSSProperties as CSS} from 'react';

export interface IHelmetMeta {
    title: string;
    description: string;
    keywords: string;
}

export interface IDispatchProps {
    saveData?: (model: string, value: any) => void;
}

export interface IEditorTypeInterface {
    label: string;
    value: string;
}

export interface IFileUploadResponse {
    filepath: string;
}

export interface IAxiosResponse {
    data: any;
}

export interface IAxiosError {
    response: {
        data: any;
    };
}

export interface IStoreInstanceType {
    totalCount?: number;
    instanceList?: BaseModel[];
    activePage?: number;
    properties?: any;
}

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
