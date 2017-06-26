import {BaseModel} from 'react-hero';
export {CSSProperties as CSS} from 'react';
export * from './blogInterfaces';

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
