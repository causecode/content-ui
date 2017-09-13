import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';
import {IBlog} from '../../models/BlogModel';
import {convertToFriendlyUrl} from '../../utils';
import {Link, FontAwesomeRadium} from '../reusable-components/reusableComponents';

export interface IBlogActionProps {
    instance?: IBlog;
    deleteBlog?: (id: number) => void;
}

@Radium
export class BlogAction extends React.Component<IBlogActionProps, void> {

    render(): JSX.Element {
        const {instance, deleteBlog} = this.props;
        
        if (instance) {
            return (
                <span>
                    <Link to={`/blog/edit/${instance.id}/${convertToFriendlyUrl(instance.title)}`}>
                        <FontAwesomeRadium name="pencil" />
                    </Link>
                    <Link to={`/blog/${instance.id}/${convertToFriendlyUrl(instance.title)}`}>
                        <FontAwesomeRadium name="location-arrow" />
                    </Link>
                    <a
                            onClick={() => {deleteBlog(instance.id);}}
                            style={trashIconStyle}
                            id={`${instance.id}`}>
                        <FontAwesomeRadium name="trash" />
                    </a>
                </span>
            );
        }

        return null;
    }
}

const trashIconStyle: CSS = {
    color: '#337ab7',
    cursor: 'pointer',
    textDecoration: 'none',
};
