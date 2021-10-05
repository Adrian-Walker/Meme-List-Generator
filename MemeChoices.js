import React from 'react';


class MemeChoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memeObject: this.props.meme,
            inputs:this.props.inputs
        };
        
    }


    render() {
        
        var backgrounds = { backgroundImage: 'url(' + this.props.meme.url + ')' }
        //Adds text boxes to the meme.
       
        return (
            <div>
                {this.props.meme.name}
                <div className="meme" style={backgrounds}>
                {this.state.inputs}
                {/* {this.props.inputs} */}
                    
                </div>



            </div>
        )
    }
}
export default MemeChoices;
