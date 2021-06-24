import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { useHistory, useParams } from 'react-router-dom';

function AdminArtist() {

    let {id} = useParams();
    //console.log(id);

    //functionality to route to a page
    const history = useHistory();

    //functionality to dispatch information to a saga or reducer
    const dispatch = useDispatch();

    //redux store instances 
    const artistList = useSelector((store) => store.adminArtistListReducer);
    const artist = useSelector((store) => store.adminArtistInfoReducer);
    console.log('artist reducer id:', artist.id);

    //retrieves artists' info from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_ARTIST_LIST' });
    }, []);

    //sets local state for post request
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [bio, setBio] = useState('');
    const [site_link, setSiteLink] =useState('');

    //edit mode
    const [editMode, setEditMode] = useState(false);

    //post to saga
    const addArtist = () => {
        
        //create object to send
        const newArtist = {
            name: name,
            image: image,
            bio: bio,
            site_link: site_link,
        }
        
        //dispatch to artistList saga
        dispatch({ type: 'ADD_ARTIST', payload: newArtist });
        
        //alert successful post
        swal({
            text: "This artist has been added to your list!",
            icon: "success"
        });

        //updates artist list on DOM
        dispatch({ type: 'FETCH_ARTIST_LIST' });

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //renders specific artist's details in input feilds to edit
    const renderArtistDetail = (event, item) => {
        console.log('clicking edit for Artist = ', item);

        //sets specific artist in artist reducer 
        dispatch({type: 'SET_ARTIST_INFO', payload: item}); // 

        //renders form view from add to edit mode
        setEditMode(true);
 
        //shows specific artist's details in input fields for editing
        setName(item.name);
        setImage(item.image);
        setBio(item.bio);
        setSiteLink(item.site_link);
    }

    //update (edit) artist information
    const updateArtistInfo = () => {
        
        //create updated artist object
        const updatedArtistInfo = {
            id: artist.id, //may need to change this value depending on redux store and if we use Params
            name: name,
            image: image,
            bio: bio,
            site_link: site_link,
        }

        console.log('updated artist info:', updatedArtistInfo);

        //send updated artist info to artist or editArtist saga
        dispatch({type: 'UPDATE_ARTIST_INFO', payload: updatedArtistInfo});

        //swal success indicator
        swal({
            text: "This artist's information has been updated!",
            icon: "success" 
        });

        //turn editMode off
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //cancel (editMode) button - returns to add artist form
    const renderToInfo = () => {
        setEditMode(false);

        //clears input fields
        setName('');
        setImage('');
        setBio('');
        setSiteLink('');
    }

    //delete artist 
    const deleteArtist = (id) => {
        console.log('deleting artist:', id);
        
        //dispatch to saga w artist id 
        dispatch({type: 'DELETE_ARTIST', payload: id})
    }

    //alerts admin to verify artist deletion
    const deleteValidation = (id) => {
        console.log('delete clicked! id = ', id);

        swal({
            title: "Hello!",
            text: "Are you sure you want to PERMANENTLY delete this artist?",
            buttons: {
              cancel: true,
              confirm: "Delete"
            }
        }).then(val => {
          if(val) {
            swal({
              text: "You've deleted this artist.",
            });
            deleteArtist(id);
          }
        });
    }
  
    return (
      <div>
          <header>ADMIN</header>
          <button>Add New Admin</button>
          
          {editMode ?
          <div>
              <h2>Edit Artist</h2>
              <form className="admin-form" onSubmit={updateArtistInfo}>
                <input type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input type="text"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <input type="text"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <input type="text"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <input type="submit" name="submit" value="Update" />
                <button onClick={renderToInfo}>Cancel</button>
              </form>
          </div>
          :    
          <div>
              <h2>Add Artist</h2>
              <form className="admin-form" onSubmit={addArtist}>
                <input type="text"
                    placeholder="Artist Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <input type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(event) => setImage(event.target.value)}
                />
                <input type="text"
                    placeholder="Website URL"
                    value={site_link}
                    onChange={(event) => setSiteLink(event.target.value)}
                />
                <input type="text"
                    placeholder="Artist Bio"
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                />
                <input type="submit" name="submit" value="Submit" />
              </form>
          </div>}
          
          {/* Artist List. Always shows. */}
          {/* Edit clickability renders a specific artist's details in the form to edit or delete */}
          <div>
              <h2>Artist List</h2>
            <ul>
                {artistList.map((item, i) => 
                    <li key={i} > 
                        <img src={item.image} alt="Artist Image" width="50" height="50" /> 
                        {item.name} 
                        <button onClick={(event) => renderArtistDetail(event, item)}>Edit</button>
                        <button onClick={() => deleteValidation(item.id)}>Delete</button>
                    </li>
                )}
            </ul>
          </div>

      </div>
    );
}

export default AdminArtist;