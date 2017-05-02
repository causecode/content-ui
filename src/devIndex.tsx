import * as React from 'react';
import {render} from 'react-dom';
import {store} from './store/index';
import {browserHistory, Router, Route} from 'react-router';
import {ListPage, EditPage, ShowPage} from 'react-hero';
import {Provider} from 'react-redux';
import {BasePage} from './components/BasePage';

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={BasePage}>
                <Route path=":resource/list" component={ListPage}/>
                <Route path=":resource/show/:resourceID" component={ShowPage} />
                <Route path=":resource/edit/:resourceID" component={EditPage} />
            </Route>
        </Router>
    </Provider>
    , document.getElementById('container')
);
