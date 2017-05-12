import * as React from 'react';
import { IPage } from '../../models/PageModel';
export interface IPageActionProps {
    instance?: IPage;
}
export declare class PageAction extends React.Component<IPageActionProps, void> {
    render(): JSX.Element;
}
