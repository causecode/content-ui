jest.unmock('../Form');

import * as React from 'react';
import {StyleRoot} from 'radium';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router';
import {ShallowWrapper, shallow, ReactWrapper, mount} from 'enzyme';
import {
    AlertDismissable,
    FormInput,
    showAlert,
    configureStore,
    hasAnyRole,
    RawContentWrapper,
    MarkdownWrapper,
} from 'react-hero';
import {IAxiosResponse} from '../../../interfaces';
import {BlogModel} from '../../../models/BlogModel';
import {Link, Button} from '../../../components/reusable-components/reusableComponents';
import {TinyMCEWrapper} from '../../../containers/common/TinyMCEWrapper';
import {ImageUploader} from '../../../components/common/ImageUploader';
import {blogModelInstance, blogInstance} from '../../../tests/BlogTestData';
import {ALERT_INFO, ALERT_DANGER, ALERT_SUCCESS} from '../../../constants';
import {IFormProps, IFormState, FormImpl, Form} from '../Form';
import {mockStore, handleSubmitSuccess, getSuccessResponse} from '../../../tests/testUtils';

const unroll: any = require<any>('unroll');

unroll.use(it);

describe('Test cases for Form', () => {

    let handleSubmit: jest.Mock<void> = jest.fn<void>();
    let saveData: jest.Mock<void> = jest.fn<void>();
    let push: jest.Mock<void> = jest.fn<void>();

    hasAnyRole = jest.fn();
    let blogCreate: ShallowWrapper<IFormProps, IFormState> = shallow<IFormProps, IFormState>(
            // tslint:disable trailing-comma
            <FormImpl
                    handleSubmit={handleSubmit}
                    instance={blogModelInstance}
                    blogInstance={blogInstance}
                    isCreatePage={true}
                    history={{push: push}}
            />
            // tslint:enable trailing-comma
    );

    let blogEdit: ShallowWrapper<IFormProps, IFormState> = shallow<IFormProps, IFormState>(
            // tslint:disable trailing-comma
            <FormImpl
                    handleDelete={handleSubmit}
                    handleSubmit={handleSubmit}
                    instance={blogModelInstance}
                    isCreatePage={false}
                    saveData={saveData}
                    history={{push: push}}
            />
            // tslint:enable trailing-comma
    );

    [blogCreate, blogEdit].forEach((parentComponent: ShallowWrapper<IFormProps, IFormState>, index: number): void => {
        let component: string = index === 0 ? 'BlogCreatePage' : 'BlogEditPage';

        unroll(`${component} should render #count #elementName`, (
                done: () => void,
                args: {elementName: string, element: React.ComponentClass<any>, count: number},
        ): void => {
            expect(parentComponent.find(args.element).length).toBe(args.count);
            done();
        }, [
            ['elementName', 'element', 'count'],
            ['form', 'form', 1],
            ['AlertDismissable', AlertDismissable, 1],
            ['h1', 'h1', 1],
            ['FormInput', FormInput, 5],
            ['ImageUploader', ImageUploader, 1],
            ['Button', Button, 1],
            ['Link', Link, 1],
        ]);
    });

    unroll('should render #editorName when editor type is #editorType', (
            done: () => void,
            args: {editorName: string, editorType: string, component: React.ComponentClass<any>},
    ): void => {
        blogInstance.type = args.editorType;
        blogCreate.setProps({blogInstance: blogInstance, instance: blogModelInstance});
        expect(blogCreate.find(args.component).length).toBe(1);
        done();
    }, [
        ['editorName', 'editorType', 'component'],
        ['TinyMCE', 'TINYMCE', TinyMCEWrapper],
        ['MarkDown', 'MARKDOWN', MarkdownWrapper],
        ['Raw', 'RAWCONTENT', RawContentWrapper],
        ['TinyMCE', 'not selected', TinyMCEWrapper],
    ]);

    let preventDefault: jest.Mock<void> = jest.fn<void>();
    let response: IAxiosResponse = {data: {filePath: '/tmp/test', message: 'Success'}};
    let error: {response: IAxiosResponse} = {response: {data: {message: 'Error'}}};

    showAlert = jest.fn();

    BlogModel.uploadImage = jest.fn()
        .mockImplementationOnce((): Promise<IAxiosResponse> => {
            return new Promise((resolve, reject) => {
                resolve(response);
            });
        }).mockImplementation((): Promise<IAxiosResponse> => {
            return new Promise((resolve, reject): void => {
                reject(error);
            });
        });

    describe('When form is submitted', (): void => {
        beforeEach((): void => {
            blogCreate.setState({blogImage: '123'});
            blogCreate.setProps({blogInstance: blogInstance, instance: blogModelInstance, saveData: saveData});
            blogCreate.find('form').simulate('submit', {preventDefault});
        });

        unroll('should call showAlert function on #result', (
                done: () => void,
                args: {alertType: string, result: string},
        ): void => {
            BlogModel.uploadImage('123')
                .then((): void => {
                    expect(showAlert).toBeCalledWith(args.alertType, args.result);
                });
            done();
        }, [
            ['alertType', 'result'],
            [ALERT_INFO, 'Success'],
            [ALERT_DANGER, 'Error'],
        ]);
    });

    it('should display success message when form is submitted successfully ', () => {
        mockStore('blogEdit', blogModelInstance);
        blogEdit.setState({blogImage: null});

        blogEdit.setProps({
            blogInstance: blogInstance,
            instance: blogModelInstance,
            saveData: saveData,
            handleSubmit: handleSubmitSuccess,
        });

        blogEdit.find('form').simulate('submit', {preventDefault});
        expect(showAlert).toBeCalledWith(ALERT_SUCCESS, getSuccessResponse().data.message);
    });

    unroll('should save #stateKey data in state when image is uploaded', (
            done: () => void,
            args: {stateKey: string, value: string},
    ): void => {
        expect(blogEdit.state(args.stateKey)).toEqual(null);
        blogEdit.instance()[`saveUploadedImageData`](args.stateKey, args.value);
        expect(blogEdit.state(args.stateKey)).toEqual(args.value);
        done();
    }, [
        ['stateKey', 'value'],
        ['blogImage', 'testImage'],
        ['blogImageSrc', '/tmp/image'],
    ]);

    it('should remove image when user clicks on remove', (): void => {
        expect(blogEdit.state('blogImageSrc')).toEqual('/tmp/image');
        blogEdit.instance()[`removeImage`]();
        expect(blogEdit.state('blogImageSrc')).toEqual(null);
    });

    describe('When the form is connected to redux store', (): void => {

         BlogModel.fetchMetaTypeList = jest.fn()
            .mockImplementationOnce((): Promise<IAxiosResponse> => {
                return new Promise((resolve, reject): void => {
                    resolve({data: {metaTypeList: ['keywords', 'description']}});
                });
            });

        // tslint:disable no-shadowed-variable trailing-comma
        let blogEdit: ReactWrapper<IFormProps, IFormState> = mount<IFormProps, IFormState>(
                <MemoryRouter>
                    <StyleRoot>
                        <Provider store={configureStore({
                            forms: {rhForms: {blogEdit: blogModelInstance}},
                            alertDismissable: {show: false, type: '', message: ''},
                        })}>
                            <Form
                                    instance={blogModelInstance}
                                    isCreatePage={false}
                                    saveData={saveData}
                                    history={{push: push}}
                            />
                        </Provider>
                    </StyleRoot>
                </MemoryRouter>
        );

        it('should fetch metaTypeList when component mounts', (): void => {
            expect(BlogModel.fetchMetaTypeList).toBeCalled();
        });
    });
});
