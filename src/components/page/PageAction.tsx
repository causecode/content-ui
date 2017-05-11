import * as React from 'react';
import {IPage} from '../../models/PageModel';
import {Link} from 'react-router';
import FontAwesome = require('react-fontawesome');

export interface IPageActionProps {
    instance?: IPage;
}

export class PageAction extends React.Component<IPageActionProps, void> {

    render(): JSX.Element {
        let {instance} = this.props;

        return (
            <span>
                <Link to={`/page/edit/${instance.id}`}>
                    <FontAwesome name="pencil" />
                </Link>
                <Link to={`/page/show/${instance.id}`}>
                    <FontAwesome name="location-arrow" />
                </Link>
            </span>
        );
    }
}
