var React = require('react');
var $ = require('jquery');
var Reviewsmodaldisplay = require('./Reviewsmodaldisplay');

var history = require('react-router').browserHistory;



var Reviews = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        console.log(that.props.profile.username);
        $.ajax({           
            url: '/reviews', 
            data: {profileusername:that.props.profile.username},
            type: 'POST',
            success: function(result) {
                console.log(result.reviews, "this is the review object");
                that.setState({
                 reviews:result.reviews
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  render: function() {
      if (!this.state.reviews) {
            return <div>LOADING FOLLOWERS...</div>;
        }
    return (
      <div>
            <Reviewsmodaldisplay reviews= {this.state.reviews} profile={this.props.profile} />
      </div>
    );

  }
});


module.exports = Reviews;