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

            let newCards = []
            if (result.size !== 0) {
                let i = 0;
                result.forEach(gist => {
                    let filesFound = [];
                    let keyIndex = 1;

                    Object.keys(gist['files']).forEach(key => {
                        filesFound.push({
                            key: keyIndex,
                            url: gist['files'][key]['raw_url'],
                            name: gist['files'][key]['filename']
                        })
                        keyIndex++;
                    })

                    newCards.push(
                        <GistCard
                            key={i}
                            forksUrl = {gist['forks_url']}
                            files={filesFound}
                            description={gist['description']}>
                        </GistCard>
                    )
                    i += 1;
                })
            }
            console.log("Result is: ", result);

            this.setState({cards: newCards})
        } catch (error) {
            console.log(error);
        }


    }

    showCards = () => {
        if (this.state.cards.length !== 0) {
            return <div>
                <span>
                    Number of gists found: {this.state.cards.length}
                </span>
                {this.state.cards}
            </div>;
        } else {
            return <div><br/><span>No gists found</span></div>;
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
                {this.showCards()}
            </div>
        )
    }
}

export default SearchBar;
