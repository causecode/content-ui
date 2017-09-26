import * as React from 'react';
import * as Radium from 'radium';
import * as DOMPurify from 'dompurify';
import {IBlog} from '../../models/BlogModel';
import {BlogCommentCount} from './BlogCommentCount';
import {Link, FontAwesomeRadium} from '../reusable-components/reusableComponents';
import {linkStyle, defaultTextColor, causecodeOrange, blogLinksOrange} from '../../constants';
import {CSS} from '../../interfaces';
import {convertToFriendlyUrl, htmlToText} from '../../utils';
const moment = require<any>('moment');

export interface IBlogSummaryProps {
    instanceData: IBlog;
    loadCommentCount?: boolean;
    appId: string;
}

@Radium
export class BlogSummary extends React.Component<IBlogSummaryProps, void> {

    getBlogUrl = (blog: IBlog): string => {
        let friendlyUrl: string = convertToFriendlyUrl(blog.title);
        return `${blog.id}/${friendlyUrl}`;
    }

    render(): JSX.Element {
        return (
            <article style={blogSummaryStyle}>
                <div>
                    <h2 style={heading}>
                        <Link
                                style={headerLink}
                                to={`/blog/${this.getBlogUrl(this.props.instanceData)}`}
                        >
                            {this.props.instanceData.title}
                        </Link>
                    </h2>
                    <div>
                        <ul style={metaList} className="list-inline">
                            <li>{moment(this.props.instanceData.publishedDate).format('MMM D, YYYY') }</li>
                            <li>/</li>
                            <li>{this.props.instanceData.author}</li>
                            <li className="pull-right">
                                <BlogCommentCount
                                        blogInstance={this.props.instanceData}
                                        loadCommentCount={this.props.loadCommentCount}
                                        appId={this.props.appId}
                                />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <img style={blogImg} src={this.props.instanceData.blogImgSrc} />
                    </div>
                    <div>
                        <span style={summary}>
                         {/* TODO Figure out the way to apply style using objects. */}
                            <Radium.Style
                                    scopeSelector=".summaryContent"
                                    rules={{
                                        p: {
                                            fontFamily: 'Lato,arial,sans-serif',
                                            color: defaultTextColor,
                                            fontSize: '16px',
                                        },
                                        a: {
                                            color: blogLinksOrange,
                                            fontSize: '16px',
                                            fontFamily: 'Lato, arial, sans-serif',
                                        },
                                        'a:hover': {
                                            transition: '0.4s all ease-in-out',
                                            textDecoration: 'none',
                                            color: causecodeOrange,
                                        },
                                        span: {
                                            color: defaultTextColor,
                                        },
                                    }}
                            />
                            <span className="summaryContent"
                                    dangerouslySetInnerHTML={htmlToText(this.props.instanceData.body)} /> ...
                        </span>
                        <Link
                                style={[linkStyle, readMore]}
                                to={`/blog/${this.getBlogUrl(this.props.instanceData)}`}>
                            &nbsp;Read more
                            <FontAwesomeRadium style={paddingStyle} name="long-arrow-right" />
                        </Link>
                    </div>
                </div>
            </article>
        );
    }
}

const blogSummaryStyle: CSS = {
    marginBottom: '60px',
    fontFamily: 'Lato,arial,sans-serif',
};
const heading: CSS = {
    fontSize: '22px',
    fontFamily: 'Montserrat,sans-serif',
    fontWeight: 700,
    color: '#444',
};
const paddingStyle: CSS = {
    paddingLeft: '10px',
};
const headerLink: CSS = {
    color: defaultTextColor,
    textDecoration: 'none',
    ':hover': {
        color: causecodeOrange,
        background: 'white',
        textDecoration: 'none',
    },
    ':focus': {
        color: causecodeOrange,
        background: 'white',
        textDecoration: 'none',
    },
    ':active': {
        color: causecodeOrange,
        background: 'white',
        textDecoration: 'none',
    },
};
const metaList: CSS = {
    color: '#adadad',
    fontFamily: 'Lato,arial,sans-serif',
};
const readMore: CSS = {
    fontSize: '16px',
};
const blogImg: CSS = {
    borderRadius: '4px',
    maxWidth: '80%',
    height: 'auto',
    display: 'block',
    margin: '0px auto 15px auto',
};
const summary: CSS = {
    fontFamily: 'Lato,arial,sans-serif',
    color: '#444',
    fontSize: '16px',
};
