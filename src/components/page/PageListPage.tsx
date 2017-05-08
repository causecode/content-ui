import * as React from 'react';
import * as Radium from 'radium';
import {PagedList, DropDownFilter, AlertDismissable} from 'react-hero';
import {CSS} from '../../interfaces';
import {PageAction} from './PageAction';
import {fontWeight, fontSize, title} from '../../constants';

@Radium
export class PageListPage extends React.Component<void, void> {

    static resourceName: string = 'page';

    render(): JSX.Element {
        return (
            <div>
                <AlertDismissable />
                <div style={listContainer}>
                    <PagedList
                            resource={PageListPage.resourceName} 
                            max={15} 
                            customActions={PageAction} 
                            pageHeader={
                                <h1 style={[title, fontWeight(600), fontSize(32)]}>Pages</h1>
                            }>
                        <DropDownFilter
                                label="Sort"
                                paramName="sort"
                                possibleValues={[
                                    {label: 'Date Created', value: 'dateCreated'},
                                    {label: 'Last Updated', value: 'lastUpdated'},
                                    {label: 'Title', value: 'title'},
                                ]}
                        />
                        <DropDownFilter
                                label="Order"
                                paramName="order"
                                possibleValues={[
                                    {label: 'Ascending', value: 'asc'},
                                    {label: 'Descending', value: 'desc'},
                                ]}
                        />
                    </PagedList>
                </div>
            </div>
        );
    }
}

const listContainer: CSS = {
    marginTop: '80px',
    padding: '0px 30px',
};
