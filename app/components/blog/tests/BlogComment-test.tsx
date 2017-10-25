jest.unmock('../BlogComment');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogComment} from '../BlogComment';
import {blogInstance} from '../../../tests/BlogTestData';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for BlogComments', (): void => {

    let blogComment: ShallowWrapper<void, void> = shallow<void, void>(
            // tslint:disable trailing-comma
            <BlogComment blogInstance={blogInstance} />
    );

    it('should render Facebook comments', (): void => {
        expect(blogComment.find('FBComments').length).toBe(1);
    });

});
