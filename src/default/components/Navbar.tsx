import * as React from 'react';

/**
 * This Component is used for standalone development. Remove it while deploying content-ui.
 */
export class Navbar extends React.Component<void, void> {
    render() {
        return (
            <div style={navStyle}>
                Navbar Component
            </div>
        );
    }
}

const navStyle: React.CSSProperties = {
    height: '50px',
    textAlign: 'center'
};
