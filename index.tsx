import App from "./src/App";
import { createRoot } from "react-dom/client";
import "./src/theme.css";


const root = createRoot(document.getElementById("root")!);
root.render(<App />);