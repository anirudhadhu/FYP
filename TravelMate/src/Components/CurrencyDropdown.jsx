import { HiOutlineStar, HiStar } from "react-icons/hi2"; // Importing star icons from react-icons library

// CurrencyDropdown component definition
const CurrencyDropdown = ({
  currencies, // Array of all available currencies
  currency, // Currently selected currency
  setCurrency, // Function to set the selected currency
  favorites, // Array of favorite currencies
  handleFavorite, // Function to handle adding/removing favorites
  title = "",
}) => {
  // Function to check if a currency is in the favorites list
  const isFavorite = (curr) => favorites.includes(curr);

  return (
    <div>
      {/* Label for the dropdown */}
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      {/* Container for the dropdown and favorite button */}
      <div className="mt-1 relative">
        {/* Dropdown for selecting a currency */}
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)} // Update selected currency on change
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {/* Render favorite currencies at the top of the dropdown */}
          {favorites.map((currency) => {
            return (
              <option className="bg-gray-200" value={currency} key={currency}>
                {currency}
              </option>
            );
          })}
          <hr /> {/* Divider between favorites and other currencies */}
          {/* Render non-favorite currencies */}
          {currencies
            .filter((c) => !favorites.includes(c))
            .map((currency) => {
              return (
                <option value={currency} key={currency}>
                  {currency}
                </option>
              );
            })}
        </select>

        {/* Button to add/remove the current currency from favorites */}
        <button
          onClick={() => handleFavorite(currency)} // Handle favorite toggle on click
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {/* Show filled star if currency is favorite, otherwise show outlined star */}
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
