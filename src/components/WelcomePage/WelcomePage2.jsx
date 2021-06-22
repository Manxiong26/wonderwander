import { useHistory } from 'react-router-dom';

function WelcomePage2(){
    const history = useHistory();
    const goNext = () => {
        history.push('/welcome3');
    }
    const goBack = () => {
        history.push('/welcome1');
    }

    return (
        <div>
            <h1>Why</h1>
            <h1>What</h1>
            <h1>Benefits</h1>
            <button onClick={goBack}>Back</button> <button onClick={goNext}>Next</button>
        </div>
    )
}

export default WelcomePage2