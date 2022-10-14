// import { WithRouter } from "utils/Navigation";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="w-full h-screen">
      <nav className="w-full p-4 bg-black sticky top-0 flex flex-row items-center justify-between font-silkscreen">
        <Link to="/">
          <h1 className="text-white">Pokemon</h1>
        </Link>

        <Link to="/mypokemon">
          <div className="text-white">My Pokemon</div>
        </Link>
      </nav>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
