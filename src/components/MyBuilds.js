import React from 'react';

import AppContext from '../AppContext';
import SidebarContent from './SidebarContent';

import './styles/MyBuilds.scss';

export default class MyBuilds extends React.Component {
    constructor() {
        super();
        this.state = {
            data: '',
            createData: () => {
                let apiUrl = 'http://localhost:3000/api';
                let url = `${apiUrl}/build`;

                fetch(url)
                    .then(res => res.json())
                    .then(data => this.setState({ data }))
                    .catch(err => console.log(err));
            },
            content: '',
            createContent: (build) => {
                let content = (
                    <div id='my-builds-container'>
                        <div id='my-builds-content'>
                            <p id='my-builds-name'>
                                <span>Name:</span>
                                {build.name}</p>
                            {build.author !== '' &&
                            <p id='my-builds-author'>
                                <span>Author:</span>
                                {build.author}</p>
                            }
                            {build.description !== '' &&
                            <p id='my-builds-description'>
                                <span>Description:</span>
                                {build.description}</p>
                            }
                            <p id='my-builds-price'>
                                <span>Price:</span>
                                ${parseFloat(build.price).toFixed(2)}</p>
                            <p id='my-builds-load'>
                                <AppContext.Consumer>
                                    { context => {
                                        return (
                                            <button onClick={() => {
                                                context.build.deleteParts();
                                                for(let i = 0; i < build.parts.length; ++i) {
                                                    let part = build.parts[i];
                                                    let url = `http://localhost:3000/api/${part.type}/${part.id}`;
                                                    fetch(url)
                                                        .then(res => res.json())
                                                        .then(p => {
                                                            let newPart = {
                                                                id: part.id,
                                                                price: p.price,
                                                                name: p.name,
                                                                type: part.type
                                                            }
                                                            context.build.addPart(newPart);
                                                        })
                                                        .catch(err => console.log(err));
                                                }
                                            }}>Load</button>
                                        )
                                    } }
                                </AppContext.Consumer>
                                <button onClick={() => {
                                    this.setState({ content: '' });
                                    fetch(`http://localhost:3000/api/build/${build._id}`, { method: 'delete' })
                                        .catch(err => console.log(err));
                                    this.state.createData();
                                }}>Delete</button>
                            </p>
                        </div>
                    </div>
                );
                this.setState({ content });
            }
        }
    }

    componentDidMount() {
        let apiUrl = 'http://localhost:3000/api';
        let url = `${apiUrl}/build`;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ data }))
            .catch(err => console.log(err));
    }

    render() {
        let data = this.state.data;
        let builds = [],
            content = this.state.content;

        if(data) {
            for(let i = 0; i < data.length; ++i) {
                builds.push(
                    <div key={i.toString()} className='build'>
                        <a onClick={ () => {
                            this.state.createContent(data[i]);
                        } }>{data[i].name}</a>
                    </div>
                );
            }
        }

        return (
            <SidebarContent back title='My Builds'>
                <div id='my-builds'>
                    {builds}
                    {content}
                </div>
            </SidebarContent>
        )
    }
}
