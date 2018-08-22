class SessionsController < Devise::SessionsController
  respond_to :json

  def create
    @user = current_user
    super do
      render :json => {
          :status => 'ok',
          :authenticity_token => form_authenticity_token,
          :content => {
              :user => {
                  :id => @user.id,
                  :name => @user.name
              }
          }
      } and return
    end
  end

  def destroy
    super do
      render :json => {
          :csrf_param => request_forgery_protection_token,
          :authenticity_token => form_authenticity_token
      } and return
    end
  end

  def verify_signed_out_user
    if all_signed_out?
      set_flash_message! :notice, :already_signed_out
    end
  end
end
