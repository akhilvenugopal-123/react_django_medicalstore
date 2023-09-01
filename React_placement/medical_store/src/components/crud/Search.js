import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar";
import "./SearchStyle.css";
 



function Search() {
  const user = useSelector(store => store.auth.user);
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [notFound, setNotFound] = useState(false); // State to track "Not Found" message
  const head = {
    headers: {
      'Authorization': 'Token ' + user.token
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    if (keyword !== ""&& user) {
      axios.get(`http://127.0.0.1:8000/searchapi/?keyword=${keyword}`, head)
        .then((response) => {
          setSearchResults(response.data);
          setNotFound(response.data.length === 0); // Check if searchResults is empty
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
    setNotFound(false); // Reset Not Found message when user starts typing
  };

  return (
    
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSearch}>
        <input
          class="search"
          type="text"
          placeholder="Search here "
          value={keyword}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {notFound ? ( // Check if notFound is true, then show the message
          <p class="name">Oops!!! Not Found</p>
        ) : (
          searchResults.map((item) => (
            <div key={item.id}>
              <h3 class="name">{item.name}</h3>
              <p class="company">Company: {item.company}</p>
              <p class="expiry">Expiry date: {item.expiry_date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default checkAuth(Search);
