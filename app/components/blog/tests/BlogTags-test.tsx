jest.unmock('../BlogTags');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogTagsImpl, IBlogTagsProps} from '../BlogTags';
import {BlogModel} from '../../../models/BlogModel';

describe('Test cases for BlogSumamry', (): void => {
    let push: jest.Mock<void> = jest.fn<void>();
    let tagList: (number | string)[][] = [[1, 'algorithms'], [2, 'competitive programming']];
    let blogTags: ShallowWrapper<IBlogTagsProps, void> = shallow<IBlogTagsProps, void>(
            <BlogTagsImpl tagList={tagList} history={{push: push}} />
    );

    BlogModel.list = jest.fn();

    it('should render all the fields', (): void => {
        expect(blogTags.find('Link').length).toBe(3);
    });

    it('should load correct blogs when clicked on any blogs', (): void => {
        blogTags.find('Link').map((tag, index) => {
            if (index != 0) {
                tag.simulate('click');
                expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 0, tag: tagList[index - 1][1]});
                expect(tag.prop('children')).toBe(tagList[index - 1][1]);
            } else {
                tag.simulate('click');
                expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 0});
            }
        });
    });
});
