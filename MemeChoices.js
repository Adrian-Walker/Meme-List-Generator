import React from 'react';

class MemeChoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = { memeObject : this.props.meme
        };
       
    }

    render() {
        return (
            <div>
                {this.props.memeTitle}
                <div className="meme" style={this.props.background} >
         
                </div>
            </div>
        )
    }
}
export default MemeChoices;

