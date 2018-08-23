require 'test_helper'

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get get_user" do
    get user_get_user_url
    assert_response :success
  end

end
