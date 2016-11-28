import * as React from 'react';
import {render} from 'react-dom';
import {store} from './store/index';
import {hashHistory, Router, Route} from 'react-router';
import {Provider,} from 'react-redux';
import {BasePage} from './default/components/BasePage';
import {Navbar} from './default/components/Navbar';
import {Footer} from './default/components/Footer';
import {addTheme} from './actions/addThemeActions';
import {registerModels} from './models/index';
import {registerComponents} from './default/components/index';
import {ListPage,
        EditPage,
        ShowPage,
        HeaderFooterLayout,
        HeaderView,
        ContentView,
        FooterView
    } from 'react-hero';
store.dispatch(addTheme('testTheme'));

registerModels();
registerComponents();

export interface IHeaderFooterLayoutStylesInterface {
    header: React.CSSProperties;
    content: React.CSSProperties;
    navIcon: React.CSSProperties;
    nav: React.CSSProperties;
    footer: React.CSSProperties;
}

const headerFooterLayoutStyles: IHeaderFooterLayoutStylesInterface = {
    header: {
        padding: '0px',
        background: 'transparent',
        zIndex: 1001
    },
    content: {
        overflow: 'auto'
    },
    navIcon: {
        display: 'none'
    },
    nav: {
        backgroundColor: '#fff'
    },
    footer: {
        padding: '0px'
    }
};

render(
    <Provider store={store}>
        <HeaderFooterLayout style={headerFooterLayoutStyles}>
            <HeaderView>
                <Router history={hashHistory}>
                    <Route path="/" component={BasePage}>
                        <Route path="*" component={Navbar}></Route>
                    </Route>
                </Router>
            </HeaderView>
            <ContentView>
                <Router history={hashHistory}>
                    <Route path="/" component={BasePage}>
                        <Route path="/:resource/list" component={ListPage}/>
                        <Route path="/:resource/create" component={EditPage}/>
                        <Route path="/:resource/show/:resourceID" component={ShowPage} />
                        <Route path="/:resource/edit/:resourceID" component={EditPage} />
                    </Route>
                </Router>
            </ContentView>
            <FooterView>
                <Router history={hashHistory}>
                    <Route path="/" component={BasePage}>
                        <Route path="*" component={Footer}/>
                    </Route>
                </Router>
            </FooterView>
        </HeaderFooterLayout>
    </Provider>
    , document.getElementById('container')
);
