class AddSoundNameToSounds < ActiveRecord::Migration[7.0]
  def change
    add_column :sounds, :sound_name, :string
  end
end
