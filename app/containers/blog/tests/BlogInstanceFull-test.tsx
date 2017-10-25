jest.unmock('../BlogInstanceFull');
jest.mock('../../../components/blog/FBCommentsCount');
jest.mock('../../../components/blog/FBComments');

import * as React from 'react';
import {configureStore} from 'react-hero';
import {Provider} from 'react-redux';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {process} from 'ts-jest/dist/preprocessor';
import {
    BlogInstanceFull,
    BlogInstanceFullImpl,
    IBlogInstanceFullProps,
} from '../../../containers/blog/BlogInstanceFull';
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
    BlogModel.get = jest.fn((valueInStore) => {
        return {
            properties: blogInstance,
        };
    });

    let blogInstaceFullImpl: ShallowWrapper<IBlogInstanceFullProps, void> = shallow<IBlogInstanceFullProps, void>(
        <BlogInstanceFullImpl id={1} blogInstance={blog} metaTags={[]} />
    );

    it('should check if blog Instance is not present', () => {
        blogInstaceFullImpl.setProps({blogInstance: ''});
        blogInstaceFullImpl.instance().renderEditLink();
        expect(blogInstaceFullImpl.find('h4').length).toBe(1);
    });

    it('should not display the popup initially', () => {
        expect(blogInstaceFullImpl.instance().displayPopup('Dummy URL')).toBe(false);
    });
});

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

    let blogInstaceFull: ShallowWrapper<IBlogInstanceFullProps, void> = shallow<IBlogInstanceFullProps, void>(
            // tslint:disable trailing-comma
            <BlogInstanceFullImpl id={1} blogInstance={blog} metaTags={[]} />
            // tslint:enable trailing-comma
    );

    unroll('sohould render #count #element', (
            done: () => void,
            args: {element: string, selector: React.ComponentClass<any>, count: number},
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
});
