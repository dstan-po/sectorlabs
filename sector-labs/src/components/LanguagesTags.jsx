import React, {Component} from "react";

class LanguagesTags extends Component {
    state = {

    }

    getLanguagesSet = () => {
        if (this.props.files !== null) {
            let languagesSet = new Set();

            this.props.files.forEach(file => {
                if (file['language'] !== null)
                    languagesSet.add(file['language']);
            })

            return languagesSet
        }
    }

    showLanguagesTags = () => {
        const languagesSet = this.getLanguagesSet();
        if (languagesSet.size !== 0) {
            const languages = Array.from(languagesSet);

            return <div>
                {languages.map(language =>
                    <span className={"border border-success rounded"} style={{marginRight: "1vw", padding: "2px"}}>
                            {language}
                        </span>)
                }
                <br/></div>
        } else {
            return (<span className={"border border-warning rounded"} style={{padding: "2px"}}>
                        No language specified<br/>
                    </span>)
        }
    }

    render() {
        return (
            <div>
                {this.showLanguagesTags()}
            </div>
        )
    }
}

export default LanguagesTags;
