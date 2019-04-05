import React, { Component } from 'react';

import AppContext from '../AppContext';
import SidebarContent from './SidebarContent';

import './styles/BuildSettings.scss';

export default class BuildSettings extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            setName: name => {
                if(name === '') name = null;
                this.setState({ name });
            },
            author: null,
            setAuthor: author => {
                if(author === '') author = null;
                this.setState({ author });
            },
            description: null,
            setDescription: description => {
                if(description === '') description = null;
                this.setState({ description });
            }
        }
    }

    render() {
        return (
            <SidebarContent back title='Build Settings'>
                <div id='build-settings'>
                    <div id='build-settings-info' className='settings-title'>
                        Info
                    </div>
                    <div id='build-settings-info-content' className='settings-content'>
                        <input onChange={ (e) => this.state.setName(e.target.value) } type='text' placeholder='build name'/>
                        <input onChange={ (e) => this.state.setAuthor(e.target.value) } type='text' placeholder='author' />
                        <textarea onChange={ (e) => this.state.setDescription(e.target.value) } placeholder='description' rows='20' />
                        <div id='build-settings-save-button'>
                            <AppContext.Consumer>
                                { context => (
                                    <button onClick={ () => {
                                        context.build.setBuildSettings({ 
                                            name: this.state.name,
                                            author: this.state.author,
                                            description: this.state.description
                                        });
                                    } }>Write</button>
                                ) }
                            </AppContext.Consumer>
                        </div>
                    </div>
                </div>
            </SidebarContent>
        );
    }
}
