import * as React from 'react';
import * as Radium from 'radium';
import * as DOMPurify from 'dompurify';
import {BlogComment} from '../BlogComment/BlogComment';
import {BlogCommentCount} from '../BlogCommentCount/BlogCommentCount';
import {BlogInstanceTags} from '../BlogInstanceTags/BlogInstanceTags';
import {IBlog} from '../../../models/BlogModel';
import {connect} from 'react-redux';
import {isLoggedIn} from '../../../utils';
import {FontAwesomeLink} from '../../layout/FontAwesomeLink/FontAwesomeLink';
import {CSS} from '../../../interfaces';
import {Button, FontAwesomeRadium} from '../../reusableComponents/reusableComponents';
import {firstThemeColor, defaultTextColor, linkStyle} from '../../../constants';
const moment = require<any>('moment');
import {ReactHelmet} from '../../common/ReactHelmet/ReactHelmet';

export interface IBlogInstanceFullProps {
    blogInstance?: IBlog;
    metaTags?: {content: string}[];
    id: string;
};

@Radium
export class BlogInstanceFullImpl extends React.Component<IBlogInstanceFullProps, void> {
    private facebookUrl: string = 'https://www.facebook.com/sharer/sharer.php?u=';
    private twitterUrl: string = 'https://twitter.com/intent/tweet?text=';
    private linkedinUrl: string = 'https://www.linkedin.com/shareArticle?url=';

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
    };

    getTwitterUrl = (title: string): string => {
        return `${this.twitterUrl}${encodeURIComponent(title + window.location.href)} via @causecode`;
    };

    getLinkedinUrl = (): string => {
        return `${this.linkedinUrl}${encodeURIComponent(window.location.href)}`;
    };

    renderEditButton = (id: number): JSX.Element => {
        return isLoggedIn() ? <FontAwesomeLink style={[linkStyle, {fontSize: '20px'}]} to={`/admin/blog/edit/${id}`}
                iconName="edit" /> : null;
    }

    render(): JSX.Element {
        let blog: IBlog = this.props.blogInstance;
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
                    {this.renderEditButton(blog.id)}
                    <div>
                        <ul style={metaList} className="list-inline">
                            <li>{blog ? moment(blog.publishedDate).format('MMM D, YYYY') : 'Loading...'}</li>
                            <li>/</li>
                            <li>{blog ? blog.author : 'Loading...'}</li>
                            <li className="pull-right">
                                <BlogCommentCount blogInstance={blog} loadCommentCount={true} />
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
                                color: firstThemeColor,
                                fontSize: '16px',
                                fontFamily: 'Lato, arial, sans-serif',
                            },
                            'a:hover': {
                                transition: '0.4s all ease-in-out',
                                textDecoration: 'none',
                                color: '#a26f02',
                            },
                        }}
                        />
                    <div className="divContent"
                            dangerouslySetInnerHTML={this.htmlToText(blog ? blog.body : 'Loading...') } />
                </section>
                <section>
                    <BlogInstanceTags blogInstanceTagList={blog ? blog.blogInstanceTags : []} />
                </section>
                <section>
                    <h2 style={title}>Comments</h2>
                    <BlogComment blogInstance={this.props.blogInstance} />
                </section>
            </section>
        );
    }
};

let BlogInstanceFull = connect<{}, {}, IBlogInstanceFullProps>((store, ownProps) => {
    const mutableState = store.data.toJS ? store.data.toJS() : store.data;
    let instanceData: IBlog;
    let metaList: string[];
    if (mutableState.blogList && mutableState.blogList.instanceList) {
        mutableState.blogList.instanceList.every((instance, i) => {
            let properties = instance[`properties`];
            if (properties.id == ownProps.id) {
                instanceData = instance.properties;
                metaList = instance.properties.metaList;
                return false;
            }
            return true;
        });
    }

    return {
        blogInstance: instanceData ? instanceData : [],
        metaTags: metaList ? metaList : [],
    };
    
})(BlogInstanceFullImpl);

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

