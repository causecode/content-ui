import * as React from 'react';
import * as Radium from 'radium';
import {FontAwesomeRadium} from '../../reusableComponents/reusableComponents';
import {CSS} from '../../../interfaces';
import {socialList, firstThemeColor, ISocialList} from '../../../constants';

@Radium
export class BlogGetConnectedBar extends React.Component<void, void> {

    private list: JSX.Element[] = [];

    getSocialButtons() {
        if (this.list.length === 0) {
            socialList.map((social: ISocialList, index: number) => {
                let element = (
                    <li key={index}>
                        <a href={social.url} data-share="true">
                            <FontAwesomeRadium name={social.icon} style={icon} />
                        </a>
                    </li>
                );
                this.list.push(element);
            });
        }
        return this.list;
    }

    render(): JSX.Element {
        return (
            <section style={blogGetConnectedBarStyle}>
                <h3 style={title}>Get Connected</h3>
                <ul className="list-inline">
                    {this.getSocialButtons()}
                </ul>
            </section>
        );
    }
};

const blogGetConnectedBarStyle: CSS = {
    marginBottom: '60px',
};

const title: CSS = {
    fontSize: '22px',
    margin: '0px 0px 15px 0px',
    fontWeight: 400,
    color: '#666',
    fontFamily: 'Montserrat,sans-serif',
};

const icon: CSS = {
    fontSize: '32px',
    color: '#999',
    ':hover': {
        color: firstThemeColor,
    },
};
