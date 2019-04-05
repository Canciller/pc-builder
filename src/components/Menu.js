import React from 'react';
import { faCog, faHeart, faBookOpen, faThList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SidebarContent from './SidebarContent';

import BuildSettings from './BuildSettings';
import MyBuilds from './MyBuilds';
import ComponentList from './ComponentList';

import AppContext from '../AppContext';

import './styles/Menu.scss';

let MenuItem = props => {
    return (
        <li className='menu-item'>
            <AppContext.Consumer>
                { context => {
                    return (
                        <a onClick={() => context.sidebar.change(props.content)}>
                            <FontAwesomeIcon icon={props.icon} size='lg'/>
                            {' '}{props.children}
                        </a>
                    )
                } }
            </AppContext.Consumer>
        </li>
    );
}

let Menu = props => {
    return (
        <SidebarContent title='Menu' onClick={ (context) => context.sidebar.toggle }>
            <ul id='menu'>
                <MenuItem content={BuildSettings} icon={faCog}>Build Settings</MenuItem>
                <MenuItem content={MyBuilds} icon={faHeart}>My Builds</MenuItem>
                <MenuItem content={ComponentList} icon={faBookOpen}>Component List</MenuItem>
            </ul>
        </SidebarContent>
    );
}

let MenuSmallItem = props => {
    return (
        <AppContext.Consumer>
            {context => (
                <a onClick={() => context.sidebar.change(props.content)} className='menu-small-item'>
                    <FontAwesomeIcon icon={props.icon} size='2x' />
                </a>
            )}
        </AppContext.Consumer>
    );
}

let MenuSmall = props => {
    return (
        <div id='menu-small'>
            <AppContext.Consumer>
                { context => (
                    <a onClick={() => context.sidebar.default()} id='menu-show'>
                        <FontAwesomeIcon icon={faThList} size='2x'/>
                    </a>
                ) }
            </AppContext.Consumer>
            <MenuSmallItem content={BuildSettings} icon={faCog} />
            <MenuSmallItem content={MyBuilds} icon={faHeart} />
            <MenuSmallItem content={ComponentList} icon={faBookOpen} />
        </div>
    );
}

export default Menu;
export { MenuSmall }
