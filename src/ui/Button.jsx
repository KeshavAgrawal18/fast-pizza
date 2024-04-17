import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
    const base = "text-sm inline-block bg-yellow-400 rounded-full hover:bg-yellow-300 uppercase font-semibold tracking-wide text-stone-800 focus:outline-none focus:ring  focus:ring-yellow-300 transition-colors duration-300 focus:ring-offset-2 disabled:cursor-not-allowed"
    const styles = {
        primary: base + " py-3 px-4 md:py-4 sm:px-6",
        small: base + " py-2 px-3 text-xs sm:py-3 sm:px-4 md:py-3 sm:px-4",
        round: base + " py-0.5 px-2 text-sm sm:py-1 sm:px-2.5",
        secondary: "text-sm inline-block border-2 border-stone-300 rounded-full hover:bg-stone-300 hover:text-stone-800 uppercase font-semibold tracking-wide text-stone-400 focus:outline-none focus:ring  focus:ring-stone-200 focus:text-stone-800 transition-colors duration-300 focus:ring-offset-2 disabled:cursor-not-allowed py-2.5 px-4 md:py-3.5 sm:px-6"
    }

    if (to)
        return <Link to={to} className={styles[type]}>{children}</Link>
    if (onClick)
        return (
            <button className={styles[type]} disabled={disabled} onClick={onClick}>
                {children}
            </button>
        );
    return (
        <button className={styles[type]} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;