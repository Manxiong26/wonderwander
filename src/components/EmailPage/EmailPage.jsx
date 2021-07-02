import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';
import Mailchimp from 'react-mailchimp-form';

function EmailPage(){
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    const history = useHistory();

    const back = () => {
        history.push('/home');
    }

    return (
        <>








        {/* <form>
            <input onChange={(event) => setEmail(event.target.value)} value={email} placeholder="Email"></input>
            <input onChange={(event) => setName(event.target.value)} value={name} placeholder="Name"></input>
            <button>Sign up</button>
        </form>
        <button onClick={back}>Back to Page</button> */}
        </>
    )
}

export default EmailPage;