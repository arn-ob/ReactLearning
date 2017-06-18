import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

// Tutorial 4
var Bacon = React.createClass({

    render : function () {
        return (
            <div>
                <h1>This is Bacon Class</h1>
                <p> This is paragraph Componenet</p>
            </div>
        );
    }

});

// Note :
// Every Single comomemt will return into a single Components :D
// Acutally its fun
// Componet name 1st letter must be capital latter

// Class 5
var Movie = React.createClass({

    render : function () {
        return(
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.cata}</p>
            </div>
        );
    }
});


//class 6
var Cmment = React.createClass({

    edit : function () {
      alert('Eiditing Comment');
    },

    hy : function () {
        alert('Hy');
    },


    render : function () {
            return(
                <div className="CommentContainer">
                    <div className="commentText">{this.props.children}</div>
                    <button onClick={this.edit} className="button-primary">Edit</button>
                    <button onClick={this.hy} className="button-danger">Hy</button>

                </div>
            );
        }

});

// Class 7

var CheckBox = React.createClass({

    getInitialState : function () {
        return{checked: false}
    },

    handleChecked : function () {
        this.setState({checked : !this.state.checked})

    },

    render : function () {

        var msg;
        if(this.state.checked){
            msg = "Checked";
        }else{
            msg = "unChecked";
        }

        return(
                <div>
                    <input type="checkbox" onChange = {this.handleChecked} defaultChecked={this.state.checked} />
                    <h3>Checkbox is {msg}</h3>
                </div>
            );
    }
});

// Class 8
var CmmentTwo = React.createClass({

    getInitialState : function () {
        return { editing : false }
    },

    edit : function () {
        this.setState({editing:true});
    },

    save : function () {
        var values = this.refs.newText.value;
        this.props.updateCommentText(values, this.props.index);
        this.setState({editing:false});
    },

    remove : function () {
        console.log('remove');
        this.props.deletefromBoard(this.props.index);
    },

    RenderForm :function () {
        return(
            <div className="CommentContainer">
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button onClick={this.save} className="button-primary">Save</button>

            </div>
        );
    },

    RenderNormal :function () {
        return(
            <div className="CommentContainer">
                <div className="commentText">{this.props.children}</div>
                <button onClick={this.edit} className="button-primary">Edit</button>
                <button onClick={this.remove} className="button-danger">remove</button>

            </div>
        );
    },



    render : function () {
        if(this.state.editing){
            return this.RenderForm();
        }else {
            return this.RenderNormal();
        }
    }

});


var Board = React.createClass({

    getInitialState : function () {
        return {
            comments:[]
        }
    },

    add : function (text) {
        var arr = this.state.comments;
        arr.push(text);
        this.setState({comments:arr});
    },


    eachComment : function (text , i)  {
        return(<CmmentTwo  key={i} index={i} updateCommentText={this.updateComments} deletefromBoard={this.removeComment}>
                {text}
            </CmmentTwo>);

    },


    removeComment : function (i) {
        console.log('Remove Comment : ' + i);
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({comments:arr});
    },

    updateComments : function (newText , i) {
      console.log('Udating Comments : ' + i);
      var arr = this.state.comments;
      arr[i] = newText;
      this.setState({comments:arr});
    },


    render: function () {
        return(
            <div>
                <button onClick={this.add.bind(null,'Bacon Tuna')}>Add New</button>
            <div className="Board">
                {
                    this.state.comments.map( this.eachComment )
                }
            </div>
            </div>
        );
    }
});




// Show at html
ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<div>
    <Movie title="Avater" cata="action" />
    <Movie title="inception" cata="Advancer" />


    </div> , document.getElementById('example'));

ReactDOM.render(<div className="board">
    <Cmment>Beans</Cmment>
    <Cmment>Hay hau</Cmment>

    </div>, document.getElementById('cmment'));

ReactDOM.render(<CheckBox />, document.getElementById('CheckBox'));
ReactDOM.render(<Board />, document.getElementById('CmmentTwo'));
registerServiceWorker();
