import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {Grid, Row, Col} from '../../../components/reusableComponents/reusableComponents';
import {BlogInstanceFull} from '../../../components/blog/BlogInstanceFull/BlogInstanceFull';
import {BlogSideBar} from '../../../components/blog/BlogSideBar/BlogSideBar';
import {CSS} from '../../../interfaces';
import {scrollToTop} from 'react-hero';
import {BlogModel} from '../../../models';

export interface IBlogShowProps {
    params: {article: string, title: string};
}

export interface IBlogShowRouteProps {
    article: string;
    title: string;
}

class BlogShowImpl extends React.Component<IBlogShowProps & RouteComponentProps<IBlogShowRouteProps>, void> {
    componentWillMount = (): void => {
        this.fetchBlog();
        document.cookie = `prevUrl=${window.location.href};path='/'`;
    }

    componentDidUpdate = (): void => {
        scrollToTop();
    }

    fetchBlog = (): void => {
        BlogModel.get(this.props.params.article, false, {}, () => {}, () => {}, {}, null, {convertToMarkDown: true});
    }

    render(): JSX.Element {
        return (
            <Grid style={blogShowPadding}>
                <Row style={blogShowPadding}>
                    <Col md={8} sm={8} xs={12}><BlogInstanceFull id={this.props.params.article} /></Col>
                    <Col md={3} sm={4} xs={12} mdOffset={1} smOffset={0} xsOffset={0}>
                        <BlogSideBar />
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        params: props.match.params,
    };
}

let BlogShow = connect<{}, {}, IBlogShowProps>(mapStateToProps)(BlogShowImpl);

export {BlogShow};

const blogShowPadding: CSS = {
    paddingTop: '30px',
};
