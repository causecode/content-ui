jest.unmock('../BlogSearchBar');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogSearchBarImpl, IBlogSearchState} from '../BlogSearchBar';
import {BlogModel} from '../../../models/BlogModel';

describe('Test cases for BlogSearchBar', (): void => {

    let push: jest.Mock<void> = jest.fn<void>();

    let blogSearchBar: ShallowWrapper<void, IBlogSearchState> = shallow<void, IBlogSearchState>(
        <BlogSearchBarImpl history={{push: push}}/>
    );

    it('should render search box and search button', (): void => {
        expect(blogSearchBar.find('Button').length).toBe(1);
        expect(blogSearchBar.find('FormControl').length).toBe(1);
    });

    BlogModel.list = jest.fn();
    blogSearchBar.setState({query: 'grails'});

    it('should call blogSearch when clicked on search button', (): void => {
        blogSearchBar.find('Button').simulate('click', {preventDefault: () => {}});
        expect(push).toHaveBeenCalledWith('/blogs/searchQuery/grails');
        expect(BlogModel.list).toHaveBeenCalledWith({queryFilter: 'grails', max: 10, offset: 0});
    });
});
