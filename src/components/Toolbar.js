import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { faTools, faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppContext from '../AppContext';

import './styles/Toolbar.scss';

export default class Toolbar extends Component {
    render() {
        return (
            <div id='toolbar'>
                <div id='toolbar-left'>
                    <NavLink id='toolbar-builder-link' exact to='/'>
                        <h1><FontAwesomeIcon icon={ faTools } size='lg' />{' '}PC Builder</h1>
                        <AppContext.Consumer>
                            { context => <p>{' '}{context.build.name}</p> }
                        </AppContext.Consumer>
                    </NavLink>
                </div>
                <div id='toolbar-right'>
                    <AppContext.Consumer>
                        { context => (
                            <button onClick={ () => {
                            alert(`Build saved as '${context.build.name}'`);
                                context.build.saveBuild()
                            } }id='toolbar-button-save'>
                                <FontAwesomeIcon icon={ faSave } />{' '}Save
                            </button>
                        ) }
                    </AppContext.Consumer>
                </div>
            </div>
        );
    }
}
