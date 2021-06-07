import React, {Component} from 'react';
import Picture from "../9.1 profile.png";

const  UserImage  = props=> {
    const {image,tempimage}=props;
    let imageSource=Picture;
    if(image){
        imageSource="images/profile/"+image;
    }

        return (
            <img alt={"Profile"}
                 src={tempimage||imageSource}
                 {...props}
                onError={event => event.target.src=Picture}
            ></img>

        );
    }


export default UserImage;