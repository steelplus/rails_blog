class RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

  def create
    # ユーザ情報登録
    super do
      # エラー時
      if @user.id.nil?
        render status: 500, :json => {
            :status => 'error',
            :csrf_token => form_authenticity_token,
            :content => {
                :message => {
                    :error => 'ユーザ登録に失敗しました'
                }
            }
        } and return
      end
      # 正常時
      render status: 200, :json => {
          :status => 'ok',
          :csrf_token => form_authenticity_token,
          :content => {
              :user => {
                  :id => @user.id,
                  :name => @user.email
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
          :csrf_token => form_authenticity_token,
          :result => {
              :message => '退会処理が完了しました。'
          }
      } and return
    end
  end
end
