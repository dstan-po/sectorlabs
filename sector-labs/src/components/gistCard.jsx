import React, {Component} from "react";

class GistCard extends Component {
    state = {
        forksSearched: false,
        forksFound: [],
        languages: new Set()
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
                //TODO Make this a separate component
                return (
                    <ul className={"list-group"}>
                        {this.state.forksFound.map(fork => (
                            <a href={"https://gist.github.com/" + fork['id']}>
                                <li className={"list-group-item"}>
                                    <div style={{display: "inline-flex"}} className={"m-2"}>
                                        <img style={{marginRight: "0.5vw"}} height={30} width={30}
                                             src={fork['owner']['avatar_url']}
                                             alt={"Fork owner avatar"}/>
                                        <p>{fork['owner']['login']}</p>
                                    </div>
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
            <div className={"border rounded p-2"} style={{height: "100%", marginBottom: "4vh"}}>
                <hr className={"bg-dark"}/>
                {this.showLanguages()}
                {this.showDescription()}
                <hr className={"bg-dark"}/>
                Files: {this.showFiles()}
                <hr className={"bg-dark"}/>
                {this.showForks()}
                <hr className={"bg-dark"}/>
                <br/>
            </div>
        )
    }
}

export default GistCard;
