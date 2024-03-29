import * as React from 'react';
import {connect, MapStateToProps} from 'react-redux';
import {BlogSearchBar} from '../../components/blog/BlogSearchBar';
import {BlogGetConnectedBar} from '../../components/blog/BlogGetConnectedBar';
import {BlogArchiveSection} from '../../components/blog/BlogArchiveSection';
import {BlogTags} from '../../components/blog/BlogTags';

export interface IBlogSideBarProps {
    tagList?: (string | number)[][];
    monthList?: string[];
}

export class BlogSideBarImpl extends React.Component<IBlogSideBarProps, void> {
    render(): JSX.Element {
        return (
            <section>
                <BlogSearchBar />
                <BlogGetConnectedBar />
                <BlogArchiveSection monthList={this.props.monthList} />
                <BlogTags tagList={this.props.tagList} />
            </section>
        );
    }
}

const mapStateToProps: MapStateToProps<{}, IBlogSideBarProps> =
        (state) : {monthList : string[], tagList: (string | number)[][]} => {
    const mutableState = state.data.toJS  ? state.data.toJS() : state.data;
    let monthList = [];
    let tagList = [];
    if (mutableState.blogList && mutableState.blogList.monthFilterList) {
        monthList = mutableState.blogList.monthFilterList;
        tagList = mutableState.blogList.tagList;
    } else if (mutableState.blogList && mutableState.blogList.instanceList) {
        monthList = mutableState.blogList.instanceList[0].properties.monthFilterList;
        tagList = mutableState.blogList.instanceList[0].properties.tagList;
    }

    return {
        monthList: monthList || [],
        tagList: tagList || [],
    };
};

// tslint:disable variable-name
export const BlogSideBar: React.ComponentClass<IBlogSideBarProps> =
        connect<{}, {}, {}>(mapStateToProps)(BlogSideBarImpl);
