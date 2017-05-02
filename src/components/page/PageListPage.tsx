import * as React from 'react';
import * as Radium from 'radium';
import {listContainer} from '../../constants';
import {PagedList, DropDownFilter, QueryFilter} from 'react-hero';

@Radium
export class PageListPage extends React.Component<void, void> {

    static resourceName: string = 'page';

    render(): JSX.Element {
        return (
            <div style={listContainer}>
                <PagedList resource={PageListPage.resourceName}>
                    <DropDownFilter
                            label="Order"
                            paramName="order"
                            possibleValues={[
                                {label: 'Ascending', value: 'asc'},
                                {label: 'Descending', value: 'desc'},
                            ]}
                    />
                    <QueryFilter
                            label="Search"
                            paramName="query"
                            placeholder="Search"
                    />
                </PagedList>
            </div>
        );
    }
}
