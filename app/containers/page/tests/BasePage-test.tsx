jest.unmock('../BasePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {BasePage} from '../BasePage';

export interface IShallowWrapperProps {
    children: JSX.Element;
}

describe('BasePage Tests', (): void => {

    it('renders the children correctly.', (): void => {
        const componentTree: ShallowWrapper<IShallowWrapperProps, void> = shallow<IShallowWrapperProps, void>(
            // tslint:disable trailing-comma
            <BasePage />
        );

        expect(componentTree.find('Route').length).toBe(7);
    });
});
