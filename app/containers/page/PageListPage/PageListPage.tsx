import * as React from 'react';
import * as Radium from 'radium';
import {PagedList, DropDownFilter, AlertDismissable} from 'react-hero';
import {CSS} from '../../../interfaces';
import {PageAction} from '../../../components/page/PageAction/PageAction';
import {fontWeight, fontSize, title} from '../../../constants';
import {Link} from '../../../components/reusableComponents/reusableComponents';
import FontAwesome = require('react-fontawesome');

@Radium
export class PageListPage extends React.Component<void, void> {

    static resourceName: string = 'page';

    renderHeader = (): JSX.Element => {
        return (
            <div>
                <h1 style={[title, fontWeight(600), fontSize(32)]}>
                    Pages
                    <Link to="/page/create">
                        <FontAwesome name="plus" style={fontSize(26)}/>
                    </Link>
                </h1>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <div>
                <AlertDismissable />
                <div style={listContainer}>
                    <PagedList
                            resource={PageListPage.resourceName} 
                            max={15} 
                            customActions={PageAction} 
                            pageHeader={this.renderHeader()}>
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
                        <DropDownFilter
                                label="Published"
                                paramName="publish"
                                possibleValues={[
                                    {label: 'True', value: 'true'},
                                    {label: 'False', value: 'false'},
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
