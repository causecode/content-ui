import {BaseModel, ModelPropTypes} from 'react-hero';

export class PageModel extends BaseModel {
    
    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        author: ModelPropTypes.STRING(),
        body: ModelPropTypes.STRING(),
        dateCreated: ModelPropTypes.DATE(),
        lastUpdated: ModelPropTypes.DATE(),
        pageLayout: ModelPropTypes.STRING(),
        publish: ModelPropTypes.BOOLEAN(),
        publishedDate: ModelPropTypes.DATE(),
        subTitle: ModelPropTypes.STRING(),
        title: ModelPropTypes.STRING(),
    };

    static defaultProps = {
        id: 0,
        author: '',
        body: '',
        dateCreated: '',
        lastUpdated: '',
        pageLayout: '',
        publish: false,
        publishDate: '',
        subTitle: '',
        title: '',
    };

    static resourceName: string = 'page';

    static columnNames: string[] = [
        'title',
        'subtitle',
        'publish',
    ];

    constructor(properties) {
        super(properties);
    }
}
