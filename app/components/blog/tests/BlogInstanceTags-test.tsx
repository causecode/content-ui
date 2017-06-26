jest.unmock('../BlogInstanceTags/BlogInstanceTags');

import * as React from 'react';

import {BlogInstanceTags, IBlogInstanceTagsProps} from '../BlogInstanceTags/BlogInstanceTags';
import {ShallowWrapper, shallow} from 'enzyme';
import {blogInstance} from '../../../tests/BlogTestData';

describe('Test cases for BlogInstanceTags', (): void => {

    let tagList: string[] = blogInstance.blogInstanceTags;
    let blogInstanceTags: ShallowWrapper<IBlogInstanceTagsProps, void> = shallow<IBlogInstanceTagsProps, void>(
        <BlogInstanceTags blogInstanceTagList={tagList} />
    );

    blogInstanceTags.instance().getBlogTagList = jest.fn();
    blogInstanceTags.instance().forceUpdate();

    it('should render all tags', (): void => {
        expect(blogInstanceTags.instance().getBlogTagList).toHaveBeenCalled();
    });
});
