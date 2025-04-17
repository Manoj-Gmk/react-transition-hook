// Importing necessary hooks and modules
import { useState, useTransition } from "react";
import users from "./users"; // Sample users data
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Bootstrap JS for components like modals, dropdowns

function App() {
  // State to hold the current search input
  const [searchItem, setSearchItem] = useState("");

  // State to hold the filtered list of users based on search input
  const [filteredUsers, setFilteredUsers] = useState(users);

  // useTransition hook helps to delay updates and keep UI responsive
  const [isPending, startTransition] = useTransition();

  // Function to handle input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchItem(value); // Update input value immediately

    // Use startTransition to delay the filtering logic
    // Helps keep UI responsive during heavy or expensive updates
    startTransition(() => {
      setFilteredUsers(
        users.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase())
        )
      );
    });
  };

  return (
    <div className="container">
      {/* Heading */}
      <h1 className="text-center">
        Smooth Data Fetching with React Transitions Hook
      </h1>

      {/* Input box to search users */}
      <input
        className="form-control w-50 mb-4"
        type="text"
        placeholder="Search..."
        value={searchItem}
        onChange={handleChange}
      />

      {/* Show loading message while filtering is in progress */}
      {isPending ? (
        <h2 className="text-center text-danger">Loading....</h2>
      ) : (
        // Render filtered users in a table
        <table className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

//const [isPending, startTransition] = useTransition()
/*useTransition takes two values one is isPending and second one is startTransition, 
isPending is boolean type variable that returns ture if the second element startTransition  function is excuting and returns false after completing the excution.
And startTransition is function that takes a callback function as an argument and this callback function should contain code related to the non-urgent state update   */
