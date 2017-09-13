import * as React from 'react';
import * as Radium from 'radium';
import {BlogSummary} from './BlogSummary';
import {Spinner} from '../common/Spinner';
import {IInstanceList} from '../../interfaces';
import {defaultTextColor} from '../../constants';
import {CSS} from '../../interfaces';

export interface IBlogListInnerProps {
    blogList: IInstanceList;
    fetched: boolean;
    appId: string;
}

@Radium
export class BlogListInner extends React.Component<IBlogListInnerProps, void> {
    private list: Element[];

    componentWillMount = (): void => {
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
                            appId={this.props.appId}
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
                {this.props.fetched ? this.getBlogInstanceList() : <Spinner />}
            </div>
        );
    }
}

const container: CSS = {
    color: defaultTextColor,
};
