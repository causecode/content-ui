jest.unmock('../PageListPage/PageListPage');

import * as React from 'react';
import * as Radium from 'radium';
import {shallow, ShallowWrapper} from 'enzyme';
import {PageListPage} from '../PageListPage/PageListPage';
import {AlertDismissable, PagedList, DropDownFilter} from 'react-hero';
const unroll: any = require('unroll');

unroll.use(it);

describe('Page List test cases', (): void => {

    Radium.TestMode.enable();
    
    let componentTree: ShallowWrapper<void, void> = shallow<void, void>(
            <PageListPage />
    );

    unroll('It should render the #elementName correctly.', (
            done: () => void,
            args: {elementName: string, element: string | React.ComponentClass<any>, count: number}
        ): void => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'element', 'count'],
        ['alert', AlertDismissable, 1],
        ['div tags', 'div', 2],
        ['Paged list', PagedList, 1],
        ['dropdown filter', DropDownFilter, 3],
    ]);
});
