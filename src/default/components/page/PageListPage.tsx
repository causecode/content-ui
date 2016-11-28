import * as React from 'react';
import {listContainer} from '../../../constants/index';
import {PagedList, DropDownFilter, QueryFilter} from 'react-hero';

export class PageListPage extends React.Component<void, void> {

    static resourceName: string = 'page';

    render(): JSX.Element {
        return (
            <div style={listContainer}>
                <PagedList resource={PageListPage.resourceName} max={2}>
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
