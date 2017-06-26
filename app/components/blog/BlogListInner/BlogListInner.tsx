import * as React from 'react';
import * as Radium from 'radium';
import {BlogSummary} from '../BlogSummary/BlogSummary';
import {IInstanceList} from '../../../interfaces/blogInterfaces';
import {defaultTextColor} from '../../../constants';
import {CSS} from '../../../interfaces';

export interface IBlogListInnerProps {
    blogList: IInstanceList;
    fetched: boolean;
}

@Radium
export class BlogListInner extends React.Component<IBlogListInnerProps, void> {
    private list: Element[];

    componentDidMount = (): void => {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps = (nextProps): void =>  {
        if (nextProps.blogList && nextProps.blogList.instanceList) {
            this.list = nextProps.blogList.instanceList.map((instance, index) => {
                let loadCommentCount: boolean = index === 0 ? true : false;
                return <BlogSummary
                            key={index}
                            instanceData={instance.properties}
                            loadCommentCount={loadCommentCount}
                        />;
            });
        }
    }

    getBlogInstanceList() {
        return this.list;
    }

    render(): JSX.Element {
        if (this.props.fetched && this.props.blogList && this.props.blogList.totalCount === 0) {
            return(
                <h4>No results found</h4>
            );
        }
        return (
            <div style={container}>
                {this.props.fetched ? this.getBlogInstanceList() : <h3>Loading...</h3>}
            </div>
        );
    }
}

const container: CSS = {
    color: defaultTextColor,
};
