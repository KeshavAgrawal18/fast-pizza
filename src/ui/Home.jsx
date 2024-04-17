import { useSelector } from "react-redux";
import CreateUser from "../feature/user/CreateUser"
import Button from "./Button";

function Home() {
  const username = useSelector(state => state.user.username);
  return (
    <div className="text-center my-10 sm:my-16">
      <h1 className="text-xl   font-semibold my-8">
        The best pizza.
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ?
        <CreateUser /> : <Button type="primary" to="menu">Continue ordering, {username} </Button>}
    </div>
  );
}

export default Home;
