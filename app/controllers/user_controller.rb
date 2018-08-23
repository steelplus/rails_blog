class UserController < ApplicationController
  def get_user
    if user_signed_in?
      render status: 200, :json => {
          :status => 'ok',
          :authenticity_token => form_authenticity_token,
          :content => {
              :user => {
                  :id => current_user.id,
                  :email => current_user.email
              }
          }
      }
    else
      render status: 200, :json => {
          :status => 'ok',
          :authenticity_token => form_authenticity_token,
          :content => {
          }
      }
    end
  end
end
