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


                <div className="meme" style={this.props.background} >
                </div>
                {/*Title of Meme */}
                {this.props.memeTitle}

            </div>
        )
    }
}
export default MemeChoices;
