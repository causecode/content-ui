jest.unmock('../PageShowPage/PageShowPage');

import * as React from 'react';
import * as Radium from 'radium';
import * as DOMPurify from 'dompurify';
import {shallow, ShallowWrapper} from 'enzyme';
import {PageShowPage} from '../PageShowPage/PageShowPage';
import {IInstancePageProps} from 'react-hero';
import {Grid} from '../../../components/reusableComponents/reusableComponents';
import {PageModel, IPage} from '../../../models/PageModel';
const unroll: any = require('unroll');

unroll.use(it);

export const properties: IPage = {
    id: 22,
    body: 'test body',
    publish: false,
    publishedDate: new Date(),
    subTitle: 'This is the subtitle',
    title: 'Just a title',
};

describe('Page show test cases', (): void => {

    Radium.TestMode.enable();

    beforeEach((): void => {
        DOMPurify.sanitize = jest.fn<void>();
    });

    describe('When the instance is valid.', (): void => {

        let pageInstance: PageModel = new PageModel(properties);
        
        let componentTree: ShallowWrapper<IInstancePageProps, void> = shallow<IInstancePageProps, void>(
                <PageShowPage instance={pageInstance} />
        );

        unroll('It should render the #elementName correctly.', (
                done: () => void,
                args: {elementName: string, element: string | React.ComponentClass<any>, count: number}
            ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['div tags', 'div', 2],
            ['bootstrap grid', Grid, 1],
            ['title', 'h1', 1],
            ['subtitle', 'h2', 1],
        ]);
    });

    describe('When the instance is invalid', (): void => {

        unroll('It should not purify the string when #title.', (
                done: () => void,
                args: {title: string, properries: IPage}
        ): void => {
            shallow<IInstancePageProps, void>(<PageShowPage instance={new PageModel(args.properries)} />);
            expect(DOMPurify.sanitize).not.toBeCalled();
            done();
        }, [
            ['title', 'properties'],
            ['instance is not present', null],
            ['body is not present', {title: 'dummyTitle', subTitle: 'another dummy title', body: ''}],
        ]);
    });

    describe('When the instance is not present.', (): void => {
        let componentTree: ShallowWrapper<IInstancePageProps, void> = shallow<IInstancePageProps, void>(
                <PageShowPage />
        );

        it('should not render the elements.', (): void => {
            ['div', Grid, 'h1', 'h2'].forEach((item: string | React.ComponentClass<any>): void => {
                expect(componentTree.find(item).length).toBe(0);
            });
        });
    });
});
