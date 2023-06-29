import React from "react";
import AuthRouter from './routes/auth';
import AppRouter from './routes/app';
import { useUserContext } from "./context/auth";

function App() {
  const { user } = useUserContext();
  return (
    <div>
      {user ? <AppRouter/> : <AuthRouter />}
    </div>
  );
}

export default App;
