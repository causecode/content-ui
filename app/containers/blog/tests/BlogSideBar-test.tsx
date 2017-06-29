jest.unmock('../BlogSideBar');

import * as React from 'react';
import {fromJS} from 'immutable';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogSideBar, IBlogSideBarProps, BlogSideBarImpl} from '../../../containers/blog/BlogSideBar';
import {BlogSearchBar} from '../../../components/blog/BlogSearchBar';
import {BlogTags} from '../../../components/blog/BlogTags';
import {BlogGetConnectedBar} from '../../../components/blog/BlogGetConnectedBar';
import {BlogArchiveSection} from '../../../components/blog/BlogArchiveSection';
import {configureStore} from 'react-hero';

describe('Test cases for BlogSideBar', (): void => {
    let blogSideBarImpl: ShallowWrapper<IBlogSideBarProps, void> = shallow<IBlogSideBarProps, void>(
        <BlogSideBarImpl />
    );

    it('should render components', (): void => {
        expect(blogSideBarImpl.find(BlogTags).length).toBe(1);
        expect(blogSideBarImpl.find(BlogSearchBar).length).toBe(1);
        expect(blogSideBarImpl.find(BlogGetConnectedBar).length).toBe(1);
        expect(blogSideBarImpl.find(BlogArchiveSection).length).toBe(1);
    });

    it('should fetch data from redux store when store is mutable and BlogShow is direct hit', (): void => {
        let mutableStore = configureStore({
        data: {
            blogList: {
                instanceList: [
                {
                    properties: { 
                    monthFilterList: ['2013-04', '2016-07'],
                        tagList: [
                            [1, 'grails'],
                            [2, 'javascript'],
                        ]},
                }],
            },
        }});
        
        let blogSideBar: ShallowWrapper<IBlogSideBarProps, void> = shallow<IBlogSideBarProps, void>(
            <BlogSideBar store={mutableStore}/>
        );
        expect(blogSideBar.prop('monthList').length).toBe(2);
        expect(blogSideBar.prop('tagList').length).toBe(2);
    });

    it('should fetch data from redux store when store is mutable', (): void => {
        let mutableStore = configureStore({
        data: {
            blogList: {
                monthFilterList: ['2013-04', '2016-07'],
                tagList: [
                    [1, 'grails'],
                    [2, 'javascript'],
                ],
            },
        }});
        let blogSideBar: ShallowWrapper<IBlogSideBarProps, void> = shallow<IBlogSideBarProps, void>(
            <BlogSideBar store={mutableStore}/>
        );
        expect(blogSideBar.prop('monthList').length).toBe(2);
        expect(blogSideBar.prop('tagList').length).toBe(2);
    });

    it('should fetch data from redux store when store is immutable', (): void => {
        let immutableStore = configureStore({
            data : fromJS({
                    blogList: {
                        monthFilterList: ['2013-04', '2016-07'],
                        tagList: [
                            [1, 'grails'],
                            [2, 'javascript'],
                        ],
                    },
                }
            )});
        let blogSideBar: ShallowWrapper<IBlogSideBarProps, void> = shallow<IBlogSideBarProps, void>(
            <BlogSideBar store={immutableStore}/>
        );
        expect(blogSideBar.prop('monthList').length).toBe(2);
        expect(blogSideBar.prop('tagList').length).toBe(2);
    });

    
});
