class PostsController < ApplicationController
    skip_before_action :confirm_authentication

    def index
        posts = Post.all
        render json: posts
    end

    def show
        if current_user
            render json: current_user.posts
        else
            render json: {error: "Please log in"}
        end
    end

    def create
        post = Post.new(post_params)
        if post.save
            render json: post
        else
            render json: post.errors 
        end
    end

    def update
        byebug
        post = Post.find_by(id: params[:id])
        post.update(comment: params[:comment])
        render json: post, status: :ok
    end

    def destroy
        
        post = Post.find_by(id: params[:id])
        # if post.user_id = current_user.id
            post.destroy
            render json: post, status: :ok
        # else
        #     render json: {error: "can only modify your own posts"}
        # end
    end


    private
    def post_params
        params.permit(:comment, :user_id)
    end

end
