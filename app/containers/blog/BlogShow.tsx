import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {RouteComponentProps} from 'react-router';
import {scrollToTop} from 'react-hero';
import {Grid, Row, Col} from '../../components/reusable-components/reusableComponents';
import {BlogInstanceFull} from './BlogInstanceFull';
import {BlogSideBar} from './BlogSideBar';
import {CSS} from '../../interfaces';
import {BlogModel} from '../../models';

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
        BlogModel.get(this.props.params.article, false, {}, () => {}, () => {}, {}, null, {convertToMarkdown: true});
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

const mapStateToProps: MapStateToProps<{}, IBlogShowProps> = 
    (state, props: IBlogShowProps & RouteComponentProps<IBlogShowRouteProps>): {params: IBlogShowRouteProps} => {
    return {
        params: props.match.params,
    };
}

let BlogShow = connect<{}, {}, IBlogShowProps>(mapStateToProps)(BlogShowImpl);

export {BlogShow};

const blogShowPadding: CSS = {
    paddingTop: '30px',
};
