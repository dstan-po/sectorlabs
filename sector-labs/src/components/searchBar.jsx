import React, {Component} from "react";
import GistCard from "./gistCard";

class SearchBar extends Component {
    state = {
        cards: [],
        descriptions: []
    }

    getSearchValue() {

    }

    handleSearch = async () => {
        try {
            const response = await fetch('https://api.github.com/users/' + 'LuisMDeveloper' + '/gists', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error("User not found!");
            }

            const result = await response.json();

            // console.log("Result is: ", JSON.parse(result));
            let numberOfFiles = "Found: " + result.length + " gists !\n";
            let gists = "Files: "
            let newCards = []
            let descriptions = []
            if (result.size !== 0) {
                let i = 0;
                result.forEach(gist => {
                    // gists += Object.keys(gist['files'])[0] + "\n"
                    // newCards.push(
                    //     <GistCard
                    //         key={i}
                    //         description={gist['description']}
                    //     />)
                    descriptions.push({id: i, text: gist['description']})
                    gists += gist['description'] + "\n";
                    newCards.push(
                        <GistCard
                            description={gist['description']}
                            key={i}>
                        </GistCard>
                    )
                    i += 1;
                })
            }
            console.log("Result is: ", numberOfFiles, gists);
            console.log("Result is: ", result);

            this.setState({cards: newCards})
            this.setState({descriptions: descriptions})
        } catch (error) {
            console.log(error);
        }


    }

    render() {
        return (
            <div>
                <input
                    type={"text"}
                    placeholder={"Search user..."}
                />
                <button onClick={this.handleSearch}>Search</button>
                {this.state.cards}
            </div>
        )
    }
}

export default SearchBar;
