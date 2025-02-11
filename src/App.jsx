import { Outlet } from "react-router";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main className="bg-gray-100">
        <section>
          <Nav />
          <div className=" min-h-[calc(100vh-120px)] ">
            <Outlet />
          </div>

          <Footer />
        </section>
      </main>
    </>
  );
}

export default App;
