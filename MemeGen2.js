import React from 'react';
import MemeChoices from './MemeChoices';
import SavedMemes from './SavedMemes';
import DraggableInput from './DraggableInput';

class MemeGen2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MasterMemeList: [],
            UserMemeList: [],
            listNumber: 0,
            loading: false,
            dragComps: []
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
                var holder = this.state.MasterMemeList.map(meme=>{
                    var inputholder=[];
                    for (var i = 0; i < meme.box_count; i++) {
                        inputholder.push(<DraggableInput key={i} onChangeValue={this.handleChangeValue} />)
                    }
                    meme.inputs=inputholder
                    return meme;
                })
                this.setState({
                    MasterMemeList: holder,
                    loading: false,
                })
                console.log(this.state.MasterMemeList);
                this.changeData();

            })

    }


    changeData = () => {

        console.log("box count: " + this.state.MasterMemeList[this.state.listNumber].box_count)
        console.log("List number: " + this.state.listNumber)
        this.dragCompsHolder = [];
        for (var i = 0; i < this.state.MasterMemeList[this.state.listNumber].box_count; i++) {
            this.dragCompsHolder.push(<DraggableInput key={i} onChangeValue={this.handleChangeValue} />)
        }
        this.setState({
            dragComps: this.dragCompsHolder
        })

    }
   

    mySubmitHandler = (event) => {
        event.preventDefault();
        var memeHolder = this.state.MasterMemeList[this.state.listNumber];
        memeHolder.inputs = this.dragCompsHolder;
        var memeListHolder = this.state.UserMemeList.concat(memeHolder)
        this.setState({ UserMemeList: memeListHolder })
        console.log(this.state.UserMemeList)
    }

    changeListNum = (num) => {
        this.changeData();
        console.log("Change list num");
        console.log("list num " + this.state.listNumber)
        console.log("Box Count " + this.state.MasterMemeList[this.state.listNumber].box_count)
        console.log("meme " + this.state.UserMemeList[this.setState.listNumber])
        if (this.state.listNumber > 0 || num > 0) {
            this.setState(prevState => ({
                listNumber: prevState.listNumber + num,
            }));
        }
    }

    handleCallback = (childData) =>{
        console.log(childData)
        console.log(this)
    }

    render() {

        if (this.state.MasterMemeList.length >= 1) {
            var meme = this.state.MasterMemeList[this.state.listNumber].url
            this.dragCompsHolder = [];
            for (var i = 0; i < this.state.MasterMemeList[this.state.listNumber].box_count; i++) {
                this.dragCompsHolder.push(<DraggableInput key={i} parentCallback = {this.handleCallback()}  />)
            }
        }

        var backgrounds = { backgroundImage: 'url(' + meme + ')' }

        return (
            <div>
                <div className="container">
                    <div className="title">Meme Generator</div>

                    <div className="meme" style={backgrounds}>
                        {this.dragCompsHolder}
                        {/* {this.state.MasterMemeList[this.state.listNumber].box_count.map((emme,index)=>{
                            <DraggableInput key={index} onChangeValue={this.handleChangeValue}/>
                        })} */}
                    </div>


                    <button onClick={() => { this.changeListNum(-1) }}>&#8592;</button>
                    {/*Adds 1 to the index */}
                    {this.state.listNumber + 1 + " / " + this.state.MasterMemeList.length}
                    <button onClick={() => { this.changeListNum(1) }}>&#8594;</button>

                    <form onSubmit={this.mySubmitHandler}>
                        <input type='submit' />
                    </form>

                    {this.state.UserMemeList.map((memeFromList, index) => {
                        var background = { backgroundImage: 'url(' + memeFromList.url + ')' }
                        return (<div>
                            <div className="meme" style={background}>
                                {memeFromList.inputs}

                            </div>
                        </div>)
                    })}

                </div>


            </div>
        );
    }
}
export default MemeGen2;
