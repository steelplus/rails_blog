class HomeController < ApplicationController
  def index
  end

  # リダイレクト処理
  def redirect_to_root
    this.index
  end
end
