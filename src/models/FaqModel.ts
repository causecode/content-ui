import {BaseModel, ModelPropTypes} from 'react-hero';

export class FaqModel extends BaseModel {
    
    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        author: ModelPropTypes.STRING(),
        body: ModelPropTypes.STRING(),
        dateCreated: ModelPropTypes.DATE(),
        lastUpdated: ModelPropTypes.DATE(),
        publish: ModelPropTypes.BOOLEAN(),
        publishDate: ModelPropTypes.DATE(),
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

    static resourceName: string = 'faq';

    static columnNames: string[] = [
        'title',
        'subTitle',
        'body',
        'publish',
    ];

    constructor(properties) {
        super(properties);
    }
}
