import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import TextQuery from './pages/TextQuery';
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/support/text" element={<TextQuery />} />
        </Routes>
    );
}

export default App;
