import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchOrder() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    function handleSubmit(e) {
        e.preventDefault();
        if (!query) return;
        navigate(`/order/${query}`);
        setQuery('');
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Search Order #" className="px-4 py-2 rounded-full text-sm w-64 bg-yellow-100 sm:focus:w-72 transition-all duration-300 outline-none md:px-6 md:py-3 focus:ring focus:ring-yellow-500 " onChange={e => setQuery(e.target.value)} />
            </form>
        </div>
    );
}

export default SearchOrder;