import { useSelector } from "react-redux";

const Header = () => {
  const { isLoading, isError, flights } = useSelector((store) => store.flight);
  return (
    <header>
      <div>
        <img src="/plane-logo.png"></img>
        <h3>Flight Radar</h3>
      </div>

      <p>
        {isLoading
          ? "Flights are being calculated..."
          : isError
          ? "Sorry, an error occurred"
          : flights.length + " Flights Found"}
      </p>
    </header>
  );
};

export default Header;
