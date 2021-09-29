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
            dragComps:[]
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
                    dragComps:[]
                })
                var dragCompsHolder=[];
                for (var i = 0; i < this.state.MasterMemeList[this.state.listNumber].box_count; i++) {
                    dragCompsHolder.push(<DraggableInput key={i} onChangeValue={this.handleChangeValue}/>)
                }
                this.setState({
                    dragComps:dragCompsHolder
                })
                console.log(this.state.MasterMemeList[this.state.listNumber].box_count)
                console.log(this.state.listNumber)
            })
    }


    mySubmitHandler = (event) => { 
        event.preventDefault();
        var memeHolder = this.state.MasterMemeList[this.state.listNumber];
            memeHolder.inputs=this.state.dragComps;
         var memeListHolder=this.state.UserMemeList.concat(memeHolder)
        this.setState({UserMemeList:memeListHolder})
          
    }

    changeListNum = (num) => {
        if (this.state.listNumber > 0 || num > 0) {
            this.setState((prevState, props) => ({
                listNumber: prevState.listNumber + num,
                dragComps:[]
            }));
            console.log(this.state.MasterMemeList[this.state.listNumber].box_count)
            var dragCompsHolder=[];
            for (var i = 0; i < this.state.MasterMemeList[this.state.listNumber].box_count; i++) {
                dragCompsHolder.push(<DraggableInput key={i} onChangeValue={this.handleChangeValue}/>)
            }
            this.setState({
                dragComps:dragCompsHolder
            })
            console.log(this.state.listNumber)
            console.log(this.state.UserMemeList[this.setState.listNumber])
        }
    }

    render() {
        
        if (this.state.MasterMemeList.length >= 1) {
            console.log(this.state.listNumber)
            console.log(this.state.UserMemeList[this.setState.listNumber])

           var meme = this.state.MasterMemeList[this.state.listNumber].url
        }
        var backgrounds = { backgroundImage: 'url(' + meme + ')' }
        
        return (
            <div>
                <div className="container">
                    <div className="title">Meme Generator</div>

                    <div className="meme" style={backgrounds}>
                         {this.state.dragComps}
                    </div>
                   
                
                    <button onClick={() => { this.changeListNum(-1) }}>&#8592;</button>
                    {/*Adds 1 to the index */}
                    {this.state.listNumber + 1 + " / " + this.state.MasterMemeList.length}
                    <button onClick={() => { this.changeListNum(1) }}>&#8594;</button>

                    <form onSubmit={this.mySubmitHandler}>
                        <input type='submit' />
                    </form>

                    {this.state.UserMemeList.map((memeFromList,index)=>{
                         var background = { backgroundImage: 'url(' + memeFromList.url + ')' }
                        return(<div>
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
