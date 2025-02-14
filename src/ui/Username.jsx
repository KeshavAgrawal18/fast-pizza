import { useSelector } from "react-redux";

function Username() {
    const { username } = useSelector(store => store.user);
    if (!username)
        return null;
    return (
        <p className=" hidden text-sm font-semibold md:block">{username}</p>
    );
}

export default Username;