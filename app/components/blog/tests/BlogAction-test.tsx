jest.unmock('../BlogAction');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogAction, IBlogActionProps} from '../BlogAction';
import {blogInstance} from '../../../tests/BlogTestData';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for BlogActions', (): void => {

    let blogActions: ShallowWrapper<IBlogActionProps, void> = shallow<IBlogActionProps, void>(
            <BlogAction instance={null} />
    );

    it('should not render actions when passed instance is null', (): void => {
        expect(blogActions.find('td').length).toBe(0);
    });

    unroll('should render #element when instance is not null', (
        done: () => void,
        args: {elementName: string, element: string, count: number}
    ): void => {
        blogActions.setProps({instance: blogInstance});
        expect(blogActions.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['element', 'count'],
        ['Link', 2],
        ['a', 1],
    ]);

    it('should call deleteBlog method when delete icon is clicked', (): void => {
        let deleteBlog: jest.Mock<void> = jest.fn<void>();

        blogActions.setProps({instance: blogInstance, deleteBlog});
        blogActions.find('a').simulate('click');
        expect(deleteBlog).toBeCalled();
    });
});
