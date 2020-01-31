import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as moduleActions from '../../actions';
import * as mazeConfig from '../../../maze/constants';
import { render } from 'node-sass';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const GameOptions = (props) => {
    // Create State to control the view of the component
    const { currentRoom, actions } = props;

    console.log(currentRoom);

    // Render a component based on the current view
    let renderOptions = [];

    for (const option in currentRoom.options) {
        console.log(option);
        renderOptions.push(option);
    }

    return (
        <div className="game-options">
            {/* {renderOptions} */}
        </div>
    );
};

export default connect(null, mapDispatchToProps)(GameOptions);
