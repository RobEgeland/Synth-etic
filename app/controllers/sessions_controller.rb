class SessionsController < ApplicationController

    def create 
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: {errors: "Invalid username or password"}, status: :unauthorized
        end

        def destroy
            session.delete :user_id 
            head :no_content
        end
    end
end
