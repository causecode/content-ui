jest.unmock('../PageEditPage');

import * as React from 'react';
import * as Radium from 'radium';
import {shallow, ShallowWrapper} from 'enzyme';
import {PageEditPage} from '../PageEditPage';
import {hideAlert, AlertDismissable, TinyMCEWrapper, FormInput, showAlert} from 'react-hero';
import {PageModel, IPage} from '../../../models/PageModel';
import {properties} from './PageShowPage-test';
import {Row, Panel} from '../../../components/reusable-components/reusableComponents';
import {Button} from 'react-bootstrap';
import {store} from '../../../store';
const unroll: any = require('unroll');

unroll.use(it);

describe('Page edit test cases', (): void => {

    Radium.TestMode.enable();

    hideAlert = jest.fn<void>();
    showAlert = jest.fn<void>();
    let push: jest.Mock<void> = jest.fn<void>();
    let formData: {rhForms: {pageEdit: {properties: IPage}}} = {
        rhForms: {
            pageEdit: {
                properties: properties,
            },
        },
    };

    store.getState = jest.fn((): {forms: {rhForms: {pageEdit: {properties: IPage}}}} => {
        return {forms: formData};
    });

    let pageInstance: PageModel = new PageModel(properties);

    let handleSubmit: jest.Mock<void> = jest.fn<void>((
            instance: PageModel,
            success: () => true,
            failure: () => false,
    ): void => {
        failure();
    }).mockImplementationOnce((
            instance: PageModel,
            success: () => true,
            failure: () => false,
    ): void => {
        success();
    });

    describe('When the edit page is rendered.', (): void => {
        let componentTree: ShallowWrapper<void, void> = shallow<void, void>(
                // tslint:disable trailing-comma
                <PageEditPage
                        handleSubmit={handleSubmit}
                        instance={pageInstance}
                        isCreatePage={false}
                        history={{push: push}}
                />
                // tslint:enable trailing-comma
        );

        it('should hide the alert before the component is mounted.', (): void => {
            expect(hideAlert).toBeCalled();
        });

        unroll('It should render the #elementName correctly.', (
                done: () => void,
                args: {elementName: string, element: React.ComponentClass<any>, count: number},
            ): void => {
            expect(componentTree.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['alert', AlertDismissable, 1],
            ['TinyMCE editor', TinyMCEWrapper, 1],
            ['bootstrap row', Row, 2],
            ['input elements', FormInput, 3],
            ['bootstrap panel', Panel, 1],
            ['button', Button, 1],
        ]);

        unroll('It should call the #type when the form is submitted', (
                done: () => void,
                args: {functionName: (() => void)[], type: string},
        ): void => {
            componentTree.find('form').simulate('submit', {preventDefault: (): void => {}});
            args.functionName.forEach((item: () => void) => {
                expect(item).toBeCalled();
            });
            done();
        }, [
            ['type', 'functionName'],
            ['success', [store.getState, showAlert]],
            ['failure', [showAlert]],
        ]);
    });

    describe('When the create page is rendered.', (): void => {
        let componentTree: ShallowWrapper<void, void> = shallow<void, void>(
                // tslint:disable trailing-comma
                <PageEditPage
                        handleSubmit={handleSubmit}
                        instance={new PageModel({})}
                        isCreatePage={true}
                />
                // tslint:enable trailing-comma
        );

        it('should render the correct title.', (): void => {
            expect(componentTree.find('h1').text()).toEqual('New page form');
        });
    });
});
