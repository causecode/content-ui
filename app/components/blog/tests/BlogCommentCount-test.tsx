jest.unmock('../BlogCommentCount/BlogCommentCount');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {IInstanceDataSmall} from '../../../interfaces/blogInterfaces';
import {BlogCommentCount, IBlogCommentCountProps} from '../BlogCommentCount/BlogCommentCount';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for BlogCommentCount', (): void => {

    let blogInstance: IInstanceDataSmall = {
            author: '',
            id: 59,
            title: 'wishful thinking a programming skill that every entrepreneur should learn',
            blogImgSrc: '',
            lastUpdated: '',
            numberOfComments: 0,
            publishedDate: '',
            body: '',
    };

    let blogCommentCount: ShallowWrapper<IBlogCommentCountProps, void> = shallow<IBlogCommentCountProps, void>(
            <BlogCommentCount blogInstance={blogInstance} />
    );

    it('should render BlogCommentCount component', (): void => {
        expect(blogCommentCount.find('span').length).toBe(1);
        expect(blogCommentCount.find('FBCommentsCount').length).toBe(1);
        expect(blogCommentCount.find('FBCommentsCount').text()).not.toBeNull();
    });

});
