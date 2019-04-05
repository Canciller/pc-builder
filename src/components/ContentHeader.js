import React, { Component } from 'react';

export default class ContentHeader extends Component {
    render() {
        return (
            <div id={this.props.id} className='content-header'>
                <h1>{this.props.children}</h1>
            </div>
        );
    }
}
