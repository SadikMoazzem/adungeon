import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { ROOM_TYPES } from '../../../maze/constants';

const mapStateToProps = (state) => ({
    currentRoomId: state.app.gameConfig.currentRoomId,
    playerConfig: state.app.playerConfig,
});

const Minimap = (props) => {
    const { maze, currentRoomId, playerConfig } = props;

    // For each row we dynamically create css for it
    let gridConfig = '';
    for (let i = 0; i < maze.config.columns; i += 1) {
        gridConfig += 'auto ';
    }
    const rowStyle = {
        display: 'grid',
        gridTemplateColumns: gridConfig,
    };

    // Create all the rooms for the maze with the passages they need
    const rooms = [];
    for (const i in maze.maze) {
        const roomObj = maze.getRoomObj(i);
        let activeClass = '';
        const classOps = [];

        if (roomObj.passages.n.next) {
            classOps.push(
                <div className="passage top" key="top" />,
            );
        }
        if (roomObj.passages.s.next) {
            classOps.push(
                <div className="passage bottom " key="bottom" />,
            );
        }
        if (roomObj.passages.e.next) {
            classOps.push(
                <div className="passage right " key="right" />,
            );
        }
        if (roomObj.passages.w.next) {
            classOps.push(
                <div className="passage left " key="left" />,
            );
        }

        if (currentRoomId === i || playerConfig.taggedRooms.includes(i)) {
            activeClass = 'show ';

            if (currentRoomId === i) {
                activeClass += 'current ';
            }
        }

        if (roomObj.type === ROOM_TYPES.EXIT) {
            activeClass += 'exit ';
        }

        rooms.push(
            <div className={`room ${activeClass}`} key={i}>
                {classOps}
            </div>,
        );
    }

    // We split the rooms by the columns specified in the map config
    const rows = [];
    let count = 0;
    while (rooms.length > 0) {
        const chunk = rooms.splice(0, maze.config.columns);
        rows.push(
            <div className="row" style={rowStyle} key={count}>
                { chunk }
            </div>,
        );
        count += 1;
    }


    return (
        <div className="mini-map">
            <div className="map">
                {rows}
            </div>
        </div>
    );
};

Minimap.propTypes = {
    currentRoomId: PropTypes.string.isRequired,
    playerConfig: PropTypes.shape({
        taggedRooms: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    maze: PropTypes.shape({
        maze: PropTypes.shape({}).isRequired,
        getRoomObj: PropTypes.func.isRequired,
        config: PropTypes.shape({
            rows: PropTypes.number,
            columns: PropTypes.number,
        }),
    }).isRequired,
};

export default connect(mapStateToProps, null)(Minimap);
