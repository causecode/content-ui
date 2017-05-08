jest.unmock('../../../src/components/page/PageAction');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {PageAction, IPageActionProps} from '../../../src/components/page/PageAction';
import {IPage} from '../../../src/models/PageModel';
import FontAwesome = require('react-fontawesome');
const unroll: any = require('unroll');

unroll.use(it);

export let pageInstance: IPage = {
    id: 22,
    body: 'test body',
    publish: false,
    publishedDate: new Date(),
    subTitle: 'This is the subtitle',
    title: 'Just a title',
};

describe('PageAction page test cases', (): void => {

    let componentTree: ShallowWrapper<IPageActionProps, void> = shallow<IPageActionProps, void>(
            <PageAction instance={pageInstance} />
    );

    unroll('It should render the #elementName correctly.', (
            done: () => void,
            args: {elementName: string, element: JSX.Element | React.ComponentClass<any>, count: number}
        ): void => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'element', 'count'],
        ['icons', FontAwesome, 2],
        ['anchor tags', 'a', 2],
    ]);
});
