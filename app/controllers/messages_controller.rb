class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
  end

  def new
    @message = Message.new
  end

  def create
    @message = Message.new(create_params)
  end

  private

  def create_params
    params.permit(:te)
  end
end
