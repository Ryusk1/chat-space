class UsersController < ApplicationController

  def index
    @users = User.where('name LIKE ?', "#{params[:keyword]}%").where.not(id: current_user.id)
    respond_to do |format|
      format.json
      format.html
    end
  end

  def edit
  end

  def update
    if current_user.name == params[:user][:name]
      flash.now[:alert] = "名前が変更されていません"
      render :edit
    elsif current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email)
  end
end
