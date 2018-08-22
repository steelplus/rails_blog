class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def create
    # ユーザ情報登録
    super do
      # エラー時
      if @user.errors.full_messages.size > 0
        render status: 400, :json => {
            :status => 'error',
            :authenticity_token => form_authenticity_token,
            :content => {
                :message => {
                    :error => @user.errors.full_messages
                }
            }
        } and return
      end
      # 正常時
      render status: 200, :json => {
          :status => 'ok',
          :authenticity_token => form_authenticity_token,
          :content => {
              :user => {
                  :id => @user.id,
                  :email => @user.email
              }
          }
      } and return
    end
  end

  def destroy
    # ユーザ退会
    super do
      render :json => {
          :status => 'ok',
          :authenticity_token => form_authenticity_token,
          :result => {
              :message => '退会処理が完了しました。'
          }
      } and return
    end
  end
end
