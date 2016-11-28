import {BaseModel, ModelPropTypes} from 'react-hero';

export class BlogModel extends BaseModel {
    
    static propTypes = {
        lastUpdated: ModelPropTypes.DATE(),
        blogImgSrc: ModelPropTypes.STRING(),
        subTitle: ModelPropTypes.STRING(),
        author: ModelPropTypes.STRING(),
        id: ModelPropTypes.NUMBER(),
        publishDate: ModelPropTypes.DATE(),
        body: ModelPropTypes.STRING(),
        title: ModelPropTypes.STRING(),
        numberOfComments: ModelPropTypes.NUMBER()

    };

    static defaultProps = {
        lastUpdated: '',
        blogImgSrc: '',
        subTitle: '',
        author: '',
        id: 0,
        publishDate: '',
        body: '',
        title: '',
        numberOfComments: 0
    };

    static resourceName: string = 'blog';

    static columnNames: string[] = [
            'title',
            'lastUpdated',
            'author',
            'numberOfComments',
            'blogImgSrc',
            'body'
    ];
}
