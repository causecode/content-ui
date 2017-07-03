jest.unmock('../BlogInstanceTags');

import * as React from 'react';
import {BlogInstanceTags, IBlogInstanceTagsProps} from '../BlogInstanceTags';
import {ShallowWrapper, shallow} from 'enzyme';
import {blogInstance} from '../../../tests/BlogTestData';

describe('Test cases for BlogInstanceTags', (): void => {

    let tagList: string[] = blogInstance.blogInstanceTags;
    let blogInstanceTags: ShallowWrapper<IBlogInstanceTagsProps, void> = shallow<IBlogInstanceTagsProps, void>(
            <BlogInstanceTags blogInstanceTagList={tagList} />
    );

    blogInstanceTags.setProps({
        blogInstanceTagList: ['Algorithm', 'React'],
    });

    it('should render all tags', (): void => {
        expect(blogInstanceTags.find('span').length).toBe(2);
    });
});
