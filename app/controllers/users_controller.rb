class UsersController < ApplicationController
    skip_before_action :confirm_authentication

    #GET /users
    def index
        users = User.all
        render json: users
    end

    #GET /users/:id
    def show
      if current_user
        render json: current_user, status: :ok
      else
        render json: { user: 'not logged in' }, status: :unauthorized
      end
    end
  
    #POST /users
    def create
      user = User.create(user_params)
      if user.valid?
        session[:user_id] = user.id
        render json: user, status: :created
      else
        render json: user.errors, status: :unprocessable_entity
      end
    end

    #PATCH /users/:id
    def update
      edited_user = User.find_by_id(params[:id])
      if edited_user.update(edited_user_params)
        byebug
        # session[:user_id] = edited_user.id
        render json: edited_user
      else
        byebug
        render json: edited_user.errors, status: :unprocessable_entity
      end
    end

    #destroy /users/:id
    def destroy
      user = User.find_by_id(params[:id])
      user.destroy
      render json: {session_user: session[:user_id]}
    end

  
    private
  
    def user_params
      params.permit(:username, :email, :password, :password_confirmation)
    end

    def edited_user_params
      params.permit(:username)
    end
  end
  