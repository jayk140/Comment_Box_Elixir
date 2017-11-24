# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :comment_box_elixir,
  ecto_repos: [CommentBoxElixir.Repo]

# Configures the endpoint
config :comment_box_elixir, CommentBoxElixir.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "ELS/p9NbYCd9lDFZhmeGMK+7jz0Z7p3Pc5msOA+LD7QqitaFpIZJ24UM5S4Fzh+v",
  render_errors: [view: CommentBoxElixir.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CommentBoxElixir.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
