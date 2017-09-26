jest.unmock('../BlogSummary');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogSummary, IBlogSummaryProps} from '../BlogSummary';
import {blogInstance} from '../../../tests/BlogTestData';

describe('Test cases for BlogSumamry', (): void => {

    let blogSummary: ShallowWrapper<IBlogSummaryProps, void> = shallow<IBlogSummaryProps, void>(
            // tslint:disable trailing-comma
            <BlogSummary instanceData={blogInstance} />
            // tslint:enable trailing-comma
    );

    it('should render all the fields', (): void => {
        expect(blogSummary.find('Link').length).toBe(2);
        expect(blogSummary.find('BlogCommentCount').length).toBe(1);
        expect(blogSummary.find('img').length).toBe(1);
    });
});
