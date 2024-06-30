import { ToastContainer, Bounce } from "react-toastify";
import Weather from "./pages/weather";
import Time from "./pages/time";

function App() {
  return (
    <div>
      <div className="flex justify-between">
        <Time />
        <Weather />
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}

export default App;
