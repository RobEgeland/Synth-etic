class Sound < ApplicationRecord
    validates :user_id, presence: true
end
