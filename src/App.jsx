import { Outlet } from "react-router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="bg-red-400">
        <section>
          <Nav />
          <div className="w-11/12 mx-auto min-h-[calc(100vh-288px)] border-2">
            <Outlet />
          </div>

          {/* <Footer /> */}
        </section>
      </main>
    </>
  );
}

export default App;
