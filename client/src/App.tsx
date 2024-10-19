import ChatLayout from "./laytout/ChatLayout";
import Header from "./laytout/Header";
import Input from "./laytout/input";

function App(): JSX.Element {
  return (
    <div id="AppContainer" className="w-screen overflow-hidden">
      <Header />
      <ChatLayout></ChatLayout>
      <Input />
    </div>
  );
}

export default App;
