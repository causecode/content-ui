import * as React from 'react';
import * as Radium from 'radium';
import {RouteComponentProps, withRouter} from 'react-router';
import {Button, FormControl, FontAwesomeRadium} from '../reusable-components/reusableComponents';
import {CSS} from '../../interfaces';
import {buttonDefault, defaultButtonStyle} from '../../constants';
import {BlogModel} from '../../models';

export interface IBlogSearchState {
    query: string;
}

@Radium
export class BlogSearchBarImpl extends React.Component<RouteComponentProps<void>, IBlogSearchState> {
    constructor() {
        super();
        this.state = {query: ''};
    }

    // TODO figure out a way to solve typings issue for event.
    handleSearch = (event: any): void => {
        this.setState({
            query: event.target.value,
        });
    }

    searchBlog = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (this.state.query && this.state.query.trim().length > 0)  {
            BlogModel.list({queryFilter: this.state.query, max: 10, offset: 0});
            this.props.history.push(`/blogs/searchQuery/${this.state.query}`);
        } else {
            this.props.history.push('/blogs');
        }
    }

    render(): JSX.Element {
        return (
            <section style={blogSearchBarStyle}>
                <form onSubmit={this.searchBlog.bind(this)}>
                    <div style={form}>
                        <FormControl
                                type="text"
                                style={input}
                                onChange={this.handleSearch}
                                placeholder="Search blog..." />
                    </div>
                    <Button style={[buttonStyle, defaultButtonStyle]} onClick={this.searchBlog.bind(this)}>
                        <FontAwesomeRadium name="search" />
                    </Button>
                </form>
            </section>
        );
    }
}

// tslint:disable variable-name
export const BlogSearchBar: React.ComponentClass<void> = withRouter(BlogSearchBarImpl);

const blogSearchBarStyle: CSS = {
    marginBottom: '60px',
};

const buttonStyle: CSS = {
    height: '36px',
    padding: '6px 12px',
    margin: '0px 0px 0px 5px',
    '@media (min-width: 768px) and (max-width:1199px)': {
        margin: '5px 0px 0px 0px',
    },
};

const form: CSS = {
    display: 'inline',
    marginBottom: '0px',
};

const input: CSS = {
    ':focus': {
        borderColor: buttonDefault,
    },
    height: '36px',
    display: 'inline',
    maxWidth: '167px',
};
