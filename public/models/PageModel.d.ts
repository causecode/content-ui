import { BaseModel, ModelPropTypes } from 'react-hero';
export interface IPage {
    id?: number;
    body?: string;
    publish?: boolean;
    publishedDate?: Date;
    subTitle?: string;
    title?: string;
}
export declare class PageModel extends BaseModel {
    static resourceName: string;
    static propTypes: {
        body: ModelPropTypes.IModelPropType;
        publish: ModelPropTypes.IModelPropType;
        publishedDate: ModelPropTypes.IModelPropType;
        subTitle: ModelPropTypes.IModelPropType;
        title: ModelPropTypes.IModelPropType;
    };
    static defaultProps: IPage;
    static columnNames: string[];
    constructor(properties: IPage);
}
