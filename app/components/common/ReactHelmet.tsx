import * as React from 'react';
import * as Radium from 'radium';
import {IHelmetMeta} from '../../interfaces';
import {removeExtraSpacesFromString} from '../../utils';
import Helmet  = require('react-helmet');

export interface IReactHelmetProps {
    meta?: IHelmetMeta;
    pageTitle: string;
}

@Radium
export class ReactHelmet extends React.Component<IReactHelmetProps, void> {

    render(): JSX.Element {
        const metaTitle: string = 'title';
        const metaDescription: string = 'description';
        const metaKeywords: string = 'keywords';

        const {title, description, keywords} = this.props.meta;
        const {pageTitle} = this.props;

        const titleContent: string = removeExtraSpacesFromString(title);
        const descriptionContent: string = removeExtraSpacesFromString(description);
        const keywordsContent: string = removeExtraSpacesFromString(keywords);

        return (
             <Helmet
                    defaultTitle="CauseCode Technologies Pvt. Ltd."
                    title={pageTitle}
                    meta={[
                            {name: metaTitle, content: titleContent},
                            {name: metaDescription, content: descriptionContent},
                            {name: metaKeywords, content: keywordsContent},
                            {name: `og:${metaTitle}`, content: titleContent},
                            {name: `og:${metaDescription}`, content: descriptionContent},
                            {name: `og:${metaKeywords}`, content: keywordsContent},
                    ]}
            />
        );
    }
}
