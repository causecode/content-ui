import * as React from 'react';
import * as Axios from 'axios';
import * as moment from 'moment';
import {BaseModel, ModelPropTypes, HTTP} from 'react-hero';
import {getDefaultHeaders} from '../constants';
import {IFileUploadResponse, IAxiosResponse} from '../interfaces';

export interface IBlog {
    id?: number;
    title?: string;
    subTitle?: string;
    author?: string;
    body?: string;
    blogImgSrc?: string;
    blogImgFilePath?: string;
    type?: string;
    lastUpdated?: Date;
    publishedDate?: Date;
    numberOfComments?: number;
    publish?: boolean;
    blogInstanceTags?: string[];
    metaList?: {type: string, value: string}[];
}

export class BlogModel extends BaseModel {

    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        title: ModelPropTypes.STRING(),
        subTitle: ModelPropTypes.STRING(),
        author: ModelPropTypes.STRING(),
        type: ModelPropTypes.STRING(),
        body: ModelPropTypes.STRING(),
        blogImgSrc: ModelPropTypes.STRING(),
        blogImgFilePath: ModelPropTypes.STRING(),
        lastUpdated: ModelPropTypes.DATE(),
        publishedDate: ModelPropTypes.DATE(),
        numberOfComments: ModelPropTypes.NUMBER(),
        publish: ModelPropTypes.BOOLEAN(),
        blogInstanceTags: ModelPropTypes.ARRAY(),
        metaList: ModelPropTypes.ARRAY({
            type: ModelPropTypes.STRING(),
            value: ModelPropTypes.STRING(),
        }),
    };

    static defaultProps: IBlog = {
        blogImgSrc: '',
        blogImgFilePath: '',
        subTitle: '',
        type: 'TINYMCE',
        body: '',
        title: '',
        publish: false,
        metaList: [],
    };

    static resourceName : string = 'blog';

    static columnNames : string[] = [
        'id',
        'title',
        'subTitle',
        'author',
        'lastUpdated',
        'publishedDate',
        'type',
        'publish',
    ];

    getHTMLLastUpdated (instance: IBlog): JSX.Element {
        return(
            <span>{moment(instance.lastUpdated).format('DD-MM-YYYY HH:mm:ss')}</span>
        );
    }

    static uploadImage(image: any): Axios.IPromise<Axios.AxiosXHR<IFileUploadResponse>> {
        let data: FormData = new FormData();
        data.append('file', image);

        return HTTP.postRequest('temporary-upload/action/index', {'content-type': 'multipart/form-data;'}, data);
    }

    static fetchMetaTypeList(): Axios.IPromise<Axios.AxiosXHR<IAxiosResponse>> {
        return HTTP.getRequest('page/action/getMetaTypeList', getDefaultHeaders());
    }

    constructor(properties: IBlog) {
        super(properties);
    }
}
