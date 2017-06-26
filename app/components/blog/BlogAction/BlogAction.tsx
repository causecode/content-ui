import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../../interfaces';
import {IBlog} from '../../../models/BlogModel';
import {convertToFriendlyUrl} from '../../../utils';
import {Link, FontAwesomeRadium} from '../../reusableComponents/reusableComponents';

export interface IBlogActionProps {
    instance?: IBlog;
    deleteBlog?: (id: number) => void;
}

@Radium
export class BlogAction extends React.Component<IBlogActionProps, void> {

    render(): JSX.Element {
        if (this.props.instance) {
            return (
                <span>
                    <Link to={`/admin/blog/edit/${this.props.instance.id}`}>
                        <FontAwesomeRadium name="pencil" />
                    </Link>
                    <Link to={`/blog/${this.props.instance.id}/${convertToFriendlyUrl(this.props.instance.title)}`}>
                        <FontAwesomeRadium name="location-arrow" />
                    </Link>
                    <a
                            onClick={() => {this.props.deleteBlog(this.props.instance.id);}}
                            style={trashIconStyle}
                            id={`${this.props.instance.id}`}>
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
