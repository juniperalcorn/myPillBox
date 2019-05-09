class AuthenticationController < ApplicationController
    skip_before_action :verify_authenticity_token

    
    def login
        @user = User.find_by_username(params[:username])
        @user = User.find_by(username: params[:username])

        
        if @user.authenticate(params[:password])
            token = JsonWebToken.encode(user_id: @user.id, username: @user.username)
            render json: { token: token }, status: :ok
        else
            render json: { error: 'unauthorized' }, status: :unauthorized
        end

    end

    private
    def login_params
        params.permit(:username, :password)
    end

end
