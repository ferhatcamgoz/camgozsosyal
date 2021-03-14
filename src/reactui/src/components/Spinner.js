import React from 'react';

const Spinner = () => {
    return (
        <div className={"d-flex justify-content-center"}>
            <div className={"spinner-border text-black-50" }></div>
            <span className={"sr-only"}> Loading</span>
        </div>
    );
};

export default Spinner;
