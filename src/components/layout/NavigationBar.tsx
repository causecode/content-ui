import * as React from 'react';
import { Link } from 'react-router';
import * as Radium from 'radium';
const RadiumLink = Radium(Link);

const NavigationBarStyle = {
    Logo: {
        paddingTop: '3px',
        '@media (max-width: 767px)': {
            paddingTop: '8px'
        }
    },
    btn: {
        paddingTop: '3px',
    },
    NavPadding: {
        padding: '15px 0px 15px 0px',
        boxShadow: '0px 0px 4px rgba(0,0,0,0.5)',
        marginBottom: '0px',
        backgroundColor: 'white',
        '@media (max-width: 767px)': {
            padding: '15px 0px 15px 15px'
        }
    },
    Links: {
        color: '#666',
        padding: '10px 15px 10px 15px',
        ':hover': {
            color: '#eea303',
            background: 'white'
        },
        ':focus': {
            color: '#bc8102',
            background: 'white'
        },
        ':active': {
            color: '#bc8102',
            background: 'white'
        }
    },
    menu: {
        backgroundColor: '#eea303'
    },
    iconBar: {
        backgroundColor: 'white'
    }
};

export interface INavigationBarProps {
    toggle: string;
}
export interface INavigationState {
    email ?: string;
    showModal ?: boolean;
}
@Radium
export default class NavigationBar extends React.Component<INavigationBarProps, INavigationState> {

    render() {
        return (
            <nav style={NavigationBarStyle.NavPadding} className="navbar navbar-fixed-top">
                <div className="container">
                    <div id="navbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                <RadiumLink key="1" style={NavigationBarStyle.Links} to="/">HOME</RadiumLink>
                            </li>
                            <li>
                                <RadiumLink key="2" style={NavigationBarStyle.Links} to="edit" >Edit</RadiumLink>
                            </li>
                            <li>
                                <RadiumLink key="3" style={NavigationBarStyle.Links} to="show">Show</RadiumLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
