import * as React from 'react';
import {StyleRoot} from 'radium';
import {ListPage, EditPage, ShowPage, ComponentService} from 'react-hero';
import {BlogList} from '../blog/BlogList';
import {BlogShow} from '../blog/BlogShow';
import {BlogListPage} from '../../components/blog/BlogListPage';
import {BlogEdit} from '../../components/blog/BlogEditPage';
const reactRouterDom = require<any>('react-router-dom');

export class BasePage extends React.Component<void, void> {

    render(): JSX.Element {
        ComponentService.register(BlogListPage, 'list');
        ComponentService.register(BlogEdit, 'edit');
        const {Route, Switch} = reactRouterDom;
        return (
            <Switch>
                <StyleRoot>
                    <Route path="/blogs/:filter?/:value?" component={BlogList}></Route>
                    <Route path="/blog/:article/:title" component={BlogShow}></Route>
                    <Route path="/:resource/list" component={ListPage}/>
                    <Route path="/:resource/show/:resourceID" component={ShowPage} />
                    <Route path="/admin/:resource/edit/:resourceID" component={EditPage} />
                </StyleRoot>
            </Switch>
        );
    }
}
