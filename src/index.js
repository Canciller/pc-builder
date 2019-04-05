import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';

import Menu from './components/Menu';

import Builder from './views/Builder';
import ComponentList from './views/ComponentList';
import ComponentDetail from './views/ComponentDetail';

import AppContext from './AppContext';

import './styles/main.scss';

class AppProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sidebar: {
                content: Menu,
                hidden: false,
                change: content => {
                    let sidebar = this.state.sidebar
                    if(sidebar.hidden) sidebar = sidebar.toggle();

                    sidebar.content = content;
                    this.setState({ sidebar });
                },
                default: () => {
                    let sidebar = this.state.sidebar
                    if(sidebar.hidden) sidebar = sidebar.toggle();

                    sidebar.content = Menu;
                    this.setState({ sidebar });
                },
                toggle: () => {
                    let sidebar = this.state.sidebar;
                    sidebar.hidden = !sidebar.hidden;
                    this.setState({ sidebar });

                    return sidebar;
                }
            },
            user: {
                id: null,
            },
            build: {
                priceTotal: 0,
                parts: [],
                addPart: (part) => {
                    if(!part) return false;

                    let build = this.state.build;

                    let found = build.parts.find(el => {
                        return el.type === part.type;
                    });

                    if(found) return false;

                    build.priceTotal += part.price;
                    build.parts.push(part);
                    this.setState({ build })

                    return true;
                },
                getPart: (type) => {
                    let build = this.state.build;
                    let found = build.parts.find(el => {
                        return el.type === type;
                    });
                    return found;
                },
                deletePart: (type) => {
                    let build = this.state.build;
                    let filtered = build.parts.filter(el => {
                        if(el.type === type) {
                            build.priceTotal -= el.price;
                            if(build.priceTotal < 0) build.priceTotal = 0;
                            return false;
                        }
                        return true;
                    });
                    build.parts = filtered;
                    this.setState({ build });
                },
                deleteParts: () => {
                    let build = this.state.build;
                    build.parts = [];
                    build.priceTotal = 0;
                    this.setState({ build });
                    console.log(this.state.build.parts);
                },
                name: 'untitled',
                author: '',
                description: '',
                setBuildSettings: settings => {
                    let build = this.state.build;
                    build.name = settings.name || 'untitled';
                    build.author = settings.author || '';
                    build.description = settings.description || '';
                    this.setState({ build });
                },
                saveBuild: () => {
                    let build = this.state.build;

                    let partIds = [];
                    let parts = build.parts;

                    for(let i = 0; i < parts.length; ++i)
                        partIds.push({ id: parts[i].id, type: parts[i].type });

                    let buildToSave = {
                        name: build.name,
                        author: build.author,
                        description: build.description,
                        parts: partIds,
                        price: build.priceTotal,
                        creation_date: new Date()
                    }

                    fetch('http://localhost:3000/api/build', {
                        method: 'post',
                        headers: {
                           'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(buildToSave)
                    }).then(res => res.json()).then(res => console.log(res));
                }
            }
        }
    }

    render() {
        return (
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
}

let Main = props => {
    return (
        <div className='root-container'>
            <Toolbar />
            <div className='root-content'>
                <Sidebar />
                {props.children}
            </div>
        </div>
    )
}

let List = props => (
    <Main>
        <ComponentList type={props.name || props.api.toUpperCase()} api={props.api} />;
    </Main>
);

let Index = () => {
    return (
        <Main>
            <Builder />
        </Main>
    );
}

export default class App extends Component {
    render() {
        return (
            <AppProvider>
                <BrowserRouter>
                    <Route exact path='/' render={ () => <Index /> } />
                    <Route exact path='/component/cpu' render={ () => <List api='cpu' /> } />
                    <Route exact path='/component/cpucooler' render={ () => <List name='CPU Cooler' api='cpucooler' /> } />
                    <Route exact path='/component/motherboard' render={ () => <List name='Motherboard' api='motherboard' /> } />
                    <Route exact path='/component/gpu' render={ () => <List api='gpu' /> } />
                    <Route exact path='/component/psu' render={ () => <List api='psu' /> } />
                    <Route exact path='/component/case' render={ () => <List name='Case' api='case' /> } />
                    <Route exact path='/component/storage' render={ () => <List name='Storage' api='storage' /> } />
                    <Route exact path='/component/memory' render={ () => <List name='Memory' api='memory' /> } />
                    <Route path='/component/:type/:id' render={ (props) => <Main><ComponentDetail match={props.match} /></Main> } />
                </BrowserRouter>
            </AppProvider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
