import * as React from 'react';
import * as Radium from 'radium';
import {FontAwesomeRadium, Link} from '../reusable-components/reusableComponents';
import {CSS} from '../../interfaces';

export interface IFontAwesomeLinkProps {
    to: string;
    style?: CSS;
    iconName: string;
    iconStyle?: CSS;
}

@Radium
export class FontAwesomeLink extends React.Component<IFontAwesomeLinkProps, void> {
    render(): JSX.Element {
        return (
            <span>
                <Link style={this.props.style} to={this.props.to}>
                    <FontAwesomeRadium style={this.props.iconStyle} name={this.props.iconName} />
                    {this.props.children}
                </Link>
            </span>
        );
    }
}
