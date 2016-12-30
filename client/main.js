Meteor.startup(function() {

  Meteor.autorun(function() {

    if (Meteor.subscribe('posts.all').ready())
      console.log('only print once', Posts.find().count())
    else
      console.log('this run times because its not ready', Posts.find().count())

  })

})
