import * as React from 'react';
import {IPage} from '../../models/PageModel';
import FontAwesome = require('react-fontawesome');

export interface IPageActionProps {
    instance?: IPage;
}

export class PageAction extends React.Component<IPageActionProps, void> {

    render(): JSX.Element {
        let {instance} = this.props;
        return (
            <td>
                <a href={`/page/edit/${instance.id}`}>
                    <FontAwesome name="pencil" />
                </a>
                <a href={`/page/show/${instance.id}`}>
                    <FontAwesome name="location-arrow" />
                </a>
            </td>
        );
    }
}
