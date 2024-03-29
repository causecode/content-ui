import * as React from 'react';
import * as Radium from 'radium';
import {RouteComponentProps, withRouter} from 'react-router';
import {CSS} from '../../interfaces';
import {causecodeOrange, blogLinksOrange} from '../../constants';
import {BlogModel} from '../../models';
import {Pagination} from '../reusable-components/reusableComponents';
import {IBlogRouteParams} from '../../containers/blog/BlogList';
import {getMonthFromNumber, isEmpty} from '../../utils';

export interface IBlogPaginationState {
    activePage?: number;
    size?: number;
}

export interface IBlogPaginationProps {
    show?: boolean;
    total?: number;
    currentPage?: number;
}

@Radium
export class BlogPaginationImpl extends React.Component<IBlogPaginationProps & RouteComponentProps<IBlogRouteParams>,
IBlogPaginationState> {
    constructor() {
        super();
        this.state = {activePage: 1, size: 0};
    }

    componentWillReceiveProps = (newProps): void => {
        let newPropFilter: string = newProps.match.params.filter;
        let ownPropFilter: string = this.props.match.params.filter;
        if (newPropFilter && ownPropFilter && ownPropFilter === newPropFilter) {
            this.setState({
                size: Math.ceil(newProps.total / 10),
            });
        } else {
            this.setState({
                size: Math.ceil(newProps.total / 10),
                activePage: newProps.currentPage,
            });
        }
    }

    displayPage = (page: number): void => {
        let offSet: number = (page - 1) * 10;
        let parameters = this.props.match.params;
        if (!isEmpty(parameters)) {
            if (parameters.filter === 'page') {
                this.props.history.push(`/blogs/page/${page}`);
                BlogModel.list({max: 10, offset: offSet});
            } else if (parameters.filter === 'searchQuery') {
                let searchValue = parameters.value ? parameters.value : 'grails';
                BlogModel.list({max: 10, offset: offSet, queryFilter: searchValue});
            } else if (parameters.filter === 'tag') {
                let tag: string = parameters.value ? parameters.value : 'grails';
                BlogModel.list({max: 10, offset: offSet, tag: tag});
            } else {
                let year: number = parameters.filter ? parseInt(parameters.filter, 10) : 0;
                let month: string = parameters.value ? getMonthFromNumber(parseInt(parameters.value, 10)) : '';
                BlogModel.list({max: 10, offset: offSet,  monthFilter: `${month}-${year}`});
            }
        } else {
            this.props.history.push(`/blogs/page/${page}`);
            BlogModel.list({max: 10, offset: offSet});
        }
        window.scrollTo(0, 0);
    }

    getPage = (eventKey): void => {
        this.setState({
            activePage: eventKey,
        });
        this.displayPage(eventKey);
    }

    render(): JSX.Element {
        if (!this.props.show) {
            return (<span></span>);
        }

        return (
            <div style={paginationContainer}>
                <Pagination
                        prev={true}
                        next={true}
                        first={true}
                        last={true}
                        style={paginationStyle}
                        ellipsis={true}
                        boundaryLinks={true}
                        items={this.state.size}
                        maxButtons={5}
                        activePage={this.state.activePage}
                        onSelect={this.getPage}
                />
                <Radium.Style
                        scopeSelector=".pagination>.active"
                        rules={{
                            span: {
                                backgroundColor: blogLinksOrange,
                                borderColor: blogLinksOrange,
                            },
                            a: {
                                backgroundColor: blogLinksOrange,
                                borderColor: blogLinksOrange,
                            },
                            'a:hover': {
                                backgroundColor: causecodeOrange,
                                borderColor: causecodeOrange,
                            },
                            'a:focus': {
                                backgroundColor: causecodeOrange,
                                borderColor: causecodeOrange,
                            },
                            'span:focus': {
                                backgroundColor: causecodeOrange,
                                borderColor: causecodeOrange,
                            },
                            'span:hover': {
                                backgroundColor: causecodeOrange,
                                borderColor: causecodeOrange,
                            },
                        }}
                />
                <Radium.Style
                        scopeSelector=".pagination>li"
                        rules={{
                            a: {
                                color: blogLinksOrange,
                            },
                            'a:hover': {
                                color: causecodeOrange,
                            },
                            span: {
                                color: blogLinksOrange,
                            },
                            'span:hover': {
                                color: causecodeOrange,
                            },
                            'span:focus': {
                                color: causecodeOrange,
                            },
                        }}
                />
            </div>
        );
    }
}

// tslint:disable variable-name
export const BlogPagination: React.ComponentClass<IBlogPaginationProps> = withRouter(BlogPaginationImpl);

const paginationContainer: CSS = {
    margin: '45px 0px',
};

const paginationStyle: CSS = {
    listStyle: 'none',
    display: 'inline-block',
    padding: '0px',
};
