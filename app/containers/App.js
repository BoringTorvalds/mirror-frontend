// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';

class App extends Component {
    constructor(context){
        super(context);
    }
    props: {
        children: HTMLElement
    };

    render() {
        return (
                <div>
                {this.props.children}
            </div>
        );
    }
}

export default connect()(App);

