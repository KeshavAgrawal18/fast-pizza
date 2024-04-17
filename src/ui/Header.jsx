import { Link } from "react-router-dom";
import SearchOrder from "../feature/order/SearchOrder";
import Username from "./Username";

function Header() {
    return (
        <header className="bg-yellow-400 uppercase p-4 sm:px-6 flex justify-between items-center">
            <Link to="/" className="tracking-widest">Fast Pizza Co.</Link>
            <SearchOrder />
            <Username />
        </header>
    );
}

export default Header;