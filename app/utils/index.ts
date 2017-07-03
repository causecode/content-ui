import {getTokenFromLocalStorage} from 'react-hero';
import * as DOMPurify from 'dompurify';

export function getMonthFromString (month: string) {
    let date: number = Date.parse(month + '1, 2016');
    if (!isNaN(date)) {
        return new Date(date).getMonth() + 1;
    }

    return -1;
}

export function getMonthFromNumber (index: number) {
    index = index > 0 ? index : 1;
    let months: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'];

    return months[index - 1];
}

export function convertToFriendlyUrl(title: string): string {

    return title ? title.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-') : '';
}

export function isEmpty(obj: Object): boolean {
   let empty: boolean = true;
   for (let key in obj) {
       if (obj.hasOwnProperty(key)) {
           empty = obj[key] ? false : true;
       }
   }

   return empty;
}

export const removeExtraSpacesFromString = (text: string): string => {
    return text && text.replace(/\s\s+/g, ' ');
};

export function isLoggedIn(): boolean {
    return getTokenFromLocalStorage().trim().length > 0 ? true : false;
}

export function htmlToText(html: string): {__html: string} {
    return {__html: DOMPurify.sanitize(html)};
}