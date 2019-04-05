import React from 'react';
import { NavLink } from 'react-router-dom';

import SidebarContent from './SidebarContent';

let MenuItem = props => {
    return (
        <li className='menu-item'>
            <NavLink to={'/component/' + props.to}>
                {props.children}
            </NavLink>
        </li>
    );
}

let ComponentList = props => {
    return (
        <SidebarContent back title='Component List'>
            <ul id='menu'>
                <MenuItem to='cpu'>CPUs</MenuItem>
                <MenuItem to='cpucooler'>CPU Coolers</MenuItem>
                <MenuItem to='motherboard'>Motherboards</MenuItem>
                <MenuItem to='memory'>Memories</MenuItem>
                <MenuItem to='gpu'>GPUs</MenuItem>
                <MenuItem to='case'>Cases</MenuItem>
                <MenuItem to='psu'>PSUs</MenuItem>
                <MenuItem to='storage'>Storage</MenuItem>
            </ul>
        </SidebarContent>
    );
}

export default ComponentList;
