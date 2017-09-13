/*
 * Copyright (c) 2017-Present, CauseCode Technologies Pvt Ltd, India.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or
 * without modification, are not permitted.
 */

import * as React from 'react';
import * as Radium from 'radium';
import {CSS} from '../../interfaces';
import FontAwesome = require('react-fontawesome');

export interface ISpinnerProps {
    style?: CSS;
}

/*
* A component to render the spinner
* It takes a prop `style`
* The default style for the component will be center aligned and top padding.
*/
@Radium
export class Spinner extends React.Component<ISpinnerProps, void> {
    render(): JSX.Element {
        return (
            <div style={loaderContainer}>
                <FontAwesome
                    name="circle-o-notch"
                    spin
                    size="2x"
                    style={this.props.style}
                />
            </div>
        );
    }
}

const loaderContainer: CSS = {
    paddingTop: '30vh',
    textAlign: 'center',
};
