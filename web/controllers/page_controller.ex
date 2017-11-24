defmodule CommentBoxElixir.PageController do
  use CommentBoxElixir.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
