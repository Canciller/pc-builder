import React, { Component } from 'react';

import ContentHeader from '../components/ContentHeader';

export default class ComponentDetail extends Component {
    constructor() {
        super();
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        let params = this.props.match.params;

        let apiUrl = 'http://localhost:3000/api';
        let url = `${apiUrl}/${params.type}/${params.id}`;

        fetch(url)
            .then(res => res.json())
            .then(data => this.setState({ data }))
            .catch(err => console.log(err));
    }

    render() {
        let data = this.state.data;
        let name = null;
        let info = [];
        if(data) {
            for(let key in data) {
                if(key === '_id') continue;
                if(key === 'price') data[key] = '$' + data[key];
                info.push(
                    <div key={key} className='table-row'>
                        <div className='table-column bold'>
                            {(key.charAt(0).toUpperCase() + key.slice(1)).replace(/-/g, ' ')}
                        </div>
                        <div className='table-column'>
                            {data[key]}
                        </div>
                    </div>
                )
            }
            name = data.name;
        }

        return (
            <div id='component-detail' className='container'>
                <ContentHeader>{name || ''}</ContentHeader>
                <div className='content'>
                    {info}
                </div>
            </div>
        )
    }
}
