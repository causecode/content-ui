import {CSSWideKeyword} from 'react';
import {CSS, IHelmetMeta, IEditorTypeInterface} from '../interfaces';

export const listContainer: CSS = {
    padding: '0px 30px',
};

export const setMargin = (margin: string): CSS => {
    return {margin};
};

export const defaultFont: CSS = {
    fontFamily: '"Open Sans", sans-serif',
};

export const fontSize = (normalSize: number, mobileSize?: number): CSS => {
    return {
        fontSize: `${normalSize}px`,
        '@media screen and (max-width: 768px)' : {
            fontSize: `${mobileSize || normalSize}px`,
        },
    };
};

export const fontWeight = (size: CSSWideKeyword | 'normal' | 'bold' | 'bolder' | 'lighter' |
            100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 = 400): CSS => {
    return {fontWeight: size};
};

export const title: CSS = {
    paddingTop: '62px',
};

export const defaultTextColor: string = '#605f5d';
export const causecodeOrange: string = '#F58A1F';
export const firstThemeColor: string = '#FED587';
export const buttonDefault: string = '#57BB89';
export const buttonShadow: string = '#4DA67A';
export const blogLinksOrange: string = '#eea303';

export const blogMetaData: IHelmetMeta = {
    title: 'Blog - CauseCode Technologies Pvt. Ltd.',
    description: 'Lessons and ideas around technologies we use, business practices and more.',
    keywords: 'grails, groovy, react, typescript, docker, startup, web development, mobile development',
};

export const linkStyle: CSS = {
    color: '#EEA303',
    textDecoration: 'none',
    padding: '0px',
    fontSize: '15px',
    ':hover': {
        transition: 'all .4s ease-in-out',
        textDecoration: 'none',
        color: causecodeOrange,
        background: 'initial',
    },
};

export const alertStyle: CSS = {
    margin: '57px 0px 0px 0px',
    position: 'fixed',
    width: '100%',
    textAlign: 'center',
};

export const defaultButtonStyle: CSS = {
    color: '#fff',
    border: `2px solid ${buttonDefault}`,
    background: buttonDefault,
    ':hover': {
        background: buttonShadow,
        border: `2px solid ${buttonShadow}`,
        transition: 'all .4s ease-in-out',
    },
};

export const textAlignRight: CSS = {
    textAlign: 'right',
};

export const centerStyle: CSS = {
    textAlign: 'center',
};

// Blog Page - Social Buttons
export interface ISocialList {
    url: string;
    icon: string;
}

export const socialList = [
    {'url': 'https://www.facebook.com/causecode', 'icon': 'facebook-square'},
    {'url': 'https://www.twitter.com/causecode', 'icon': 'twitter-square'},
    {'url': 'mailto:bootstrap@causecode.com', 'icon': 'envelope-square'},
];

// Different types of editors for blog
export const editorTypes: IEditorTypeInterface[] = [
    {label: 'Tiny-MCE', value: 'TINYMCE'},
    {label: 'Markdown', value: 'MARKDOWN'},
    {label: 'Raw Content', value: 'RAWCONTENT'},
];

export const ALERT_INFO = 'info';
export const ALERT_WARNING = 'warning';
export const ALERT_DANGER = 'danger';
export const ALERT_SUCCESS = 'success';

export const BLOG_CREATED: string = 'Blog created successfully.';
export const BLOG_UPDATED: string = 'Blog updated successfully.';
export const BLOG_DELETED: string = 'Blog deleted successfully.';
export const DEFAULT_ERROR_MESSAGE: string = 'Unable to process your request! Sorry for the inconvenience.';
export const IMAGE_SIZE_GT_LIMIT: string = 'Image size exceeds limit';

export const getDefaultHeaders = (): Object => {
    return {
        'x-requested-with': 'XMLHttpRequest',
        'Content-type': 'application/json',
    };
};

export const header: CSS = {
    fontFamily: 'Montserrat,sans-serif',
    fontWeight: 700,
};

export const pageHeader: CSS = {
    paddingBottom: '9px',
    margin: '40px 0px 20px',
    borderBottom: '1px solid #eee',
};
