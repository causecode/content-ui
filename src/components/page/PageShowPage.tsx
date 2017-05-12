import * as React from 'react';
import * as Radium from 'radium';
import * as DOMPurify from 'dompurify';
import {IInstancePageProps} from 'react-hero';
import {CSS} from '../../interfaces';
import {Grid} from '../reusableComponents';
import {IPage} from '../../models/PageModel';
import {fontSize, fontWeight, defaultFont, title} from '../../constants';

@Radium
export class PageShowPage extends React.Component<IInstancePageProps, void> {

    static resourceName: string = 'page';

    htmlToText = (data: string): {__html : string} => {
        if (data && data.length) {
            return {__html: `${DOMPurify.sanitize(data)}`};
        }

        return null;
    }

    render(): JSX.Element {
        const page: IPage = this.props && this.props.instance && this.props.instance.properties;
        if (!page) {
            return null;
        }

        return (
            <div style={container}>
                <Grid style={[defaultFont]}>
                    <h1 style={[title, fontWeight(600), fontSize(32)]}>{page.title}</h1>
                    <h2 style={[fontSize(26), fontWeight(400), subtitle]}>{page.subTitle}</h2>
                    <div dangerouslySetInnerHTML={this.htmlToText(page.body)} />
                </Grid>
            </div>
        );
    }
}

const container: CSS = {
    marginTop: '30px',
};

const subtitle: CSS = {
    paddingTop: '30px',
};
