import React, { useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Collection.css'

//material UI
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


function Collection(){

  //this pushes to the next page
  const history = useHistory();
  //this dispatch the saga
  const dispatch = useDispatch();

  //initialize to the DOM
useEffect(() => {
    dispatch({type: 'FETCH_COLLECTION'})
  }, []);

//collection Store reducer
const collectionList = useSelector((store) => store.collection);
console.log('WHAT IS IN COLLECTION__________',collectionList);

const viewCollectionDetail = (event, collDet ) => {
    history.push(`/collectionDetail/${collDet.id}`)
  }
    return(
        <>
        
           {/* <section>
               <div>{JSON.stringify(collectionList[0].name)}</div>
            <ul>
                
                {collectionList.map(collection => {
                   return ( <li key={collection.id}>{collection.name}{collection.city}</li>)
               })}
                <li>ITEM</li>
            </ul>
            </section>  */}
     
        <div className="collectionList">
            {collectionList.map(collection =>{
                
       return( <Box component="span" m={1} key={collection.id}>
        <Divider/>
        <p className="logo"><img className="logo2" src={collection.image}/> {collection.name} {collection.city}, {collection.state} xx.miles <Link onClick={(event) => viewCollectionDetail(event, collection)} className="arrow"> <ArrowForwardIosIcon/> </Link></p>
      </Box >) })}
      <Divider/>

    
      </div>
        </>
    )
}

export default Collection;