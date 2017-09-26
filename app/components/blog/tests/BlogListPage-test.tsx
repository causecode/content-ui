jest.unmock('../BlogListPage');

import * as React from 'react';
import {fromJS} from 'immutable';
import {store} from '../../../store';
import {ShallowWrapper, shallow} from 'enzyme';
import {BlogModel} from '../../../models/BlogModel';
import {IBlogListProps} from '../../../containers/blog/BlogList';
import {blogModelInstance} from '../../../tests/BlogTestData';
import {BlogListPage} from '../BlogListPage';
import {IStoreInstanceType, IAxiosResponse} from '../../../interfaces';
import {ALERT_INFO, ALERT_DANGER, BLOG_DELETED, DEFAULT_ERROR_MESSAGE} from '../../../constants';
import {
    PagedList,
    AlertDismissable,
    DropDownFilter,
    ConfirmationModal,
    ModelService,
    showModal,
    showAlert,
    HTTP,
    IFromJS,
} from 'react-hero';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Test cases for BlogListPage', (): void => {

    let blogListPage: ShallowWrapper<IBlogListProps, void> = shallow<IBlogListProps, void>(
            // tslint:disable trailing-comma
            <BlogListPage />
            // tslint:enable trailing-comma
    );

    unroll('should render #count #element', (
            done: () => void,
            args: {element: string, selector: React.ComponentClass<any>, count: number},
    ): void => {
        expect(blogListPage.find(args.selector).length).toBe(args.count);
        done();
    }, [
        ['element', 'selector', 'count'],
        ['PagedList', PagedList, 1],
        ['AlertDismissable', AlertDismissable, 1],
        ['DropDownFilter', DropDownFilter, 1],
        ['ConfirmationModal', ConfirmationModal, 1],
    ]);

    it('should display confirmation modal when delete icon is clicked', (): void => {
        showModal = jest.fn();

        blogListPage.instance()[`deleteBlog`](1, false);
        expect(showModal).toBeCalled();
    });

    describe('When deleteBlog method is called', (): void => {

        let storeInstances: {blogList?: IStoreInstanceType} = {};

        storeInstances.blogList = {
            instanceList: [blogModelInstance],
            totalCount: 1,
            activePage: 1,
            properties: blogModelInstance.properties,
        };

        ModelService.register(BlogModel);

        ModelService.getModel = jest.fn<void>((resource: string): typeof BlogModel => {
            return BlogModel;
        });

        BlogModel.list = jest.fn<void>((filters: any): BlogModel[] => {
            return [blogModelInstance];
        });

        store.dispatch = jest.fn();

        BlogModel.list = jest.fn();

        HTTP.deleteRequest = jest.fn()
                .mockImplementationOnce((): Promise<IAxiosResponse> => {
                    return new Promise((resolve, reject) => {
                        resolve({success: true});
                    });
                }).mockImplementation((): Promise<IAxiosResponse> => {
                    return new Promise((resolve, reject) => {
                        reject({success: false});
                    });
                });

        showAlert = jest.fn();

        store.getState = jest.fn((): {data: IFromJS} => {
            return {data: fromJS(storeInstances)};
        });

        unroll('should call showAlert function when delete #status', (
                done: () => void,
                args: {alertType: string, result: string, alertMessage: string},
        ): void => {
            blogListPage.find(ConfirmationModal).props().onConfirm(this);

            blogModelInstance.$delete(true, {}, (response: IAxiosResponse): void => {
                expect(showAlert).toBeCalledWith(args.alertType, args.alertMessage);
            });
            done();
        }, [
            ['status', 'alertType', 'alertMessage'],
            ['Succeeds', ALERT_INFO, BLOG_DELETED],
            ['Fails', ALERT_DANGER, DEFAULT_ERROR_MESSAGE],
        ]);

        it('should not show alert message when instance to delete does not exist in instanceList', (): void => {
            showAlert.mockReset();
            blogModelInstance.properties.id = 1000;
            blogListPage.find(ConfirmationModal).props().onConfirm(this);
            expect(showAlert).not.toBeCalled();
        });
    });
});
