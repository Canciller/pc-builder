import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ContentHeader from '../components/ContentHeader';

import AppContext from '../AppContext';

import './styles/ComponentList.scss';

let maxRating = 5;

let Rating = props => {
    let starts = [];
    let rating = Math.min(maxRating, props.rating);
    for(let i = 0; i < rating; ++i)
        starts.push(<FontAwesomeIcon key={i.toString()} icon={faStar} size='xs'/>);

    return (
        <div className={props.className}>
            {starts}
        </div>
    );
}

class Part extends Component { 
    constructor() {
        super();

        this.state = {
            redirect: false,
        }

        this.renderRedirect =  () => {
            if(this.state.redirect) return <Redirect to='/' />;
        }
    }

    render() {
        let props = this.props,
            data = props.data;

        return (
            <div className='component-list-item table-row'>
                {this.renderRedirect()}
                <div className='table-column col-1 bold'>
                    <Link to={`/component/${props.type}/${data._id}`}>
                    {data.name}
                    </Link>
                </div>
                <Rating className='component-rating table-column col-2' rating={Math.floor(data.rating)} />
                <div className='table-column col-3 bold'>
                    ${data.price && data.price.toFixed(2)}
                </div>
                <div className='table-column col-4'>
                    <AppContext.Consumer>
                        { context => (
                            <button onClick={ () => {
                                let added = context.build.addPart({ id: data._id, name: data.name, price: data.price, type: props.type });
                                if(added) this.setState({ redirect: true });
                            } }>Add</button>
                        ) }
                    </AppContext.Consumer>
                </div>
            </div>
        );
    }
}

export default class ComponentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null
        }
    }

    componentDidMount() {
        let props = this.props;
        fetch('http://localhost:3000/api/' + props.api)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({ data })})
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        let data = this.state.data;
        let list = [];
        if(data)
            for(let i = 0; i < data.length; ++i)
                list.push(<Part key={i.toString()} type={this.props.type.toLowerCase().replace(/\s/g, '')} data={data[i]} />);

        if(list.length === 0) list = (
            <div id='component-list-empty'>
                <p>No components found</p>
            </div>
        );
        else {
            list.unshift(
                <div key='-1' className='table-row'>
                    <div className='table-header col-1'>
                        {this.props.type}
                    </div>
                    <div className='table-header col-2'>
                        Rating
                    </div>
                    <div className='table-header col-3'>
                        Price
                    </div>
                    <div className='table-header col-4'>
                        <p>Add</p>
                    </div>
                </div>
            );
        }

        return (
            <div id='component-list' className='container'>
                <ContentHeader>Choose a {this.props.type}</ContentHeader>
                <div className='content'>
                    {list}
                </div> 
            </div>
        );
    }
}
