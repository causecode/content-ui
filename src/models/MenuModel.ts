import {BaseModel, ModelPropTypes} from 'react-hero';

export class MenuModel extends BaseModel {
    
    static propTypes = {
        id: ModelPropTypes.NUMBER(),
        dateCreated: ModelPropTypes.DATE(),
        lastUpdated: ModelPropTypes.DATE(),
        name: ModelPropTypes.STRING(),
        roles: ModelPropTypes.STRING(),
        showOnlyWhenLoggedIn: ModelPropTypes.BOOLEAN(),
    };

    static defaultProps = {
        id: 0,
        name: '',
        dateCreated: '',
        lastUpdated: '',
    };

    static resourceName: string = 'menu';

    static columnNames: string[] = [
        'name',
        'dateCreated',
        'lastUpdated',
    ];

    constructor(properties) {
        super(properties);
    }
}
