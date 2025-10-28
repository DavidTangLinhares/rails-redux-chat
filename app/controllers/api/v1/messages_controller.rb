class Api::V1::MessagesController < ActionController::API
  before_action :set_channel

  def index
    @messages = @channel.messages.includes(:user).order(created_at: :asc)

    render json: @messages.map { |message|
      {
        id: message.id,
        user: message.user.email.split('@').first,
        content: message.content,
        created_at: message.created_at
      }
    }
  end

  def create
    @message = @channel.messages.build(message_params)
    @message.user = current_user

    if @message.save
      render json: @message.as_json(include: { user: { only: [:id, :email] } }), status: :created
    else
      render json: { errors: @message.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_channel
    @channel = Channel.find_by(name: params[:channel_id])
    render json: { error: "Channel not found" }, status: :not_found unless @channel
  end

  def message_params
    params.require(:message).permit(:content)
  end
end
