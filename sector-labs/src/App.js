import React, {Component} from "react";
import SearchBar from "./components/searchBar";

class App extends Component {
    render() {
        return (
            <div>
                <main className={"container"}>
                    <h1 style={{textAlign: "center"}}>Gist API</h1>
                    <SearchBar/>
                </main>
            </div>
        );
    }
}

export default App;
