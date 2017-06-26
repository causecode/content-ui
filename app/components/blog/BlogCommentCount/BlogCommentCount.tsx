import * as React from 'react';
import * as Radium from 'radium';
import {IBlog} from '../../../models/BlogModel';
import {FontAwesomeRadium} from '../../reusableComponents/reusableComponents';
import {linkStyle} from '../../../constants';
import {CSS} from '../../../interfaces';
import {convertToFriendlyUrl} from '../../../utils';
import {FBCommentsCount} from '../FBCommentsCount/FBCommentsCount';

export interface IBlogCommentCountProps {
    blogInstance: IBlog;
    style?: CSS;
    loadCommentCount?: boolean;
}
export interface IBlogCommentConfig {
    url: string;
    title: string;
}

export class BlogCommentCount extends React.Component<IBlogCommentCountProps, void> {


    createBlogCommentCountUrl = (): IBlogCommentConfig => {
        let {id, title} = this.props.blogInstance;
        /**
         * Using location.protocol and location.host to make sure that
         * FBCommentsCount uses fully qualified url.
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
            <span style={this.props.style || linkStyle}>
                <a href={blogCommentUrl.url} style={this.props.style || linkStyle}>
                    <FontAwesomeRadium name="comments" style={[this.props.style || linkStyle, paddingStyle]} />
                    <FBCommentsCount
                            appId="235916853233988"
                            href={blogCommentUrl.url}
                            locale="en_US"
                            loadCommentCount={this.props.loadCommentCount}
                    />
                    &nbsp;Comments
                </a>
            </span>
        );
    };
};

const paddingStyle: CSS = {
    padding: '0px 5px 0px 0px',
    cursor: 'pointer',
};

