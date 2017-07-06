import * as React from 'react';
import {StyleRoot} from 'radium';
import {BlogList} from '../blog/BlogList';
import {BlogShow} from '../blog/BlogShow';
import {ListPage, EditPage, ShowPage} from 'react-hero';
const reactRouterDom = require<any>('react-router-dom');

export class BasePage extends React.Component<void, void> {
    
    render(): JSX.Element {
        const {Route, Switch} = reactRouterDom;
        return (
            <Switch>
                <StyleRoot>
                    <Route path="/blogs/:filter?/:value?" component={BlogList}></Route>
                    <Route path="/blog/:article/:title" component={BlogShow}></Route>
                    <Route path="/:resource/list" component={ListPage}/>
                    <Route path="/:resource/show/:resourceID" component={ShowPage} />
                    <Route path="/:resource/edit/:resourceID" component={EditPage} />
                </StyleRoot>
            </Switch>
        );
    }
}
