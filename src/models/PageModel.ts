import {BaseModel, ModelPropTypes} from 'react-hero';

export interface IPage {
    id?: number;
    body?: string;
    publish?: boolean;
    publishedDate?: Date;
    subTitle?: string;
    title?: string;
}

export class PageModel extends BaseModel {

    static resourceName: string = 'page';

    static propTypes = {
        body: ModelPropTypes.STRING,
        publish: ModelPropTypes.BOOLEAN,
        publishedDate: ModelPropTypes.DATE,
        subTitle: ModelPropTypes.STRING,
        title: ModelPropTypes.STRING,
    };

    static defaultProps: IPage = {
        body: '',
        publish: false,
        publishedDate: new Date(),
        subTitle: '',
        title: '',
    };

    static columnNames: string[] = [
        'title',
        'subTitle',
        'publishedDate',
    ];

    constructor(properties: IPage) {
        super(properties);
    }
}
