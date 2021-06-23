import React, { useEffect } from 'react'
import { useHistory, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CollectionDetail.css'


function CollectionDetail(){

    const dispatch = useDispatch();
    const history = useHistory();
// collection detail reducer
    const collectionDet = useSelector(store => store.collectionDetail)
// using id to grab detail 
    let { id } = useParams();

    //render on Dom 
    useEffect(() => {
       console.log('In useEffect param', id);
      dispatch({ type: 'FETCH_COLLECTION_DETAIL', payload: id })
    }, [])

    return(
        <>
        <div>
            <h1>Collection Detail</h1>
        </div>
        <div className="center">
        <img className="logo3" src={collectionDet.collection_image}/>
        
        </div>
        <div className="center">
        <button><a className="web" href={collectionDet.site_link}>WebSite</a></button>
        <button><a className="web" href={collectionDet.donate_link}>$ Donate</a></button>
        </div>
        </>
    )
}

export default CollectionDetail;