import React from "react";



function SearchBar() {
  return (
    <form class="column is-5 box has-background-success-light">
      <h3 class="is-size-3">Find a Pet Available to Adopt</h3>
      <div class="block"></div>
      <div class="control">
        <label class="radio">
          <input type="radio" name="answer" id="dog" value="dogs" />
          Dog
        </label>
        <label class="radio">
          <input type="radio" name="answer" id="cat" value="cats" />
          Cat
        </label>
      </div>
      <div class="block"></div>

      <div class="field">
        <label class="label">User location</label>
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder="Enter Zip Code"
            id="zipcode"
          />
        </div>
      </div>
      <input
        class="button is-primary is-active"
        type="submit"
        value="Search"
        id="submitbtn"
      />
    </form>
  );
}

export default SearchBar;
