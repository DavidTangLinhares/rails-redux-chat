# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

puts "Cleaning database..."

# Destroy in this order to respect dependencies
Message.destroy_all
User.destroy_all
Channel.destroy_all

puts "Database cleaned ✅"

# --------------------------------------------------
# Create Channels
# --------------------------------------------------
puts "Creating channels..."

channels = [
  Channel.create!(name: "general"),
  Channel.create!(name: "paris"),
  Channel.create!(name: "react")
]

puts "Created #{Channel.count} channels ✅"

# --------------------------------------------------
# Create Users
# --------------------------------------------------
puts "Creating users..."

users = [
  User.create!(email: "alice@example.com", password: "password"),
  User.create!(email: "bob@example.com", password: "password"),
  User.create!(email: "charlie@example.com", password: "password")
]

puts "Created #{User.count} users ✅"

# --------------------------------------------------
# Create Messages
# --------------------------------------------------
puts "Creating messages..."

Message.create!(
  content: "Hello everyone 👋",
  user: users[0],
  channel: channels[0]
)

Message.create!(
  content: "Hi Alice, welcome to the chat!",
  user: users[1],
  channel: channels[0]
)

Message.create!(
  content: "Anyone in Paris this weekend?",
  user: users[2],
  channel: channels[1]
)

Message.create!(
  content: "React hooks are awesome!",
  user: users[1],
  channel: channels[2]
)

Message.create!(
  content: "Yes, useEffect changed everything 😎",
  user: users[0],
  channel: channels[2]
)

puts "Created #{Message.count} messages ✅"

puts "Seeding complete! 🌱"
