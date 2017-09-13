import * as React from 'react';
import * as Radium from 'radium';
import * as DOMPurify from 'dompurify';
const moment = require<any>('moment');
import { connect, MapStateToProps } from 'react-redux';
import {BlogComment} from '../../components/blog/BlogComment';
import {BlogCommentCount} from '../../components/blog/BlogCommentCount';
import {BlogInstanceTags} from '../../components/blog/BlogInstanceTags';
import {BlogModel, IBlog} from '../../models/BlogModel';
import {isLoggedIn, convertToFriendlyUrl} from '../../utils';
import {FontAwesomeLink} from '../../components/layout/FontAwesomeLink';
import {CSS} from '../../interfaces';
import {Button, FontAwesomeRadium} from '../../components/reusable-components/reusableComponents';
import {blogLinksOrange, causecodeOrange, defaultTextColor, linkStyle} from '../../constants';
import {ReactHelmet} from '../../components/common/ReactHelmet';

export interface IBlogInstanceFullProps {
    blogInstance?: IBlog;
    metaTags?: {content: string}[];
    id: string;
    appId: string;
}

@Radium
export class BlogInstanceFullImpl extends React.Component<IBlogInstanceFullProps, void> {
    private facebookUrl: string = 'https://www.facebook.com/sharer/sharer.php?u=';
    private twitterUrl: string = 'https://twitter.com/intent/tweet?text=';
    private linkedinUrl: string = 'https://www.linkedin.com/shareArticle?url=';

    componentDidMount = (): void => {
        scroll(0, 0);
    }

    htmlToText = (html: string): {__html : string} => {
        return {__html: DOMPurify.sanitize(html)};
    }

    displayPopup = (url: string): boolean => {
        let width: number = 500, height: number = 600;
        let left: number = (screen.width / 2) - (width / 2);
        let top: number = (screen.height / 2) - (height / 2);
        window.open(url, 'Share', `height=${height},width=${width},top=${top},left=${left}`);
        return false;
    }

    getFacebookUrl = (): string => {
        return `${this.facebookUrl}https://causecode.com`;
    }

    getTwitterUrl = (title: string): string => {
        return `${this.twitterUrl}${encodeURIComponent(title + window.location.href)} via @causecode`;
    }

    getLinkedinUrl = (): string => {
        return `${this.linkedinUrl}${encodeURIComponent(window.location.href)}`;
    }

    renderEditLink = (id: number, title: string): JSX.Element => {
        return (
            <FontAwesomeLink
                    style={[linkStyle, {fontSize: '20px'}]}
                    to={`/blog/edit/${id}/${convertToFriendlyUrl(title)}`}
                    iconName="edit"
            />
        );
    }

    render(): JSX.Element {
        const blog: IBlog = this.props.blogInstance;
        if (!blog) {
            return <h4>Not Found</h4>;
        }
        let keywords: string = (this.props.metaTags && this.props.metaTags[0] &&
                this.props.metaTags[0].content) || 'CauseCode, Blog';
        return (
            <section style={blogInstanceFullStyle}>
                <ReactHelmet
                        pageTitle={blog.title}
                        meta={{ title: blog.title, description: `${blog.title} ${blog.subTitle}`, keywords}}
                />
                <section>
                    <h1 style={title}>{blog ? blog.title : 'Loading...'}</h1>
                    {isLoggedIn() && this.renderEditLink(blog.id, blog.title)}
                    <div>
                        <ul style={metaList} className="list-inline">
                            <li>{blog ? moment(blog.publishedDate).format('MMM D, YYYY') : 'Loading...'}</li>
                            <li>/</li>
                            <li>{blog ? blog.author : 'Loading...'}</li>
                            <li className="pull-right">
                                <BlogCommentCount
                                        blogInstance={blog}
                                        loadCommentCount={true}
                                        appId={this.props.appId}
                                />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <Button
                                bsStyle="primary"
                                style={[socialShare, fbShare]}
                                onClick={this.displayPopup.bind(this, this.getFacebookUrl())}>
                            <FontAwesomeRadium name="facebook" />
                        </Button>
                        <Button
                                bsStyle="primary"
                                style= {[socialShare, twitterShare]}
                                onClick={this.displayPopup.bind(this, this.getTwitterUrl(blog.title))}>
                            <FontAwesomeRadium name="twitter" />
                        </Button>
                        <Button
                                bsStyle="primary"
                                style={[socialShare, linkedinShare]}
                                onClick={this.displayPopup.bind(this, this.getLinkedinUrl())}>
                            <FontAwesomeRadium name="linkedin" />
                        </Button>
                    </div>
                </section>
                <hr />
                <section>
                    {/* TODO Figure out the way to apply style using objects. */}
                    <Radium.Style
                        scopeSelector=".divContent"
                        rules={{
                            p: {
                                fontFamily: 'Lato,arial,sans-serif',
                                color: defaultTextColor,
                                fontSize: '16px',
                            },
                            pre: {
                                display: 'block',
                                padding: '9.5px',
                                margin: '0px 0px 10px',
                                fontSize: '13px',
                                lineHeight: '1.42857143',
                                color: '#333',
                                wordBreak: 'break-all',
                                wordWrap: 'break-word',
                                backgroundColor: '#f5f5f5',
                                border: '1px solid #ccc',
                                borderRadius: '4px',
                            },
                            code: {
                                adding: '2px 4px',
                                fontSize: '90%',
                                color: '#c7254e',
                                backgroundColor: '#f9f2f4',
                                whiteSpace: 'nowrap',
                                borderRadius: '4px',
                            },
                            img: {
                                width: 'auto',
                                height: 'auto',
                                maxWidth: '100%',
                            },
                            h2: {
                                fontWeight: 'bold',
                                fontSize: '28px',
                                marginBottom: '15px',
                                color: defaultTextColor,
                            },
                            h3: {
                                fontWeight: 'bold',
                                fontSize: '24px',
                                margin: '20px 0px 10px 0px',
                                color: defaultTextColor,
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
                        }}
                    />
                    <div
                            className="divContent"
                            dangerouslySetInnerHTML={this.htmlToText(blog ? blog.body : 'Loading...') }
                    />
                </section>
                <section>
                    <BlogInstanceTags blogInstanceTagList={blog ? blog.blogInstanceTags : []} />
                </section>
                <section>
                    <h2 style={title}>Comments</h2>
                    <BlogComment blogInstance={this.props.blogInstance} appId={this.props.appId} />
                </section>
            </section>
        );
    }
}
const mapStateToProps: MapStateToProps<{}, IBlogInstanceFullProps> =
    (store, ownProps : IBlogInstanceFullProps) : {blogInstance : IBlog, metaTags: any} => {

    const blogInstance = BlogModel.get(ownProps.id, true);

    return {
        blogInstance: (blogInstance && blogInstance.properties) || null,
        metaTags: (blogInstance && blogInstance.properties.metaList) || null,
    };
};
let BlogInstanceFull = connect<{}, {}, IBlogInstanceFullProps>(mapStateToProps)(BlogInstanceFullImpl);

export {BlogInstanceFull};

const blogInstanceFullStyle: CSS = {
    marginBottom: '60px',
};

const title: CSS = {
    margin: '0px 0px 15px 0px',
    fontSize: '28px',
    fontFamily: 'Montserrat,sans-serif',
    fontWeight: 700,
    color: defaultTextColor,
};

const metaList: CSS = {
    color: '#adadad',
    fontFamily: 'Lato,arial,sans-serif',
    fontSize: '13px',
    padding: '5px 0px',
};

const socialShare: CSS = {
    fontSize: '22px',
    textAlign: 'center',
    height: '41px',
    verticalAlign: 'middle',
    width: '50px',
    marginRight: '5px',
    borderRadius: '0px',
};

const fbShare: CSS = {
    background: '#3b5998',
    border: '1px solid rgb(53, 126, 189)',
    ':hover': {
        transition: 'all .4s ease-in',
        background: '#3276b1',
        border: '1px solid #285e8e',
    },
};

const twitterShare: CSS = {
    background: '#5bc0de',
    border: '1px solid rgb(70, 184, 218)',
    ':hover': {
        transition: 'all .4s ease-in',
        background: '#39b3d7',
        border: '1px solid #269abc',
    },
};

const linkedinShare: CSS = {
    background: '#1b86bc',
    border: '1px solid rgba(0, 0, 0, 0)',
    ':hover': {
        transition: 'all .4s ease-in',
        background: '#286090',
    },
};
