import React from 'react';
import { faTimes, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import AppContext from '../AppContext';

import './styles/SidebarContent.scss';

let BackButton = props => (
    <a onClick={props.onClick} className='sidebar-back'>
        {props.back && <FontAwesomeIcon icon={ faAngleLeft } />}{' '}{props.title}
    </a>
);

let ToggleButton = props => (
    <a onClick={props.onClick} className='sidebar-hide'>
        <FontAwesomeIcon icon={ faTimes } />
    </a>
);

let SidebarContent = props => {
    let back = props.onClick;
    if(!back) back = (context) => context.sidebar.default;

    return (
        <div id={props.id} className='sidebar-content'>
            <div className='sidebar-content-title'>
                <AppContext.Consumer>
                    { context => <BackButton onClick={ back(context) } back={props.back} title={props.title} /> }
                </AppContext.Consumer> 
                <AppContext.Consumer>
                    { context => <ToggleButton onClick={ context.sidebar.toggle } /> }
                </AppContext.Consumer>
            </div>
            <div className='sidebar-content-children'>
                {props.children}
            </div>
        </div>
    );
}

export default SidebarContent;
