import * as React from 'react';
import * as axios from 'axios';
import {render} from 'react-dom';
import {store} from './store';
import {Provider} from 'react-redux';
import {BasePage} from './containers/page/BasePage';
const reactRouterDom = require<any>('react-router-dom');

axios.defaults.headers.common['x-requested-with'] = 'XMLHttpRequest';

const {BrowserRouter, Route, Switch} = reactRouterDom;
render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
            <Route path="/" component={BasePage} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('container'),
);
