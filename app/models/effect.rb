class Effect < ApplicationRecord
    has_many :soundeffects
    has_many :sounds, through: :soundeffects
end
