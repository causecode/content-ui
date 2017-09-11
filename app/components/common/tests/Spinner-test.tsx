jest.unmock('../Spinner');

import * as React from 'react';
import {ShallowWrapper, shallow, EnzymePropSelector} from 'enzyme';
import {Spinner, ISpinnerProps} from '../Spinner';
import FontAwesome = require('react-fontawesome');
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test for spinner', (): void => {
    const componentTree: ShallowWrapper<ISpinnerProps, void> = shallow<ISpinnerProps, void>(
        <Spinner/>
    );

    unroll('It should render the #title correctly.', (
        done: () => void,
        args: {elementName: string, element: EnzymePropSelector, count: number},
    ) => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['title', 'element', 'count'],
        ['div', 'div', 1],
        ['spinner', FontAwesome, 1],
    ]);
});
