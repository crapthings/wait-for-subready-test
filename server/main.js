Posts.remove({})

for (let i in Array(20000).fill(n => n + 1)) {
  Posts.insert({
    title: 'post' + i
  })
}

Meteor.publish('posts.all', function() {
  return Posts.find({})
})
