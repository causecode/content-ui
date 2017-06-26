jest.unmock('../BasePage/BasePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {BasePage} from '../BasePage/BasePage';

export interface IShallowWrapperProps {
    children: JSX.Element;
}

describe('BasePage Tests', (): void => {

    it('renders the children correctly.', (): void => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            <BasePage />
        );
        
        expect(componentTree.find('Route').length).toBe(5);
    });
});
