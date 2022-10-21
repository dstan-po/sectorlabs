import React, {Component} from "react";

class FilesCard extends Component {
    state = {}

    render() {
        return (
            <div key={this.props.key}>
                <h5>Files</h5>
                <ul className={"list-group"}>
                    {this.props.files.map((file, index) =>
                        <li style={{listStyle: "none"}} className={"list-group-item"} key={index}>
                            <div>
                                <a href={file.url} target={"_blank"} rel={"noreferrer"}>{file.name}</a><br/>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        )
    }

}

export default FilesCard;
