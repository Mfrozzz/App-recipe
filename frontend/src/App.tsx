import { BrowserRouter } from "react-router-dom";
import RoutesApp from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <RoutesApp/>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App