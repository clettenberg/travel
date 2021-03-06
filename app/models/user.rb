class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable,
    :confirmable

  has_and_belongs_to_many :trips
  has_many :places, through: :trips
end
