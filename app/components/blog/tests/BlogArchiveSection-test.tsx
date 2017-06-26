jest.unmock('../BlogArchiveSection/BlogArchiveSection');

import * as React from 'react';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogArchiveSection, IBlogArchiveSectionProps} from '../BlogArchiveSection/BlogArchiveSection';
import {BlogModel} from '../../../models';

let monthList: string[] = ['2103-04', '2014-06', '2015-07'];
describe('Test cases for Blog Archive Section', (): void => {

    BlogModel.list = jest.fn();

    let blogArchiveSection: ShallowWrapper<IBlogArchiveSectionProps, void> = shallow<IBlogArchiveSectionProps, void>(
        <BlogArchiveSection monthList={monthList} />
    );

    it('should render blog archives', (): void => {
        expect(blogArchiveSection.find('Link').length).toBe(4);
    });

    it('When any blog archive is clicked', (): void => {

        blogArchiveSection.find('Link').forEach((node, index) => {
            node.simulate('click');
            if (index != 0) {
                expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 0, monthFilter: node.prop('children')});
            } else {
                expect(BlogModel.list).toHaveBeenCalledWith({max: 10, offset: 0});
            }
        });
    });

    it('should render when props will be given manually', (): void => {
        blogArchiveSection.setProps({monthList: monthList});
        expect(blogArchiveSection.find('Link').length).toBe(4);
    });
});
