import React from 'react';
import MemeChoices from './MemeChoices';
var meme;

class MemeGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MasterMemeList: [],
            UserMemeList: [],
            listNumber: 0,
            loading: false,
        };
    }

    //Picking up information from API.
    componentDidMount() {
        this.setState({ loading: true })
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    MasterMemeList: data.data.memes,
                    loading: false,
                })
            })
    }

    mySubmitHandler = (event) => {
        event.preventDefault();
        console.log(meme);
    }
    myChangeHandler = (event) => {
        // console.log(event.target.value + event.target.name)
        // var name = event.target.name;
        // this.setState({ [name]: event.target.value });
    }

    changeListNum = (num) => {
        if (this.state.listNumber > 0 || num > 0) {
            this.setState((prevState, props) => ({
                listNumber: prevState.listNumber + num,
            }));
        }
    }

    render() {
        console.log(this.state.MasterMemeList[this.state.listNumber])
        //If MasterMemeList comes back undefined do not run.
        if (this.state.MasterMemeList.length >= 1) {
            var backgrounds = { backgroundImage: 'url(' + this.state.MasterMemeList[this.state.listNumber].url + ')' }
            var title = this.state.MasterMemeList[this.state.listNumber].name;
            meme = <MemeChoices background={backgrounds} listNumber={this.state.listNumber} memeTitle={title} meme={this.state.MasterMemeList[this.state.listNumber]} />
        }
        return (
            <div>
                <div className="container">
                    <div className="title">Meme Generator</div>
                    {meme}
                    <button onClick={() => { this.changeListNum(-1) }}>&#8592;</button>
                    {/*Adds 1 to the index */}
                    {this.state.listNumber + 1 + " / " + this.state.MasterMemeList.length}
                    <button onClick={() => { this.changeListNum(1) }}>&#8594;</button>

                    <form onSubmit={this.mySubmitHandler}>

                        <input type='submit' />
                    </form>

                </div>


            </div>
        );
    }
}
export default MemeGen;
