require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PillOrganizer
  class Application < Rails::Application


    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2

    config.enable_dependency_loading = true
    config.autoload_paths << Rails.root.join('lib')
    config.eager_load_paths += Dir["#{config.root}/lib/**/"]

    # config.middleware.insert_before ActionDispatch::Static, Rack::Cors do
    #   allow do
    #     origins '*'
    #     resource '*', 
    #       headers: :any, 
    #       methods: [:get, :post, :put, :patch, :options, :head]
    #   end
    # end
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.

    ##added may 9
    config.api_only = true;
  end
end


