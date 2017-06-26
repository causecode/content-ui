import * as React from 'react';
import {scrollToTop} from 'react-hero';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {CSS} from '../../../interfaces';
import {getMonthFromNumber, isEmpty} from '../../../utils';
import {Grid, Row, Col} from '../../../components/reusableComponents/reusableComponents';
import {BlogListInner} from '../../../components/blog/BlogListInner/BlogListInner';
import {IInstanceList} from '../../../interfaces/blogInterfaces';
import {BlogSideBar} from '../../../components/blog/BlogSideBar/BlogSideBar';
import {BlogPagination} from '../../../components/blog/BlogPagination/BlogPagination';
import {ReactHelmet} from '../../../components/common/ReactHelmet/ReactHelmet';
import {defaultTextColor, blogMetaData} from '../../../constants';
import {BlogModel} from '../../../models';

export interface IBlogRouteParams {
    filter: string;
    value: string;
}

export interface IBlogListProps extends RouteComponentProps<IBlogRouteParams> {
    blogList: IInstanceList;
    currentPage: number;
    fetched: boolean;
}

export interface IBlogListState {
    filters: {queryFilter: string, monthFilter: string, tag: string};
}

class BlogListImpl extends React.Component<IBlogListProps, IBlogListState> {
    constructor() {
        super();
        this.state = {filters: {queryFilter: '', monthFilter: '', tag: ''}};
    }

    componentWillMount = (): void => {
        scrollToTop();
        this.fetchBlogList();
        this.updatePage();
    }

    componentDidUpdate = (): void => {
        scrollToTop();
    }

    componentWillUnmount = (): void => {
        window.removeEventListener('popstate', this.handler);
    }

    handler = (): void => {
        if (window.location.href.indexOf('blogs') !== -1) {
            this.fetchBlogList();
            return;    
        }
    }

    updatePage = (): void => {
        window.addEventListener('popstate', this.handler);
    }

    fetchBlogList = (): void => {
        let parameters: {filter: string, value: string} = this.props.match.params;
            if (!isEmpty(parameters)) {
                if (parameters.filter === 'page') {
                    const page: number = parameters.value ? Number(parameters.value) : 1;
                    const offset = (page - 1) * 10;
                    BlogModel.list({max: 10, offset: offset, page: page});
                } else if (parameters.filter === 'tag') {
                    let tag: string = parameters.value ? parameters.value : 'grails';
                    BlogModel.list({max: 10, offset: 0, tag: tag});
                } else if (parameters.filter === 'searchQuery') {
                    let searchValue = parameters.value ? parameters.value : 'grails';
                    BlogModel.list({max: 10, offset: 0, queryFilter: searchValue});
                } else {
                    let year: number = parameters.filter ? parseInt(parameters.filter, 10) : 0;
                    let month: string = parameters.value ? getMonthFromNumber(parseInt(parameters.value, 10)) : '';
                    BlogModel.list({max: 10, offset: 0, monthFilter: `${month}-${year}`});
                }
            } else {
                BlogModel.list({max: 10, offset: 0});
            }
    }

    render(): JSX.Element {
        return (
            <Grid>
                <ReactHelmet pageTitle={blogMetaData.title} meta={blogMetaData} />
                <h1 style={title}>Blogs</h1>
                <Row style={rowStyle}>
                    <Col md={8} sm={8} xs={12}>
                        <BlogListInner fetched={this.props.fetched} blogList={this.props.blogList} />
                        <BlogPagination
                                currentPage={
                                    this.props.match.params.filter && this.props.match.params.filter === 'page' 
                                    ? Number(this.props.match.params.value) : 1
                                }
                                total={this.props.blogList.totalCount}
                                show={this.props.fetched && this.props.blogList.totalCount > 10}
                        />
                    </Col>
                    <Col md={3} sm={4} xs={12} mdOffset={1} smOffset={0} xsOffset={0}>
                        <BlogSideBar />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const mutableState = state.data.toJS ? state.data.toJS() : state.data;
    
    return {
        blogList: mutableState.blogList ? mutableState.blogList : [],
        fetched: mutableState.blogList ? !mutableState.blogList.isLoading : false,
    };
}

let BlogList = connect<{}, {}, {IBlogListProps}>(mapStateToProps)(BlogListImpl);

export {BlogList};

const title: CSS = {
    fontFamily: 'Montserrat,sans-serif',
    fontWeight: 700,
    fontSize: '30px',
    margin: '10px 0px 10px',
    color: defaultTextColor,
};

const rowStyle: CSS = {
    paddingTop: '30px',
};
