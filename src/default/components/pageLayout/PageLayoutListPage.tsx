import * as React from 'react';
import {listContainer} from '../../../constants/index';
import {PagedList, DropDownFilter, QueryFilter} from 'react-hero';

export class PageLayoutListPage extends React.Component<void, void> {

    static resourceName: string = 'pageLayout';

    render(): JSX.Element {
        return (
            <div style={listContainer}>
                <PagedList resource={PageLayoutListPage.resourceName} max={2}>
                    <DropDownFilter
                        label="Order"
                        paramName="order"
                        possibleValues={['Ascending', 'Descending']}
                    />
                    <QueryFilter
                        label="Search"
                        paramName="query"
                        placeholder={['Search']}
                    />
                </PagedList>
            </div>
        );
    }
}
