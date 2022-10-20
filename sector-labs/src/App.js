import React, {Component} from "react";
import SearchBar from "./components/searchBar";

class App extends Component {
  render() {
    return (
        <div>
            <main className={"container"}>
                <SearchBar/>
            </main>
        </div>
    );
  }
}

export default App;
