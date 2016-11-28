import {ModelService} from 'react-hero';
import {BlogModel} from './BlogModel';
import {FaqModel} from './FaqModel';
import {MenuModel} from './MenuModel';
import {NewsModel} from './NewsModel';
import {PageLayoutModel} from './PageLayoutModel';
import {PageModel} from './PageModel';

export function registerModels() {
    ModelService.registerAll(
            BlogModel,
            FaqModel,
            MenuModel,
            NewsModel,
            PageLayoutModel,
            PageModel
    );
}
