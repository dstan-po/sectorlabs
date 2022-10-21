import React, {Component} from "react";

class ForksCard extends Component {
    state = {
        forksFound: [],
        forksSearched: false
    }

    getForks = async () => {
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
            return <button className={"btn btn-secondary"} onClick={this.getForks}>Search forks</button>;
        } else {
            if (this.state.forksFound.length !== 0) {
                return (
                    <div key={this.props.key}>
                        <h5>Forks</h5>

                        <ul className={"list-group"}>
                            {this.state.forksFound.map((fork, index) => (
                                <a href={"https://gist.github.com/" + fork['id']} target={"_blank"} rel={"noreferrer"}>
                                    <li key={index} className={"list-group-item"}>
                                        <div style={{display: "inline-flex"}} className={"m-2"}>
                                            <img style={{marginRight: "0.5vw"}}
                                                 height={30} width={30}
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
            <div>
                {this.showForks()}
            </div>
        )
    }
}

export default ForksCard;
