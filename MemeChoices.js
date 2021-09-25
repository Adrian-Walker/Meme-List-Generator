import React from 'react';
import DraggableInput from './DraggableInput';

class MemeChoices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            memeObject: this.props.meme
        };

    }


    render() {
        var dragComps = [];
        //Adds text boxes to the meme.
        for (var i = 0; i < this.props.meme.box_count; i++) {
            dragComps.push(<DraggableInput key={i} />)
        }

        return (

            <div>
                {this.props.meme.name}
                <div className="meme" style={this.props.background}  >

                    {dragComps}
                </div>



            </div>
        )
    }
}
export default MemeChoices;
