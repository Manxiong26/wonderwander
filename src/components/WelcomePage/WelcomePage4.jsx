import { useHistory } from 'react-router-dom';

function WelcomePage2(){
    const history = useHistory();
    const goBack = () => {
        history.push('/welcome3');
    }
    const skipWelcome = () => {
        history.push('/home');
    }


    return (
        <div>
            <h2>Thank you for taking the time to read through this welcome section. Now get out there and wander!</h2>
            <button onClick={goBack}>Back</button>
            <button onClick={skipWelcome}>Skip</button>
        </div>
    )
}

export default WelcomePage4