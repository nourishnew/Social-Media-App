import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from "meteor/meteor";
import './main.html';
Post = new Mongo.Collection('post');

if (Meteor.isClient){
  Template.profileArea.helpers({
    following:function(){
      var user=Meteor.user();
      return user.profile.follow;
    },
    followers:function(){
      var user=Meteor.user();
      var followers=Meteor.users.find({'profile.follow':{$in:[user.username]}})
      
      return followers;
    }
  })
  Template.profileArea.events({
    'click.filter-user':function(event){
      event.preventDefault();
      var selectedUser=event.target.text;
      if(selectedUser=='Community'){
        Session.set('username',null)

      }
      else{
        Session.set('username',selectedUser)
      }

      
    }
  })
   
  Template.postsList.helpers({
    posts:function(){
      var result;

      if(Session.get('username')){
        result=Post.find({username:Session.get('username') },{sort:{created:-1}})

      }
      else{
        result= Post.find({},{sort:{created:-1}});

      }
     
      console.log(result+"dskfnlds")
      return result;
    }
  });
  Template.postsList.events({
    'click.follow-link':function(event){
      event.preventDefault();
      Meteor.call('follow',this)
    }
  })
  Template.postForm.events({
    'submit form':function(event){
      event.preventDefault();
      var content=document.getElementById('content').value;
      console.log(content)

      var username = Meteor.user().username;
      //call methods
      Meteor.call('addPost',content)
      event.target.reset();
    }
  
  });


}

Accounts.ui.config({
  passwordSignupFields:'USERNAME_ONLY'
});

