import * as React from 'react';
import { IInstancePageProps } from 'react-hero';
import { PageModel } from '../../models/PageModel';
export interface IPageEditPageProps extends IInstancePageProps {
    handleSubmit: (instance: PageModel, successCallBack?: (response?: Axios.AxiosXHR<{
        message?: string;
    }>) => void, failureCallBack?: () => void) => void;
    instance: PageModel;
    isCreatePage: boolean;
}
export declare class PageEditPage extends React.Component<IPageEditPageProps, void> {
    static resourceName: string;
    componentWillMount: () => void;
    goToListingPage: () => void;
    fetchPageInstance: () => PageModel;
    handleSubmit: (e: React.FormEvent) => void;
    renderButton: (buttonText: string) => JSX.Element;
    getFormKey: () => string;
    render(): JSX.Element;
}
