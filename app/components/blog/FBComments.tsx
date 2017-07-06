import * as React from 'react';

export interface IFBComments {
    appId?: string;
    colorScheme?: string;
    href?: string;
    locale?: string;
    mobile?: boolean;
    numPosts?: number;
    orderBy?: string;
    version?: string;
    width?: number;
    xfbml?: boolean;
}

export class FBComments extends React.Component<IFBComments, void> {

static defaultProps = {
    colorScheme: 'light',
    locale: 'en_US',
    numPosts: 10,
    orderBy: 'social',
    version: 'v2.5',
    width: 500,
    xfbml: true,
};

    componentWillUnmount = () => {
        if (document.getElementById('facebook-jssdk')) {
            let fbSdk = document.getElementById('facebook-jssdk');
            fbSdk.parentNode.removeChild(fbSdk);
        }
        if (window.FB) {
            delete window.FB;
        }
        if (document.getElementById('fb-root')) {
            let fbRoot = document.getElementById('fb-root');
            fbRoot.parentNode.removeChild(fbRoot);
        }
    }

    componentDidMount = () => {
        const {appId, locale, version, xfbml} = this.props;
        window.fbAsyncInit = () => {
            FB.init({ // eslint-disable-line no-undef
            appId: appId,
            xfbml: xfbml,
            version: version,
            });
        };

        // Load the SDK asynchronously
        ((d, s, id) => { // eslint-disable-line id-length
            if (!d.getElementById('fb-root')) {
                let fbRoot = d.createElement('div');
                fbRoot.id = 'fb-root';
                let divContainer = d.getElementsByTagName('div')[0];
                divContainer.parentNode.insertBefore(fbRoot, divContainer);
            }
            const element = d.getElementsByTagName(s)[0];
            const fjs = element;
            let js: any = element;
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }


    componentDidUpdate = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }

    render(): JSX.Element {
        const {colorScheme, href, mobile, numPosts, orderBy, width} = this.props;
        const mobileParam = mobile ? {'data-mobile': mobile} : {};
        const widthParam = width ? {'data-width': width} : {};
        return (
            <span>
                <div className="fb-comments"
                    data-href={href}
                    data-colorscheme={colorScheme}
                    data-numposts={numPosts}
                    data-order-by={orderBy}
                    {...mobileParam}
                    {...widthParam}></div>
            </span>
        );
    }
}
