import React from "react";
import ImageHeader from "./ImageHeader";
import ArtworkLinks from "./ArtworkLinks";
import { Typography } from "@material-ui/core";
import SeePrompt from "../SeePrompt/SeePrompt";
import SayPrompt from "../SayPrompt/SayPrompt";
import DoPrompt from "../DoPrompt/DoPrompt";


function CollectionDetail() {
    
    return (
        <div>
            <ImageHeader />
            <ArtworkLinks />
            <Typography>
                See. Say. Do.
            </Typography>
            <SeePrompt />
            <SayPrompt />
            <DoPrompt />
        </div>
    );
}

export default CollectionDetail;