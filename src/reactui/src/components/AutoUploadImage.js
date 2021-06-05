import React from 'react';
import "./Upload.css";
const AutoUploadImage = ({image,upload}) => {
    return (
        <div style={{ position: 'relative' }}>
            <img className="img-thumbnail" src={image} alt="hoax-attachment" />
            <div className="overlay" style={{ opacity: upload ? 1 : 0 }}>
                <div className="d-flex justify-content-center h-100">
                    <div className="spinner-border text-light m-auto">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoUploadImage;