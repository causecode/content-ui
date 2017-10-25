jest.unmock('../PageAction');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {PageAction, IPageActionProps} from '../PageAction';
import {IPage} from '../../../models/PageModel';
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
            // tslint:disable trailing-comma
            <PageAction instance={pageInstance} />
            // tslint:enable trailing-comma
    );

    unroll('It should render the #elementName correctly.', (
            done: () => void,
            args: {elementName: string, element: React.ComponentClass<any>, count: number},
        ): void => {
        expect(componentTree.find(args.element).length).toBe(args.count);
        done();
    }, [
        ['elementName', 'element', 'count'],
        ['icons', 'FontAwesome', 2],
        ['router links', 'Link', 2],
    ]);
});
