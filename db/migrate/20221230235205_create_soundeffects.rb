class CreateSoundeffects < ActiveRecord::Migration[7.0]
  def change
    create_table :soundeffects do |t|
      t.integer :sound_id
      t.integer :effect_id

      t.timestamps
    end
  end
end
