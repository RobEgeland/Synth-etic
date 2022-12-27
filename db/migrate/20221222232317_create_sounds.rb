class CreateSounds < ActiveRecord::Migration[7.0]
  def change
    create_table :sounds do |t|
      t.integer :user_id
      t.string :sound_name
      t.float :harmonicity
      t.float :vibrato_amount
      t.float :vibrato_rate
      t.string :voice0_oscillator
      t.integer :voice0_volume
      t.integer :voice0_portamento
      t.float :voice0_attack
      t.float :voice0_decay
      t.float :voice0_sustain
      t.float :voice0_release
      t.string :voice1_oscillator
      t.integer :voice1_volume
      t.integer :voice1_portamento
      t.float :voice1_attack
      t.float :voice1_decay
      t.float :voice1_sustain
      t.float :voice1_release

      t.timestamps
    end
  end
end
