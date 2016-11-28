import * as React from 'react';

/**
 * This Component is used for standalone development. Remove it while deploying content-ui.
 */
export class Footer extends React.Component<void, void> {
    render() {
        return (
            <div style={footerStyle}>
                Footer Component 
            </div>
        );
    }
}

const footerStyle: React.CSSProperties = {
    height: '50px',
    textAlign: 'center'
};
