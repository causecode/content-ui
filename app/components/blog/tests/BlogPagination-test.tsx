jest.unmock('../BlogPagination/BlogPagination');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogPaginationImpl, IBlogPaginationProps,  IBlogPaginationState} from '../BlogPagination/BlogPagination';
import {BlogModel} from '../../../models/BlogModel';

describe('Test cases for BlogPagination', (): void => {

    let push: jest.Mock<void> = jest.fn<void>();
    BlogModel.list = jest.fn();

    let props = {
        match: {params: {}},
        total: 40,
        currentPage: 1,
    };

    let blogPagination: ShallowWrapper<IBlogPaginationProps, IBlogPaginationState> = 
        shallow<IBlogPaginationProps, IBlogPaginationState>(
        <BlogPaginationImpl history={{push:push}} show={true} match={{params: {}}} />
    );

    blogPagination.setState({ activePage: 1, size: 4});

    it('should render correct no of pages', (): void => {
        expect(blogPagination.find('Pagination').dive().find('PaginationButton').length).toBe(8);
    });

    it('should redirect when clicked on pagination', (): void => {
        blogPagination.setProps(props);
        blogPagination.find('Pagination').dive().find('PaginationButton').at(3)
            .dive().find('SafeAnchor').simulate('click');
        expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 10});
    });

    it('should redirect when clicked on pagination with filter page', (): void => {
        props.match.params = {filter: 'page', value: '3'};
        blogPagination.setProps(props);
        blogPagination.find('Pagination').dive().find('PaginationButton').at(5)
            .dive().find('SafeAnchor').simulate('click');
        expect(push).toHaveBeenCalledWith(`/blogs/page/4`);
        expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 30});
    });

    it('should redirect when clicked on pagination with filter searchQuery', (): void => {
        props.match.params = {filter: 'searchQuery', value: 'javascript'};
        blogPagination.setProps(props);
        blogPagination.find('Pagination').dive().find('PaginationButton').at(5)
            .dive().find('SafeAnchor').simulate('click');
        expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 30, queryFilter: props.match.params.value});
    });

    it('should redirect when clicked on pagination with filter tag', (): void => {
        props.match.params = {filter: 'tag', value: 'algorithm'};
        blogPagination.setProps(props);
        blogPagination.find('Pagination').dive().find('PaginationButton').at(5)
        .dive().find('SafeAnchor').simulate('click');
        expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 30, tag: props.match.params.value});
    });

    it('should redirect when clicked on pagination with monthFilter', (): void => {
        props.match.params = {filter: '2013', value: '4'};
        blogPagination.setProps(props);
        blogPagination.find('Pagination').dive().find('PaginationButton').at(5)
        .dive().find('SafeAnchor').simulate('click');
        expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 30, monthFilter: 'April-2013'});
    });
});
