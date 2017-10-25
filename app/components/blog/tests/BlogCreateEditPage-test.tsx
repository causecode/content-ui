jest.unmock('../BlogCreatePage');

import * as React from 'react';
import {shallow, ShallowWrapper} from 'enzyme';
import {Form} from '../Form';
import {IBlogEditPageProps, BlogEdit} from '../BlogEditPage';
import {BlogCreate, IBlogCreatePageProps} from '../BlogCreatePage';
const unroll = require<any>('unroll');

unroll.use(it);

describe('Tests cases for Blog Create/Edit Page', (): void => {

    let testFunction: jest.Mock<void> = jest.fn<void>();

    let blogCreatePage: ShallowWrapper<IBlogCreatePageProps, void> = shallow<IBlogCreatePageProps, void>(
            // tslint:disable trailing-comma
            <BlogCreate
                    handleSubmit={testFunction}
                    instance={null}
                    isCreatePage={true}
            />
    );

    let blogEditPage: ShallowWrapper<IBlogEditPageProps, void> = shallow<IBlogEditPageProps, void>(
            <BlogEdit
                    handleDelete={testFunction}
                    handleSubmit={testFunction}
                    instance={null}
                    isCreatePage={false}
            />
            // tslint:enable trailing-comma
    );

    unroll('should render Form component for #page', (
            done: () => void,
            args: {page: string, component: ShallowWrapper<IBlogCreatePageProps|IBlogEditPageProps, void>},
    ): void => {
        expect(args.component.find(Form).length).toBe(1);
        done();
    }, [
        ['page', 'component'],
        ['BlogCreatePage', blogCreatePage],
        ['BlogEditPage', blogEditPage],
    ]);
});
