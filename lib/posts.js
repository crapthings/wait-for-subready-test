Posts = new Mongo.Collection('posts')

if (Meteor.isServer) {
  Posts.remove({})

  for (let i in Array(20000).fill(n => n + 1)) {
    Posts.insert({
      title: 'post' + i
    })
  }

  Meteor.publish('posts.all', function() {
    return Posts.find({})
  })
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Meteor.autorun(function() {
      if (Meteor.subscribe('posts.all').ready())
        console.log('only print once', Posts.find().count())
      else
        console.log('this run times because its not ready', Posts.find().count())
    })
  })
}
