class Pill < ApplicationRecord
    has_many :doses
    has_many :users, through: :doses
end
