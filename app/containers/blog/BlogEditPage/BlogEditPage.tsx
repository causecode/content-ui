import * as React from 'react';
import {IInstancePageProps} from 'react-hero';
import {Form} from '../../../components/blog/Form/Form';
import {BlogModel} from '../../../models/BlogModel';

export interface IBlogEditPageProps extends IInstancePageProps {
    handleSubmit: (
        instance: BlogModel,
        successCallBack?: ((args: any) => {}),
        failureCallBack?: ((args: any) => {})
    ) => void;

    handleDelete: (
        instance: BlogModel,
        successCallBack?: ((args: any) => {}),
        failureCallBack?: ((args: any) => {})
    ) => void;
    instance: BlogModel;
    isCreatePage: boolean;
}

export class BlogEdit extends React.Component<IBlogEditPageProps, void> {

    static resourceName: string = 'blog';

    render(): JSX.Element {
        return (
                <Form
                        handleSubmit={this.props.handleSubmit}
                        handleDelete={this.props.handleDelete}
                        instance={this.props.instance}
                        isCreatePage={false} />
        );
    }
};
