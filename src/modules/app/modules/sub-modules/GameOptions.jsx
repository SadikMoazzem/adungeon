import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import PlayerActionHandler from '../../PlayerActionHandler';
import PlayerFightHandler from '../../PlayerFightHandler';
import * as moduleActions from '../../actions';
import * as mazeConfig from '../../../maze/constants';

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(moduleActions, dispatch),
    dispatch,
});

const mapStateToProps = (state) => ({
    gameConfig: state.app.gameConfig,
    playerConfig: state.app.playerConfig,
    mazeObj: state.app.mazeConfig.maze,
});

const GameOptions = (props) => {
    // Deconstruct props
    const {
        playerConfig, gameConfig, mazeObj, dispatch,
    } = props;
    const currentRoom = mazeObj[gameConfig.currentRoomId];

    // Create State to control the view of the component
    const [currentOption, updatecurrentOption] = useState('');
    const [previousOption, updatepreviousOption] = useState('');

    // Render a component based on the current view
    let renderOptions = [];
    let renderBackBtn = '';

    switch (currentOption) {
        case 'Move':
            renderOptions = [];
            for (const option in currentRoom.actions[currentOption]) {
                renderOptions.push(
                    <div
                        className="game-action sub-option"
                        key={option}
                        onClick={() => {
                            PlayerActionHandler(dispatch, currentRoom.actions[currentOption][option].action, {
                                roomId: currentRoom.id,
                                nextRoomId: currentRoom.passages[currentRoom.actions[currentOption][option].direction].next.toString(),
                                direction: currentRoom.actions[currentOption][option].direction,
                            }, mazeObj);
                            updatecurrentOption('');
                            updatepreviousOption('');
                        }}
                    >
                        { currentRoom.actions[currentOption][option].view }
                    </div>,
                );
            }
            break;
        case 'Tag':
            renderOptions = [];
            for (const option in currentRoom.actions[currentOption]) {
                renderOptions.push(
                    <div
                        key={option}
                        className="game-action sub-option"
                        onClick={() => {
                            PlayerActionHandler(dispatch, currentRoom.actions[currentOption][option].action,{ roomId: currentRoom.id }, {}, playerConfig);
                            updatecurrentOption('');
                            updatepreviousOption('');
                        }}
                    >
                        { currentRoom.actions[currentOption][option].view }
                    </div>,
                );
            }
            break;
        case 'Loot':
            renderOptions = [];
            if (currentRoom.treasure) {
                for (const option in currentRoom.actions[currentOption]) {
                    renderOptions.push(
                        <div
                            className="game-action sub-option"
                            key={option}
                            onClick={() => {
                                PlayerActionHandler(dispatch, currentRoom.actions[currentOption][option].action,{
                                    roomId: currentRoom.id, value: mazeConfig.TREASURE_CONFIGS[currentRoom.treasure].TREASURE,
                                }, {}, playerConfig);
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
        case 'Fight':
            renderOptions = [];
            for (const option in currentRoom.actions[currentOption]) {
                renderOptions.push(
                    <div
                        key={option}
                        className="game-action sub-option"
                        onClick={() => {
                            PlayerFightHandler(dispatch, currentRoom.actions[currentOption][option].action, currentRoom);
                            updatecurrentOption('');
                            updatepreviousOption('');
                        }}
                    >
                        { currentRoom.actions[currentOption][option].view }
                    </div>,
                );
            }
            break;
        default:
            renderOptions = [];
            for (const option in currentRoom.actions) {
                renderOptions.push(
                    <div
                        className="game-action"
                        key={option}
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

GameOptions.propTypes = {
    dispatch: PropTypes.func.isRequired,

    mazeObj: PropTypes.shape({}).isRequired,
    playerConfig: PropTypes.shape({}).isRequired,
    gameConfig: PropTypes.shape({
        currentRoomId: PropTypes.string,
    }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameOptions);
