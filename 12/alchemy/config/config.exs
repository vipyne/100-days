# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :alchemy,
  ecto_repos: [Alchemy.Repo]

# Configures the endpoint
config :alchemy, Alchemy.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "HPyQWCh5w4RWj3998CqA76n1mssH1UrESV4Op1SUldZB23IDHQFjun4JsgSMwh5n",
  render_errors: [view: Alchemy.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Alchemy.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
