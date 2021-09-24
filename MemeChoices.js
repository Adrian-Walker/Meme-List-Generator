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


                <div className="meme" style={this.props.background} >

                </div>
                {/*Title of Meme */}
                {this.props.memeTitle}

            </div>
        )
    }
}
export default MemeChoices;
