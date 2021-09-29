import React from 'react';
import MemeChoices from './MemeChoices';
import SavedMemes from './SavedMemes';
import DraggableInput from './DraggableInput';

class MemeGen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            MasterMemeList: [],
            UserMemeList: [],
            listNumber: 0,
            loading: false,
            dragComps:0
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
         var memeHolder=this.state.UserMemeList.concat(this.state.MasterMemeList[this.state.listNumber])
         
        this.setState({UserMemeList:memeHolder})
          
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
            this.setState({
                dragComps:this.state.MasterMemeList[this.state.listNumber].box_count
               
            });
            console.log(this.state.dragComps)
        }
    }

    handleChangeValue = (childData) =>{
        console.log(childData)
    }

    render() {
        
        //console.log(this.state.MasterMemeList[this.state.listNumber])
        //If MasterMemeList comes back undefined do not run.
        if (this.state.MasterMemeList.length >= 1) {

            // for (var i = 0; i < this.state.MasterMemeList[this.state.listNumber].box_count; i++) {
            //     dragCompsHolder.push(<DraggableInput key={i} onChangeValue={this.handleChangeValue}/>)
            // }
           var meme = <MemeChoices meme={this.state.MasterMemeList[this.state.listNumber]} />
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

                    {this.state.UserMemeList.map((memeFromList,index)=>{
                        return(<div>
                            {/* {memeFromList.name} */}
                            <MemeChoices  meme={memeFromList}  />
                        </div>)
                    })}

                </div>


            </div>
        );
    }
}
export default MemeGen;
