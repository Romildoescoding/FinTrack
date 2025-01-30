import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "@/components/ui/button.jsx";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="bg-yellow-200 text-5xl text-gray-950">Hey there!</h1>
      <Button>Button</Button>
    </>
  );
}

export default App;
