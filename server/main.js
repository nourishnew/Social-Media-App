import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  Post = new Mongo.Collection('post');
  Accounts.onCreateUser(function(options,user){
    user.profile=user.profile||{};
    user.profile.follow=[];
    return user;
  })
 
  Meteor.methods({

    addPost:function(content){
      if(!Meteor.userId()){
        throw new Meteor.Error('not-autorized','You are not signed in ')
      }
      var username=Meteor.user().username;
      Post.insert(
        {
          content:content,
          created:new Date(),
          username:username
  
        
      });
  
    }, follow:function(post){
      console.log("yoyo")
     var user=Meteor.user();
     if(!user){
       throw new Meteor.Error('not-authorized','You are not signed in ')
     }
     //cant follow yourself
     //cant follow twice
     var u=post.username
     if(user.username!=post.username&&user.profile.follow.indexOf(u)==-1){
       Meteor.users.update({_id:user._id},
      {$push:{'profile.follow':post.username}
      })
     }
    }
  })
 

}




);

