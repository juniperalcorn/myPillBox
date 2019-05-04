class Dose < ApplicationRecord
  belongs_to :user
  belongs_to :pill
end
