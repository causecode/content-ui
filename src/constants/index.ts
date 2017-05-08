import {CSS} from '../interfaces';

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

export const fontWeight = (size: number = 400): CSS => {
    return {fontWeight: size};
};

export const title: CSS = {
    paddingTop: '62px',
};
