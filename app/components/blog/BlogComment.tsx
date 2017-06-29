import * as React from 'react';
import {IBlog} from '../../models/BlogModel';
import {convertToFriendlyUrl} from '../../utils';
import {FBComments} from './FBComments';

export interface IBlogComment {
    blogInstance: IBlog;
}
export interface IBlogCommentConfig {
    url: string;
    title: string;
}

export class BlogComment extends React.Component<IBlogComment, void> {
    createBlogCommentCountUrl = (): IBlogCommentConfig => {
        let {id, title} = this.props.blogInstance;
        /**
         * Using location.protocol and location.host to make sure that
         * FBComments uses fully qualified url.
         */
        let url: string = `${location.protocol}//${location.host}/blog/${id}/${convertToFriendlyUrl(title)}`;

        return {url, title};
    }

    render(): JSX.Element {
        let blogCommentUrl: {
            url: string,
            title: string
        } = this.createBlogCommentCountUrl();

        return (
            <div>
                <FBComments
                        appId="235916853233988"
                        width={750}
                        numPosts={5}
                        mobile={true}
                        locale="en_US"
                        href={blogCommentUrl.url}
                />
            </div>
        );
    }
};
