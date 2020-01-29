import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as moduleActions from '../actions';

import Maze from '../../maze/Maze';
import OptionsMenu from './OptionsMenu';
import MazeContainer from './MazeContainer';

const mapStateToProps = (state) => ({
    state: state
 })

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch)
})

class App extends Component {
    render() {
        console.log(this.props.state);
        try {
            Maze.validateMazeConfig('map')
        }
        catch(e) {
            // Return error message to user
            console.error(e);
        }
        const maze = new Maze('map')

        console.log(maze)
        return (
            <div className="app">
                <OptionsMenu />
                <header>
                    <img src='android-chrome-512x512.png' alt='logo' />
                    <h1>aDungeon</h1>
                </header>
                <MazeContainer />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
