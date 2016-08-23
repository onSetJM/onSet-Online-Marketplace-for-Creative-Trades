var React = require('react');
var $ = require('jquery');
/*global localStorage */
/*global dateFormat */
import {ButtonToolbar, Button} from 'react-bootstrap';

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var Singlegalleryphoto = require('./Singlegalleryphoto');
var Galleryslider = require('./Galleryslider');
var Createreviewmodal = require('./Createreviewmodal');
var Email = require("./Email");
var Reviews = require("./Reviews");
var StarRatingComponent = require('react-star-rating-component');


var Profile = React.createClass({
    getInitialState: function() {
        return {};
    },
    fetchData: function() {
        var that = this;
        console.log(this.props.params.username);
        $.ajax({           
            url: '/profile', 
            data: {username:this.props.params.username},
            type: 'POST',
            success: function(result) {
                console.log(result, "this is the result of profile AJAX");
                that.setState({
                 profile: result.profile
                });
                console.log(result.profile, "this is profile token");
                $.ajax({           
                 url: '/profilephotos', 
                 data: {token: result.profile.token},
                 type: 'POST',
                 success: function(result) {
                        // console.log(result,"this is photo result");
                        that.setState({
                          photos: result.photos
                        });
                     },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  componentDidMount:function(){
      this.fetchData();
  },
  _reviewSubmitted:function(){
      this.fetchData();
  },
  _handleButton: function() {
     console.log(this.props.params.username);
    history.push(`/profile/${this.props.params.username}/email`);
  },
  render: function() {
      if (!this.state.profile) {
            return <div>Loading...</div>;
        }
      if (!this.state.photos) {
            return <div>Loading...</div>;
        }
        var url = "/profile/" + this.props.params.username + "/reviews";
        console.log(this.state, "THIS IS THE FINAL STATE");
        var score = (this.state.profile.profileScore)/2;
    return (
            
            <div className="profile-container">
                <div className="profile-info" >
                    <div className="profile-img-container prof">
                        <img className="profile-img" src={this.state.profile.profile_pic}/>
                    </div>
                    <div className="profile-maininfo prof">
                        <div className="profile-name"> {this.state.profile.name}</div>
                        
                        <div className="profile-category"> {(this.state.profile.profileCategory).toUpperCase()} </div>
                        <div className="profile-city"><span className="profile-head-city">City:</span> {this.state.profile.city} </div>
                        
                        <StarRatingComponent 
                         name="singleprofilerating" 
                         starCount={5}
                         value={score}
                         editing={false} /> 
                         <h4> {score} </h4>
                    </div>
                    
                    <div className="box-buttons prof">
                        <Reviews profile = {this.state.profile} />
                        <Email username={this.props.params.username} name={this.state.profile.name} />
                        <Createreviewmodal name={this.state.profile.name} onReviewSubmit={this._reviewSubmitted} username={this.props.params.username} />
                    </div>
                </div>
                <div className="portfolio-padding">
                    <h2 className="page-subtitle">Portfolio</h2>
                    <Galleryslider key="galleryslider" photos={this.state.photos} />
                </div>
                    <div className="profile-box content-padding">

                        <hr />
                        <div className="profile-cv">
                            <div className="cv-info">
                                <h2 className="page-subtitle">Relevant Experience</h2>
                                <h3 className="profile-header">Specialities: </h3>
                                <p className="profile-para"> {this.state.profile.specialities} </p>
                                <h3 className="profile-header">Previous Employment:</h3>
                                <p className="profile-para">{this.state.profile.employment}</p>
                                <h3 className="profile-header">Education:</h3>
                                <p className="profile-para">{this.state.profile.education}</p>
                        <hr />        
                                <h2 className="page-subtitle">Member Info</h2>
                                <p className="profile-para"><span className="profile-header">Member Since:</span> {this.state.profile.createdAt} </p>
                            </div>
                        </div>
                    </div>
                    {this.props.children}
                
            </div>
    );
  }
});


module.exports = Profile;

