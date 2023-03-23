class Sound < ApplicationRecord
    validates :user_id, presence: true
    validates :sound_name, presence: true
    belongs_to :user
    has_many :soundeffects
    has_many :effects, through: :soundeffects
end
