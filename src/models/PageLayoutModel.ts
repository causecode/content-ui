import {BaseModel, ModelPropTypes} from 'react-hero';

export class PageLayoutModel extends BaseModel {
    
    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        layoutName: ModelPropTypes.STRING()

    };

    static defaultProps = {
        id: 0,
        layoutName: ''
    };

    static resourceName: string = 'pageLayout';

    static columnNames: string[] = [
            'layoutName'
    ];
}
