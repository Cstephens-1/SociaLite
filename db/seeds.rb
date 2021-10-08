# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "Seeding content"
User.create(username: "Cory", bio: "SE student in NYC", admin: true, password: "123", img: "./client/src/pictures/headshot.png"  )
User.create(username: "Ryan", bio: "marketing director for adtech", password: "123")
User.create(username: "Bailey", bio: "living in Nola", password: "123")

Post.create(user_id: 1, comment: "first day of october!")
Post.create(user_id: 2, comment: "so happy to be on FIP this week!")
Post.create(user_id: 1, comment: "generic meme")


puts "done seeding"