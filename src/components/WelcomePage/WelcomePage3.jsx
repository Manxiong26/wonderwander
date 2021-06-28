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
                <p>The See button will prompt you to experience a specific element of the artwork. 
                    You will be asked to observe a visual component and be provided materials that will explain the creation or background of the artwork.</p>
            <h1>Say</h1>
                <p>The Say button will prompt you to vote on how the piece of artwork made you feel; what emotions the artwork evoked in you.</p>
            <h1>Do</h1>
                <p>The Do button will prompt you to take a picture of either the artwork or you with the artwork.</p>
            <button onClick={goBack}>Back</button> <button onClick={goNext}>Next</button>
            <button onClick={skipWelcome}>Skip</button>
        </div>
    )
}

export default WelcomePage3