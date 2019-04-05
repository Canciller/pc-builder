import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ContentHeader from '../components/ContentHeader';

import AppContext from '../AppContext';

import './styles/Builder.scss';

let Part = props => {
    let data = props.data;
    return (
        <div className='component-list-item table-row'>
            <div className='table-column col-1 bold'>
                {data.part}
            </div>
            <div className='table-column col-2 bold'>
                <Link to={'/component/' + data.type + '/' + data.id}>
                    {data.name}
                </Link>
            </div>
            <div className='table-column col-3 bold'>
                ${data.price.toFixed(2)}
            </div>
            <div className='table-column col-4 bold'>
                <AppContext.Consumer>
                    { context => <button onClick={ () => context.build.deletePart(data.type) }>Remove</button> } 
                </AppContext.Consumer>
            </div>
        </div>
    );
}

let PartSelect = props => {
    return (
        <div className='component-list-item table-row'>
            <div className='table-column col-1 bold'>
                {props.type}
            </div>
            <div className='table-column col-2 bold'>
                <Link to={props.url}>
                    <button>Choose a {props.type}</button>
                </Link>
            </div>
            <div className='table-column col-3 bold'></div>
            <div className='table-column col-4 bold'></div>
        </div>
    )
}

export default class Builder extends Component {
    constructor(props) {
        super(props);

        this.partTypes = [
            'cpu',
            'cpucooler',
            'motherboard',
            'memory',
            'psu',
            'gpu',
            'case',
            'storage'
        ]

        this.partNames = [
            'CPU',
            'CPU Cooler',
            'Motherboard',
            'Memory',
            'PSU',
            'GPU',
            'Case',
            'Storage'
        ]
    }

    render() {
        let parts = [];

        parts.push(
            <div key='-1' className='component-list-item table-row'>
                <div className='table-header col-1'>
                    Component
                </div>
                <div className='table-header col-2'>
                    Selection
                </div>
                <div className='table-header col-3'>
                    Price
                </div>
                <div className='table-header col-4'></div>
            </div>
        );

        for(let i = 0; i < this.partTypes.length; ++i) {
            parts.push(
                <AppContext.Consumer key={i.toString()}>
                    { context => {
                        let partType = this.partTypes[i], 
                            partName = this.partNames[i];

                        let found = context.build.getPart(partType);

                        if(found) return (
                            <Part data={ {id: found.id, part: partName, type: partType, name: found.name, price: found.price} } />
                        ); else return (
                            <PartSelect type={partName} url={`/component/${partType}`} />
                        );
                    } }
                </AppContext.Consumer>
            );
        }

        parts.push(
            <div key='-2' className='component-list-item table-row'>
                <div className='table-column col-1'></div>
                <div id='builder-total' className='table-column col-2 bold'>
                    Total:
                </div>
                <div className='table-column col-3 bold'>
                    <AppContext.Consumer>
                        { context => '$' + context.build.priceTotal.toFixed(2).toString() }
                    </AppContext.Consumer>
                </div>
                <div className='table-column col-4'></div>
            </div>
        );

        return (
            <div id='builder' className='container'>
                <ContentHeader>Builder</ContentHeader>
                <div className='content'>
                    {parts}
                </div>
            </div>
        );
    }
}
