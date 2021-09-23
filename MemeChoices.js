import React from 'react';

class MemeChoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        // console.log(this.props.loading);
        // if (this.props.loading) {
        //     var background = {
        //         backgroundImage: 'url(' + this.props.background.url + ')'
        //     }
        // }
        //test ets
        //console.log(this.props);
        return (
            <div>
                {this.props.memeTitle}
                <div className="meme" style={this.props.background} >
                </div>
                <input placeholder="meme"></input>
                <input placeholder="generator"></input>
            </div>
        )
    }
}
export default MemeChoices;
