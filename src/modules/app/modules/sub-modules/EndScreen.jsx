import React from 'react';

export const EndScreen = (props) => {
    const { message, resetGame } = props;

    return (
        <div className="end-screen">
            <h1>{message}</h1>
            <button type="button" onClick={() => resetGame()}> Reset Game</button>
        </div>
    );
};
