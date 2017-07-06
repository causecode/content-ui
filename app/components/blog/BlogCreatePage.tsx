import * as React from 'react';
import {IInstancePageProps} from 'react-hero';
import {Form} from './Form';
import {BlogModel} from '../../models/BlogModel';

export interface IBlogCreatePageProps extends IInstancePageProps {
    handleSubmit: (
        instance: BlogModel,
        successCallBack?: ((args: any) => {}),
        failureCallBack?: ((args: any) => {}),
    ) => void;
    instance: BlogModel;
    isCreatePage: boolean;
}

export class BlogCreate extends React.Component<IBlogCreatePageProps, void> {

    static resourceName: string = 'blog';

    render(): JSX.Element {
        return (
                <Form
                        handleSubmit={this.props.handleSubmit}
                        instance={this.props.instance}
                        isCreatePage={true} />
        );
    }
}
