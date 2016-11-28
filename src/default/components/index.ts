import {ComponentService} from 'react-hero';
import {MenuListPage} from './menu/MenuListPage';
import {PageListPage} from './page/PageListPage';
import {PageLayoutListPage} from './pageLayout/PageLayoutListPage';
import {FaqListPage} from './faq/FaqListPage';
import {NewsListPage} from './news/NewsListPage';

export function registerComponents() {
    ComponentService.registerAll(
            'list',
            MenuListPage,
            PageListPage,
            PageLayoutListPage,
            FaqListPage,
            NewsListPage
    );
}
