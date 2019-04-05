import React, { Component } from 'react';

import { MenuSmall } from './Menu';

import AppContext from '../AppContext';

class SidebarSmall extends Component {
    render() {
        return (
            <div id='sidebar-small'>
                <MenuSmall />
            </div>
        );
    }
}

class SidebarLarge extends Component {
    render() {
        return (
            <div id='sidebar'>
                <AppContext.Consumer>
                    { context => {
                        let Content = context.sidebar.content;
                        if(Content) return <Content />;
                    } }
                </AppContext.Consumer>
            </div>
        );
    }
}

export default class Sidebar extends Component {
    render() {
        return (
            <AppContext.Consumer>
                { context => {
                    if(context.sidebar.hidden) return <SidebarSmall />;
                    return <SidebarLarge />
                } }
            </AppContext.Consumer>
        );
    }
}
