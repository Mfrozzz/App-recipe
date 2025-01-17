import { Routes , Route, } from 'react-router-dom'
import RecipesPage from '../pages/RecipesPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';

function RoutesApp(){
    return (
        <Routes>
            <Route path='/' element={<RecipesPage/>}/>
            <Route path='/signin' element={<SignIn/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/forgotPassword' element={<ForgotPassword/>}/>
        </Routes>
    );
}

export default RoutesApp;