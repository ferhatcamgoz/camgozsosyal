import React, {Component} from 'react';
import Picture from "../9.1 profile.png";

const  UserImage  = props=> {
    const {image}=props;
    let imageSource=Picture;
    if(image){
        imageSource=image;
    }
        return (
            <img alt={"Profile"} src={imageSource} {...props}></img>

        );
    }


export default UserImage;