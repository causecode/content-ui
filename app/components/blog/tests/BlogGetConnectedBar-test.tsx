jest.unmock('../BlogGetConnectedBar/BlogGetConnectedBar');

import * as React from 'react';
import {BlogGetConnectedBar} from '../BlogGetConnectedBar/BlogGetConnectedBar';
import {socialList, ISocialList} from '../../../constants';
import {ShallowWrapper, shallow} from 'enzyme';

describe('Test cases for BlogConnectedBar', (): void => {

    let blogGetConnectedBar: ShallowWrapper<void, void> = shallow<void, void>(
        <BlogGetConnectedBar />
    );

    it(' should render all social media link in BlogGectConnectedBar', (): void => {
        socialList.map((social: ISocialList, index: number) => {
            expect(blogGetConnectedBar.find('a').at(index).prop('href')).toBe(social.url);
        });
    });
});
