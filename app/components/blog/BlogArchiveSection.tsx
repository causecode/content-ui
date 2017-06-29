import * as React from 'react';
import * as Radium from 'radium';
import {Link, Nav} from '../reusable-components/reusableComponents';
import {CSS} from '../../interfaces';
import {linkStyle} from '../../constants';
import {getMonthFromString} from '../../utils';
import {BlogModel} from '../../models';

export interface IBlogArchiveSectionProps {
    monthList: string[];
};

@Radium
export class BlogArchiveSection extends React.Component<IBlogArchiveSectionProps, void> {
    private list: JSX.Element[];

    applyMonthFilter = (monthFilter: string): void => {
        BlogModel.list({max: 10, offset: 0, monthFilter: monthFilter});
    }

    removeMonthFilter = (): void => {
        BlogModel.list({max: 10, offset: 0});
    }

    getYearMonthFromMonthFilter = (monthFilter: string): {year: number, month: number} => {
        let filter: Array<string> = monthFilter.split('-');
        let year: number = parseInt(filter[1], 10);
        let month: number = getMonthFromString(filter[0]);
        return {year, month};
    }

    componentWillMount = (): void => {
        if (this.props.monthList.length > 0 && !this.list) {
            this.publishMonthList(this.props);
        }
    }

    componentWillReceiveProps = (nextProps: IBlogArchiveSectionProps): void => {
        this.publishMonthList(nextProps);
    }

    publishMonthList = (nextProps: IBlogArchiveSectionProps): void => {
        this.list = nextProps.monthList.map((monthFilter: string, index: number): JSX.Element => {
            let {year, month} = this.getYearMonthFromMonthFilter(monthFilter);
            return (
                <li key={index} style={archivesList}>
                    <Link
                            key={index}
                            style={linkStyle}
                            onClick={() => {this.applyMonthFilter(monthFilter);}}
                            to={`/blogs/${year}/${month}`}>{monthFilter}
                    </Link>
                 </li>
            );
        });
    }

    getArchivesList = (): JSX.Element[] => {
        return this.list;
    }

    render(): JSX.Element {
        return (
            <section style={blogArchiveSectionStyle}>
                <h3 style={title}>Archives</h3>
                <Nav bsStyle="pills" stacked>
                    <li style={archivesList}>
                        <Link style={linkStyle} onClick={() => this.removeMonthFilter()} to={'/blogs'}>
                            ALL
                        </Link>
                    </li>
                    {this.getArchivesList()}
                </Nav>
            </section>
        );
    }
}

const blogArchiveSectionStyle: CSS = {
    marginBottom: '60px',
};
const title: CSS = {
    margin: '0px 0px 15px',
    color: '#666',
    font: 'normal normal 400 22px normal Monyserrat,sans-serif',
};
const archivesList: CSS = {
    paddingLeft: '0px',
    listStyle: 'none',
    margin: '2px 0px 10px 0px',
};
