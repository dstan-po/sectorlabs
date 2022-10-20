import React, {Component} from "react";
import GistCard from "./gistCard";

class SearchBar extends Component {
    state = {
        cards: [],
        descriptions: [],
        searchedAccount: "",
        error: ""
    }

    updateSearchedUser = (newText) => {
        this.setState({searchedAccount: newText})
    }


    handleSearch = async () => {
        try {
            const response = await fetch('https://api.github.com/users/' + this.state.searchedAccount + '/gists', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(response);
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
                            name: gist['files'][key]['filename'],
                            language: gist['files'][key]['language']
                        })
                        keyIndex++;
                    })

                    newCards.push(
                        <GistCard
                            key={i}
                            forksUrl={gist['forks_url']}
                            files={filesFound}
                            description={gist['description']}>
                        </GistCard>
                    )
                    i += 1;
                })
            }
            console.log("Result is: ", result);

            this.setState({cards: []})
            this.setState({cards: newCards})
        } catch (error) {
            this.setState({error: error})
        }


    }

    showCards = () => {
        if (this.state.cards.length !== 0) {
            return <div>
            <span>
                <hr/>
                Number of gists found: {this.state.cards.length}
                <hr/>
            </span>
                {this.state.cards}
            </div>;
        } else {
            return <h1><br/>No gists found</h1>;
        }

    }

    render() {
        return (
            <div style={{marginTop: "2vh"}}>
                <input
                    style={{marginRight: "2vw"}}
                    type={"text"}
                    placeholder={"Search user..."}
                    onInput={text => this.updateSearchedUser(text.target.value)}
                />
                <button onClick={this.handleSearch}>Search</button>
                {this.showCards()}
            </div>
        )
    }
}

export default SearchBar;
