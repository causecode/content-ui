jest.unmock('../BlogListInner');

import * as React from 'react';
import {BlogListInner, IBlogListInnerProps} from '../BlogListInner';
import {ShallowWrapper, shallow} from 'enzyme';
import {blogInstance} from '../../../tests/BlogTestData';
import {IInstanceList} from '../../../interfaces/blogInterfaces';

describe('Test cases for BlogListInner', (): void => {

    let blogList: IInstanceList = {
        instanceList: [blogInstance],
        monthFilterList: ['2015-04', '2016-08'],
        tagList: [
            [1, 'algorithms'],
        ],
        totalCount: 1,
    };

    let blogListInner: ShallowWrapper<IBlogListInnerProps, void> = shallow<IBlogListInnerProps, void>(
            // tslint:disable trailing-comma
            <BlogListInner />
            // tslint:enable trailing-comma
    );


    it('should render components', (): void => {
        blogListInner.setProps({blogList: blogList, fetched: true});
        expect(blogListInner.find('BlogSummary').length).toBe(1);
    });

    it('should render nothing if blogCount is 0', (): void => {
        blogList.totalCount = 0;
        blogListInner.setProps({blogList: blogList, fetched: true});
        expect(blogListInner.find('BlogSummary').length).toBe(0);
        expect(blogListInner.find('h4').length).toBe(1);
        expect(blogListInner.find('h4').prop('children')).toBe('No results found');
    });
});
