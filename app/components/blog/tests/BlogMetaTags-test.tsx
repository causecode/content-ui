jest.unmock('../BlogMetaTags');

import * as React from 'react';
import {ShallowWrapper, shallow, EnzymePropSelector} from 'enzyme';
import {BlogMetaTagsImpl, IBlogMetaTagProps, IBlogMetaTagsState} from '../BlogMetaTags';
import {Grid, FormControl, HelpBlock} from '../../reusable-components/reusableComponents';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests for BlogMetaTags', (): void => {
    let blogMetaTagsImpl: ShallowWrapper<IBlogMetaTagProps, IBlogMetaTagsState> =
            shallow<IBlogMetaTagProps, IBlogMetaTagsState>(
                    // tslint:disable trailing-comma
                    <BlogMetaTagsImpl metaTypeList={['keywords', 'title']} />
                    // tslint:enable trailing-comma
            );

    unroll('should render #count #component', (
            done: () => void,
            args: {component: EnzymePropSelector, count: number},
    ): void => {
        expect(blogMetaTagsImpl.find(args.component).length).toBe(args.count);
        done();
    }, [
        ['component', 'count'],
        [Grid, 1],
        [FormControl, 1],
        [HelpBlock, 1],
    ]);

    it('should set selectedValue field when value is selected from dropdown', (): void => {
        blogMetaTagsImpl.find('FormControl').simulate('change', {target: {value: 'keywords'}});
        expect(blogMetaTagsImpl.instance()[`selectedValue`]).toEqual('keywords');
    });

    it('should add field to enter meta tag when add button is clicked', (): void => {
        blogMetaTagsImpl.find('#add').simulate('click');
        expect(blogMetaTagsImpl.state('metaTagFields')[0][`key`]).toEqual('keywords');
    });

    it('should remove meta tag field when close buttton is clicked', (): void => {
        blogMetaTagsImpl.find('#keywords').simulate('click', {target: {id: 'keywords'}});
        expect(blogMetaTagsImpl.state('metaTagFields').length).toBe(0);
    });
});
