import { FormView } from "./components/FormView";
import { SideDrawer } from "./components/SideDrawer";

function App() {
  return (
    <div className="h-screen flex">
      <SideDrawer />
      <FormView />
    </div>
  );
}

export default App;
