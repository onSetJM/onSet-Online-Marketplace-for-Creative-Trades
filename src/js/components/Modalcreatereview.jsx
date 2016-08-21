var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');
var Modal = require('react-modal');
var $ = require('jquery');
/* global localStorage */


var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

/*
By default the modal is anchored to document.body. All of the following overrides are available.

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    padding               : '40px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minHeight: '10rem',
    minWidth: '15rem',
    width: '65%',
    maxWidth: '35rem'
  }
};


var Modalcreatereview = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false, rating:1 };
  },
  onStarClick: function(name, nextValue) {
        this.setState({rating: nextValue});
    },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.refs.score.value,
          text: this.refs.reviewText.value,
          token: localStorage.instagram_sub,
          profileusername: this.props.username
      };
      console.log(reviewObj);
      var that = this;
      $.ajax({           
            url: '/createareview', 
            data: reviewObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
                history.push(`/profile/martimax21`);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
        this.setState({modalIsOpen: false})
    },

  render: function() {
    var rating  = this.state.rating;
    return (
      <div >
        <button className="btn btn-primary" onClick={this.openModal}> REVIEW {this.props.name} </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="modalreview">
          <p className="h2">Review {this.props.name}</p>
          
          <form id="reviewForm" onSubmit={this._handleSubmit}>
            <div className="form-group">
                <label htmlFor="score"> Please enter a score out of 10 </label>
                 <input type="number" className="form-control" ref="score" id="exampleInputPassword1" placeholder="Score out of 10" />
             </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1"> Review headline: </label>
                 <input type="text" className="form-control" ref="headline" id="exampleInputPassword1" placeholder="headline" />
             </div>
            <div className="form-group">
                <label htmlFor="comments"> Write your review : </label>
                 <textarea className="form-control" ref="reviewText" id="exampleTextarea" rows="3"></textarea>
            </div>
            <button className="btn btn-primary"> Submit your review !</button>

          </form>
          </div>
        </Modal>
      </div>
      
    );
  }
});

/*
<div> Star score to debug
                <h2>Rating from state: {rating}</h2>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick}
                />
            </div>
            */

module.exports = Modalcreatereview;