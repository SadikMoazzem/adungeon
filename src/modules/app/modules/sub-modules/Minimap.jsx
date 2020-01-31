import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Minimap extends Component {
    render() {
        const { maze } = this.props;

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
        for (const i in maze.getMaze) {
            const roomObj = maze.getRoomObj(i);
            const classOps = [];

            if (roomObj.passages.n.next) {
                classOps.push(
                    <div className="passage top" />,
                );
            }
            if (roomObj.passages.s.next) {
                classOps.push(
                    <div className="passage bottom " />,
                );
            }
            if (roomObj.passages.e.next) {
                classOps.push(
                    <div className="passage right " />,
                );
            }
            if (roomObj.passages.w.next) {
                classOps.push(
                    <div className="passage left " />,
                );
            }
            rooms.push(
                <div className={`room ${classOps}`} key={i} ref={i}>
                    {classOps}
                </div>,
            );
        }

        // We split the rooms by the columns specified in the map config
        const rows = [];
        while (rooms.length > 0) {
            const chunk = rooms.splice(0, maze.config.columns);
            rows.push(
                <div className="row" style={rowStyle}>
                    { chunk }
                </div>,
            );
        }


        return (
            <div className="mini-map">
                <div className="map">
                    {rows}
                </div>
            </div>
        );
    }
}

Minimap.propTypes = {
    maze: PropTypes.shape({
        getMaze: PropTypes.shape({}).isRequired,
        getRoomObj: PropTypes.func.isRequired,
        config: PropTypes.shape({
            rows: PropTypes.number,
            columns: PropTypes.number,
        }),
    }).isRequired,
};
