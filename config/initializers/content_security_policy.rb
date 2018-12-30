# Define an application-wide content security policy
# For further information see the following documentation
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy

Rails.application.config.content_security_policy do |p|
  p.default_src :self, :https
  p.font_src    :self, :https, :data
  p.img_src     :self, :https, :data, :blob
  p.object_src  :none
  p.script_src  :self, :https, :unsafe_inline
  p.style_src   :self, :https, :unsafe_inline
  p.worker_src :blob
  p.child_src :blob
  p.connect_src :self, 'https://*.tiles.mapbox.com', 'https://api.mapbox.com', 'https://events.mapbox.com'
  p.connect_src :self, :https, 'http://localhost:3035', 'ws://localhost:3035' if Rails.env.development?

  # Specify URI for violation reports
  # p.report_uri "/csp-violation-report-endpoint"
end

# Report CSP violations to a specified URI
# For further information see the following documentation:
# https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only
# Rails.application.config.content_security_policy_report_only = true
