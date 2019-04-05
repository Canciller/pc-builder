import React, { Component } from 'react';

export default class Content extends Component {
    render() {
        render(
            <div className='content'>
                {this.props.children}
            </div>
        )
    }
}
