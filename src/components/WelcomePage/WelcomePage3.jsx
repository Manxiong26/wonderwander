import { useHistory } from 'react-router-dom';

function WelcomePage3(){
    const history = useHistory();
    const goNext = () => {
        history.push('/welcome4');
    }
    const goBack = () => {
        history.push('/welcome2');
    }
    const skipWelcome = () => {
        history.push('/home');
    }


    return (
        <div>
            <h1>See</h1>
            <h1>Say</h1>
            <h1>Do</h1>
            <button onClick={goBack}>Back</button> <button onClick={goNext}>Next</button>
            <button onClick={skipWelcome}>Skip</button>
        </div>
    )
}

export default WelcomePage3