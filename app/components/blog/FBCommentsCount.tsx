import * as React from 'react';

export interface IFBCommentsCount {
    appId?: string;
    href?: string;
    locale?: string;
    version?: string;
    xfbml?: boolean;
    loadCommentCount?: boolean;
}
export class FBCommentsCount extends React.Component<IFBCommentsCount, void> {

    static defaultProps = {
        locale: 'en_US',
        version: 'v2.5',
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
        (function(d, s, id) {
            if (!d.getElementById('fb-root')) {
                let fbRoot = d.createElement('div');
                fbRoot.id = 'fb-root';
                let divContainer = d.getElementsByTagName('div')[0];
                divContainer.parentNode.insertBefore(fbRoot, divContainer);
            }
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s); js.id = id;
            js.src = `//connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }


    componentDidUpdate = () => {
        if (window.FB && this.props.loadCommentCount) {
            window.FB.XFBML.parse();
        }
    }

    render(): JSX.Element {
        const {href} = this.props;
        return (
        <span>
            <span className="fb-comments-count"
            data-href={href}></span>
        </span>
        );
    }
}
