import * as React from 'react';
import * as Radium from 'radium';
import {Link, FontAwesomeRadium} from '../../reusableComponents/reusableComponents';
import {linkStyle} from '../../../constants';
import {CSS} from '../../../interfaces';
import {RouteComponentProps, withRouter} from 'react-router';
import {BlogModel} from '../../../models';

export interface IBlogTagsProps {
    tagList: (string | number)[][];
}

@Radium
export class BlogTagsImpl extends React.Component<IBlogTagsProps & RouteComponentProps<void>, void> {
    private list: JSX.Element[];

    componentWillMount = (): void => {
        if (this.props.tagList.length > 0 && !this.list) {
            this.publishTagList(this.props);
        }
    }

    componentWillReceiveProps = (nextProps): void => {
        this.publishTagList(nextProps);
    }

    publishTagList = (nextProps): void => {
        this.list = nextProps.tagList.map((tag, index) => {
            return (
                <li key={index} style={list}>
                    <Link
                            key={index}
                            style={linkStyle}
                            onClick={() => this.applyTagFilter(tag[1])}
                            to={`/blogs/tag/${tag[1]}`}>
                        {tag[1]}
                    </Link>
                </li>
            );
        });
    }

    getTagsList() {
        return this.list;
    }

    applyTagFilter = (tag): void => {
        BlogModel.list({max: 10, offset: 0, tag: tag});
    }

    removeTagFilter = (): void => {
        this.props.history.push('/blogs');
        BlogModel.list({max: 10, offset: 0});
    }

    render(): JSX.Element {
        return (
            <section style={blogTagsStyle}>
                <h3 style={title}>Tags</h3>
                <FontAwesomeRadium name="tags" />
                <ul className="list-inline">
                    <Link style={[linkStyle, list]} onClick={() => this.removeTagFilter()} to={'/blogs'}>
                        ALL
                    </Link>
                    {this.getTagsList()}
                </ul>
            </section>
        );
    }
}

let BlogTags = withRouter(BlogTagsImpl);

export {BlogTags};

const blogTagsStyle: CSS = {
    marginBottom: '60px',
};
const title: CSS = {
    fontSize: '22px',
    margin: '0px 0px 15px 0px',
    fontWeight: 'normal',
    color: '#666666',
};
const list: CSS = {
    padding: '0px',
    listStyle: 'none',
    margin: '2px 5px 10px 5px',
};
