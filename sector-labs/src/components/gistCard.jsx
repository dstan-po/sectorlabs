import React, {Component} from "react";
import FilesCard from "./filesCard";
import LanguagesTags from "./LanguagesTags";
import ForksCard from "./ForksCard";

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
            return <p
                style={{overflow: "auto"}}>{"Description: " + this.props.description.replace(/[^a-z0-9áéíóúñü\n\\<> \.,_-]/gim, "").trim()}</p>;
        } else {
            return "No description";
        }
    }

    showLanguages = () => {
        return <LanguagesTags files={this.props.files}/>
    }

    showFiles = () => {
        if (this.props.files !== null) {
            return <FilesCard key={this.props.key} files={this.props.files}/>
        } else {
            return "No files."
        }
    }

    showForks = () => {
        return <ForksCard key={this.props.key} forksUrl={this.props.forksUrl}/>
    }

    render() {
        return (
            <div key={this.props.key} className={"border border-dark rounded p-2"}
                 style={{
                     marginBottom: "4vh",
                     width: "30%",
                     marginLeft: "1.6666%",
                     marginRight: "1.6666%",
                     height: "100%",
                     borderColor: "3px"
                 }}>
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
