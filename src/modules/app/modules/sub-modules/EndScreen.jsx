import React from 'react';

export const EndScreen = (props) => {
    const { message, wealth, resetGame } = props;

    return (
        <div className="end-screen">
            <h1>{message}</h1>
            <h2>
                You ended the game with {wealth} gold!
            </h2>
            <button type="button" onClick={() => resetGame()}> Reset Game</button>
        </div>
    );
};
