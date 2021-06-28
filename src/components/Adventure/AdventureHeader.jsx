import React from "react";

function AdventureHeader() {



    
    return (
        <Card className={classes.cardmedia}>
            <CardMedia
            component="img" 
            image={list.image}
            >
            </CardMedia>
            <CardContent>
                <Typography>
                    Activity: {list.title}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default AdventureHeader;