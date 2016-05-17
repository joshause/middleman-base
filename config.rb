###
# Compass
###

# Change Compass configuration
# compass_config do |config|
#   config.output_style = :compact
# end

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
# page "/path/to/file.html", :layout => false
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

helpers do
  def nav_active(path)
    current_page.path == path ? {:class => "active"} : {}
  end
end

# Reload the browser automatically whenever files change
configure :development do
   activate :livereload
   activate :directory_indexes
end

# Uses .env in the root of the project
activate :dotenv

activate :contentful do |f|
  f.access_token  = ENV['CONTENTFUL_ACCESS_TOKEN']
  f.space         = {brands: "7e8maa342izc"}
  f.content_types = {brand: "sFzTZbSuM8coEwygeUYes"}
  f.cda_query     = {content_type: "sFzTZbSuM8coEwygeUYes"}
end

activate :lunr

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

set :css_dir, 'stylesheets'

set :js_dir, 'javascripts'

set :images_dir, 'images'

# Build-specific configuration
configure :build do

  # dependent upon imagemagick for build
  activate :favicon_maker do |f|
   f.template_dir  = 'source/images'
   f.icons = {
     "_favicon_template_hires.png" => [
       { icon: "apple-touch-icon-152x152-precomposed.png" },
       { icon: "apple-touch-icon-114x114-precomposed.png" },
       { icon: "apple-touch-icon-72x72-precomposed.png" },
       { icon: "mstile-144x144", format: :png },
     ],
     "_favicon_template_lores.png" => [
       { icon: "favicon.png", size: "16x16" },
       { icon: "favicon.ico", size: "64x64,32x32,24x24,16x16" },
     ]
   }
  end

  activate :dotenv, env: '.env.build'

  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
