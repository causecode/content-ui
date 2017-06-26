import * as React from 'react';
import {connect} from 'react-redux';
import {BlogSearchBar} from '../BlogSearchBar/BlogSearchBar';
import {BlogGetConnectedBar} from '../BlogGetConnectedBar/BlogGetConnectedBar';
import {BlogArchiveSection} from '../BlogArchiveSection/BlogArchiveSection';
import {BlogTags} from '../BlogTags/BlogTags';

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

function mapStateToProps (state) {
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
}

let BlogSideBar = connect<{}, {}, {}>(mapStateToProps)(BlogSideBarImpl);

export {BlogSideBar};
