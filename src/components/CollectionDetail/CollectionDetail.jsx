import React from "react";
import ImageHeader from "./ImageHeader";
import CollectionLinks from "./CollectionLinks";
import { Typography } from "@material-ui/core";
import SeePrompt from "../SeePrompt/SeePrompt";


function CollectionDetail() {
    
    return (
        <div>
            <ImageHeader />
            <CollectionLinks />
            <Typography>
                See. Say. Do.
            </Typography>
            <SeePrompt />
            
        </div>
    );
}

export default CollectionDetail;