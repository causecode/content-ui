import {ComponentService} from 'react-hero';
import {MenuListPage} from './menu/MenuListPage';
import {PageListPage} from './page/PageListPage';
import {PageLayoutListPage} from './pageLayout/PageLayoutListPage';
import {FaqListPage} from './faq/FaqListPage';
import {NewsListPage} from './news/NewsListPage';
import {MenuEditPage} from './menu/MenuEditPage';
import {PageEditPage} from './page/PageEditPage';
import {FaqEditPage} from './faq/FaqEditPage';
import {NewsEditPage} from './news/NewsEditPage';
import {MenuShowPage} from './menu/MenuShowPage';
import {PageShowPage} from './page/PageShowPage';
import {FaqShowPage} from './faq/FaqShowPage';
import {NewsShowPage} from './news/NewsShowPage';

export function registerComponents() {

    ComponentService.registerAll(
            'list',
            MenuListPage,
            PageListPage,
            PageLayoutListPage,
            FaqListPage,
            NewsListPage
    );

    ComponentService.registerAll(
            'edit',
            MenuEditPage,
            PageEditPage,
            FaqEditPage,
            NewsEditPage
    );

    ComponentService.registerAll(
            'show',
            MenuShowPage,
            PageShowPage,
            FaqShowPage,
            NewsShowPage
    );

    ComponentService.registerAll(
            'create',
            MenuEditPage,
            PageEditPage,
            FaqEditPage,
            NewsEditPage
    );
}
