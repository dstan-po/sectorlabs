import React, {Component} from "react";
import FilesCard from "./filesCard";

class GistCard extends Component {
    state = {
        forksSearched: false,
        forksFound: [],
    }

    constructor(props) {
        super(props);
        this.showDescription();
    }

    showDescription = () => {
        if (this.props.description !== null) {
            return <p style={{overflow: "auto"}}>{"Description: " + this.props.description.replace(/[^a-z0-9áéíóúñü\n\\<> \.,_-]/gim, "").trim()}</p>;
        } else {
            return "No description";
        }
    }

    showLanguages = () => {
        if (this.props.files !== null) {
            let languagesSet = new Set();

            this.props.files.forEach(file => {
                if (file['language'] !== null)
                    languagesSet.add(file['language']);
            })

            if (languagesSet.size !== 0) {
                const languages = Array.from(languagesSet);

                return <div>
                    {languages.map(language =>
                        <span className={"border border-success rounded"}
                              style={{marginRight: "1vw", padding: "2px"}}>{language}</span>)}
                    <br/></div>
            } else {
                return <span className={"border border-warning rounded"}
                             style={{padding: "2px"}}>No language specified<br/></span>
            }
        }
        return <p></p>
    }

    showFiles = () => {
        if (this.props.files !== null) {
            return <FilesCard key={this.props.key} files={this.props.files}/>
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

            this.setState({forksFound: result})
            this.setState({forksSearched: true});
        } catch (error) {
            console.log(error)
        }
    }

    showForks = () => {
        if (!this.state.forksSearched) {
            return <button className={"btn btn-secondary"} onClick={this.searchForks}>Search forks</button>;
        } else {
            if (this.state.forksFound.length !== 0) {
                return (
                    <div key={this.props.key}>
                        <h5>Forks</h5>
                        <ul className={"list-group"}>
                            {this.state.forksFound.map((fork, index) => (
                                <a href={"https://gist.github.com/" + fork['id']}>
                                    <li key={index} className={"list-group-item"}>
                                        <div style={{display: "inline-flex"}} className={"m-2"}>
                                            <img style={{marginRight: "0.5vw"}} height={30} width={30}
                                                 src={fork['owner']['avatar_url']}
                                                 alt={"Fork owner avatar"}/>
                                            <p>{fork['owner']['login']}</p>
                                        </div>
                                    </li>
                                </a>
                            ))}
                        </ul>
                    </div>);
            } else {
                return "No forks";
            }
        }
    }

    render() {
        return (
            <div key={this.props.key} className={"border border-dark rounded p-2"}
                 style={{marginBottom: "4vh", width: "30%", marginLeft: "1.6666%", marginRight: "1.6666%", height: "100%", borderColor: "3px"}}>
                {this.showLanguages()}
                <hr className={"bg-dark"}/>
                {this.showDescription()}
                <hr className={"bg-dark"}/>
                {this.showFiles()}
                <hr className={"bg-dark"}/>
                {this.showForks()}
            </div>
        )
    }
}

export default GistCard;
