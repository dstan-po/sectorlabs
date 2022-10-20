import React, {Component} from "react";

class GistCard extends Component {
    state = {}

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
            return null;
        } else {
            return "No files."
        }
    }

    render() {
        return (
            <div>
                <hr/><hr/>
                {this.showDescription()}
                <hr/>
                Files: {this.showFiles()}
                <hr/><hr/>
                <br/>
            </div>
        )
    }
}

export default GistCard;
