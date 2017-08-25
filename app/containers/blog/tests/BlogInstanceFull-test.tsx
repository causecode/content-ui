jest.unmock('../BlogInstanceFull');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {
    BlogInstanceFullImpl,
    IBlogInstanceFullProps,
    BlogInstanceFull,
} 
from '../../../containers/blog/BlogInstanceFull';
import {blogInstance} from '../../../tests/BlogTestData';
import {Button} from '../../../components/reusable-components/reusableComponents';
import {BlogCommentCount} from '../../../components/blog/BlogCommentCount';
import {BlogComment} from '../../../components/blog/BlogComment';
import {BlogInstanceTags} from '../../../components/blog/BlogInstanceTags';
import {IBlog} from '../../../models/BlogModel';
import {configureStore} from 'react-hero';

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
    
    let blogInstaceFull: ShallowWrapper<IBlogInstanceFullProps, void> = shallow<IBlogInstanceFullProps, void>(
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

});
