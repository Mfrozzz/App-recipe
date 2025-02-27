import { Routes, Route, } from 'react-router-dom'
import RecipesPage from '../pages/RecipesPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import HomePage from '../pages/HomePage';
import UserProfile from '../pages/UserProfile';

function RoutesApp() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/recipes' element={<RecipesPage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword/:token' element={<ResetPassword />} />
            <Route path='/profile' element={<UserProfile/>}/>
        </Routes>
    );
}

export default RoutesApp;