import * as React from 'react';
import {CSS} from '../../interfaces';
import {defaultTextColor} from '../../constants';

export interface IBlogInstanceTagsProps {
    blogInstanceTagList: string[];
}

export class BlogInstanceTags extends React.Component<IBlogInstanceTagsProps, void> {
    private list: JSX.Element[];

    componentWillReceiveProps = (nextProps): void => {
        this.list = nextProps.blogInstanceTagList.map((tag, index) => {
            return (
                <span key={index} style={tagStyle} >{tag}</span>
            );
        });
    }

    render(): JSX.Element {
        return (
            <div style={outerDivStyle}>
                <h2 style={headerStyle}>Tags</h2>
                <hr style={hrStyle}/>
                <div style={divStyle}>
                    {this.list}
                </div>
            </div>
        );
    }
}

const headerStyle: CSS = {
    marginBottm: '15px',
    fontWeight: 'bold',
    fontSize: '28px',
    color: defaultTextColor,
};

const hrStyle: CSS = {
    color: '#444',
    borderTop: '1px solid #eee',
    margin: '20px 0px',
};

const outerDivStyle: CSS = {
    display: 'block',
    marginBottom: '35px',
};

const divStyle: CSS = {
    paddingLeft: '10px',
    color: defaultTextColor,
};

const tagStyle: CSS = {
    color: '#fff',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    backgroundColor: '#f0ad4e',
    borderRadius: '3px',
    padding: '2.4px 7.2px 3.6px',
    fontSize: '13px',
    fontWeight: 'bold',
    lineHeight: '12px',
    fontFamily: 'Lato, arial, sans-serif',
    marginRight: '12px',
    boxSizing: 'border-box',
    display: 'inline',
};
