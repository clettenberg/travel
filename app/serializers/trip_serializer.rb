class TripSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :title, :start_date, :end_date
  has_many :places
end
