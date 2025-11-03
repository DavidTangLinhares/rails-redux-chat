# app/controllers/channels_controller.rb
class ChannelsController < ApplicationController
  def show
    @channels = Channel.all  # if you still need them for the page layout
    render :show
  end
end
