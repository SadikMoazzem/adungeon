import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import * as moduleActions from '../../actions';
import * as mazeConfig from '../../../maze/constants';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
});

const GameOptions = (props) => {
    // Create State to control the view of the component
    const { currentRoom, actions } = props;

    // Create State to control the view of the component
    const [currentOption, updatecurrentOption] = useState('');
    const [previousOption, updatepreviousOption] = useState('');

    // Render a component based on the current view
    let renderOptions = [];
    let renderBackBtn = '';

    switch (currentOption) {
        case '':
            renderOptions = [];
            for (const option in currentRoom.actions) {
                renderOptions.push(
                    <div
                        className="game-action"
                        onClick={() => {
                            updatepreviousOption(currentOption);
                            updatecurrentOption(option);
                        }}
                    >
                        { option }
                        <div className="game-action--sub-text">
                            { mazeConfig.ACTION_TIPS[option] }
                        </div>
                    </div>,
                );
            }
            break;
        case 'Move':
            renderOptions = [];
            for (const option in currentRoom.actions[currentOption]) {

                if (currentRoom.passages[currentRoom.actions[currentOption][option].direction].next) {
                    renderOptions.push(
                        <div
                            className="game-action sub-option"
                            onClick={() => {
                                actions.updateGameConfig({ currentRoomId: currentRoom.passages[currentRoom.actions[currentOption][option].direction].next.toString() });
                                actions.logGame(`Player action : ${currentRoom.actions[currentOption][option].view}`);
                                updatecurrentOption('');
                                updatepreviousOption('');
                            }}
                        >
                            { currentRoom.actions[currentOption][option].view }
                        </div>,
                    );
                }
            }
            break;
        default:
            renderOptions = [];
            for (const option in currentRoom.actions[currentOption]) {
                renderOptions.push(
                    <div className="game-action sub-option">
                        { currentRoom.actions[currentOption][option].view }
                    </div>,
                );
            }
    }

    if (currentOption) {
        renderBackBtn = (
            <div
                className="back-btn"
                onClick={() => { updatecurrentOption(previousOption); updatepreviousOption(''); }}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </div>
        );
    }

    return (
        <div className="game-options">
            { renderBackBtn }
            { renderOptions }
        </div>
    );
};

export default connect(null, mapDispatchToProps)(GameOptions);
