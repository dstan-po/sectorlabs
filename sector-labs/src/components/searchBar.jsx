import React, {Component} from "react";
import GistCard from "./gistCard";

class SearchBar extends Component {
    state = {
        cards: [],
        descriptions: [],
        searchedAccount: "",
        displayedAccount: "",
        error: "",
        isSearchDisabled: true
    }

    updateSearchedUser = (newText) => {
        if (newText.length > 0)
            this.setState({searchedAccount: newText, isSearchDisabled: false})
        else
            this.setState({searchedAccount: newText})
    }

    updateCards = (result) => {
        let newCards = []

        if (result.size !== 0) {
            result.forEach((gist, index) => {
                let filesFound = [];

                Object.keys(gist['files']).forEach((key, index2) => {
                    filesFound.push({
                        key: index2,
                        url: gist['files'][key]['raw_url'],
                        name: gist['files'][key]['filename'],
                        language: gist['files'][key]['language']
                    })
                })

                newCards.push(
                    <GistCard
                        key={index}
                        forksUrl={gist['forks_url']}
                        files={filesFound}
                        description={gist['description']}>
                    </GistCard>
                )
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
            this.setState({displayedAccount: this.state.searchedAccount})
            this.setState({searchedAccount: "", isSearchDisabled: true})
        } catch (error) {
            console.log(error)
        }


    }

    showSearchResult = () => {
        if (this.state.cards.length !== 0) {
            return (
                <span style={{width: "100%"}}>
                    <hr/>
                        <h2>Owner: {this.state.displayedAccount}</h2>
                        <hr/>
                        <hr/>
                        <h2>Number of gists found: {this.state.cards.length}</h2>
                    <hr/><br/>
                </span>
            )
        } else {
            return <h1><br/>No gists found</h1>;
        }
    }

    showCards = () => {
        if (this.state.cards.length !== 0) {
            return <div style={{display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                {this.state.cards}
            </div>;
        }
        return <p/>
    }

    render() {
        return (
            <div style={{marginTop: "2vh"}} key={0}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <input
                        className={"form-control"}
                        style={{marginRight: "1vw"}}
                        type={"text"}
                        placeholder={"Search user..."}
                        value={this.state.searchedAccount}
                        onInput={text => this.updateSearchedUser(text.target.value)}
                    />
                    <button className={"btn btn-primary"} onClick={this.handleSearch} disabled={this.state.isSearchDisabled}>
                        Search
                    </button>
                </div>
                <div style={{}}>
                    {this.showSearchResult()}
                    <br/>
                    {this.showCards()}
                </div>
            </div>
        )
    }
}

export default SearchBar;
