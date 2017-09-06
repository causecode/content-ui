jest.unmock('../BlogInstanceFull');
jest.mock('../../../components/blog/FBCommentsCount');
jest.mock('../../../components/blog/FBComments');

import * as React from 'react';
import {configureStore} from 'react-hero';
import {process} from 'ts-jest/dist/preprocessor';
import {Provider} from 'react-redux';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {
    BlogInstanceFull,
    BlogInstanceFullImpl,
    IBlogInstanceFullProps,
}
    from '../../../containers/blog/BlogInstanceFull';
import {blogInstance} from '../../../tests/BlogTestData';
import {Button} from '../../../components/reusable-components/reusableComponents';
import {BlogCommentCount} from '../../../components/blog/BlogCommentCount';
import {BlogComment} from '../../../components/blog/BlogComment';
import {BlogInstanceTags} from '../../../components/blog/BlogInstanceTags';
import {IBlog, BlogModel} from '../../../models/BlogModel';
const unroll: any = require<any>('unroll');
unroll.use(it);

describe('Test cases for Blog Instance', (): void => {

    let blog: {properties: IBlog} = { properties: blogInstance};
    let mutableStore = configureStore({
        data: {
            blogList: {
                instanceList: [
                    blog,
                ],
            },
        }});

    BlogModel.get = jest.fn((valueInStore) => {
        return {
            properties: blogInstance,
        };
    });

    let blogInstaceFull: ReactWrapper<IBlogInstanceFullProps, void> = mount<IBlogInstanceFullProps, void>(
        <Provider store={mutableStore}>
            <BlogInstanceFull id={1} />
        </Provider>
    );

    let blogInstaceFullImpl: ShallowWrapper<IBlogInstanceFullProps, void> = shallow<IBlogInstanceFullProps, void>(
        <BlogInstanceFullImpl id={1} blogInstance={blog} metaTags={[]} />
    );

    unroll('sohould render #count #element', (
        done: () => void,
        args: {element: string, selector: React.ComponentClass<any>, count: number}
    ): void => {
        expect(blogInstaceFull.find(args.selector).length).toBe(args.count);
        done();
    }, [
        ['element', 'selector', 'count'],
        ['Button for social media', Button, 3],
        ['Blog Comment Count Component', BlogCommentCount, 1],
        ['Blog Comment Component', BlogComment, 1],
        ['Blog Instance Tags Component', BlogInstanceTags, 1],
    ]);

    it('check if blog Instance is not present', () => {
        blogInstaceFullImpl.setProps({blogInstance: ''});
        blogInstaceFullImpl.instance().renderSpinner();
        expect(blogInstaceFullImpl.find('h4').length).toBe(1);
    });

    it('Check if Popup is initially not displayed', () => {
        expect(blogInstaceFullImpl.instance().displayPopup('Dummy URL')).toBe(false);
    });

});
