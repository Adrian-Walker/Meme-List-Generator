import React from "react";
import { Component } from "react";

class App extends Component {
    constructor() {
        super()
        this.state = {
            image: " "
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input placeholder="Top Text"></input>
                    <input placeholder="Bottom Text"></input>
                    <button>Submit</button>
                </form>
                <button>Refresh Meme Image</button>
            </div>
        )
    }
}

export default App;
