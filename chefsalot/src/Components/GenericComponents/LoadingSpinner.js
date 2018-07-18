import React, { Component } from 'react';
import cleaver from 'static/cleaver.png'


function LoadingSpinner(props) {
    return (
        <div>
            <img className="loading-spinner" src={cleaver}/>
        </div>
    );
}

export default LoadingSpinner;