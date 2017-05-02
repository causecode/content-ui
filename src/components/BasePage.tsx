import * as React from 'react';
import {StyleRoot} from 'radium';

export class BasePage extends React.Component<void, void> {
    render(): JSX.Element {
        return(
            <StyleRoot>
                <div>
                    {this.props.children}
                </div>
            </StyleRoot>
        );
    }
}
