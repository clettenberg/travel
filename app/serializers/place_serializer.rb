class PlaceSerializer
  include FastJsonapi::ObjectSerializer
  set_key_transform :camel_lower
  attributes :place_id, :note
  belongs_to :trip
end
