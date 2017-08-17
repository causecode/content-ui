import * as React from 'react';
import {StyleRoot} from 'radium';
import {ListPage, EditPage, ShowPage, ComponentService} from 'react-hero';
import {BlogList} from '../blog/BlogList';
import {BlogShow} from '../blog/BlogShow';
import {BlogListPage} from '../../components/blog/BlogListPage';
import {BlogEdit} from '../../components/blog/BlogEditPage';
import {BlogCreate} from "../../components/blog/BlogCreatePage";
const reactRouterDom = require<any>('react-router-dom');

export class BasePage extends React.Component<void, void> {

    render(): JSX.Element {
        const {Route, Switch} = reactRouterDom;
        return (
                <StyleRoot>
                    <Switch>
                        <Route exact path="/blog/edit/:resourceID/:title" component={EditPage} />
                        <Route path="/blog/create" component={EditPage} />
                        <Route path="/blogs/:filter?/:value?" component={BlogList}></Route>
                        <Route path="/blog/:article/:title" component={BlogShow}></Route>
                        <Route path="/:resource/list" component={ListPage}/>
                        <Route path="/:resource/show/:resourceID" component={ShowPage} />
                        <Route path="/blog/create" component={EditPage} />
                    </Switch>
                </StyleRoot>
        );
    }
}
