import React, {Component} from "react";

class GistCard extends Component {
    state = {
        forksSearched: false,
        forksFound: []
    }

    constructor(props) {
        super(props);
        this.showDescription();
    }

    showDescription = () => {
        if (this.props.description !== null) {
            return "Description: " + this.props.description.replace(/[^a-z0-9áéíóúñü\n\\<> \.,_-]/gim, "").trim();
        } else {
            return "No description";
        }
    }

    showFiles = () => {
        if (this.props.files !== null) {
            return <ul>{this.props.files.map(file =>
                <li>
                    <div key={file.key}><a href={file.url}>{file.name}</a><br/></div>
                </li>
            )}</ul>
        } else {
            return "No files."
        }
    }

    searchForks = async () => {

        try {
            const response = await fetch(this.props.forksUrl, {
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
            console.log(result);
            this.setState({forksFound: result})
            this.setState({forksSearched: true});
        } catch (error) {
            console.log(error);
        }
    }

    showForks = () => {
        if (!this.state.forksSearched) {
            return <button onClick={this.searchForks}>Search forks</button>;
        } else {
            if (this.state.forksFound.length !== 0) {
                //TODO Make this a separate component
                return (
                    <ul>
                        {this.state.forksFound.map(fork => (
                            <a href={"https://gist.github.com/" + fork['id']}>
                                <li>
                                    <img height={30} width={30} src={fork['owner']['avatar_url']}/>
                                    <p>{fork['owner']['login']}</p>
                                </li>
                            </a>
                        ))}
                    </ul>);
            } else {
                return "No forks";
            }
        }
    }

    render() {
        return (
            <div>
                <hr/>
                {this.showDescription()}
                <hr/>
                Files: {this.showFiles()}
                <hr/>
                {this.showForks()}
                <hr/>
                <br/>
            </div>
        )
    }
}

export default GistCard;
