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

    updateCards = (result) => {
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

        this.setState({cards: []})
        this.setState({cards: newCards})
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

            this.updateCards(result);
            this.setState({searchedAccount: ""})
        } catch (error) {
            console.log(error)
        }


    }

    showCards = () => {
        if (this.state.cards.length !== 0) {
            return <div>
            <span>
                <hr/>
                <h2>
                    Number of gists found: {this.state.cards.length}
                </h2>
                <hr/><br/>
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
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input
                        className={"form-control"}
                        style={{marginRight: "1vw"}}
                        type={"text"}
                        placeholder={"Search user..."}
                        value={this.state.searchedAccount}
                        onInput={text => this.updateSearchedUser(text.target.value)}
                    />
                    <button className={"btn btn-primary"} onClick={this.handleSearch}>Search</button>
                </div>
                {this.showCards()}
            </div>
        )
    }
}

export default SearchBar;
