Posts = new Mongo.Collection('posts')
Comments = new Mongo.Collection('comments')


if (Meteor.isServer) {
  Posts.remove({})
  Comments.remove({})

  for (let i in Array(200).fill(n => n + 1)) {
    Posts.insert({
      title: 'post' + i
    })

    Comments.insert({
      content: 'comment' + i
    })
  }

  Meteor.publish('posts.all', function() {
    return [Posts.find(), Comments.find()]
  })
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Meteor.autorun(function() {
      if (Meteor.subscribe('posts.all').ready())
        console.log('only print once', Posts.find().count(), Comments.find().count())
      else
        console.log('this run times because its not ready', Posts.find().count())
    })
  })
}
