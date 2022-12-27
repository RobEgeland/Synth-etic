# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_12_22_232317) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "sounds", force: :cascade do |t|
    t.integer "user_id"
    t.string "sound_name"
    t.float "harmonicity"
    t.float "vibrato_amount"
    t.float "vibrato_rate"
    t.string "voice0_oscillator"
    t.integer "voice0_volume"
    t.integer "voice0_portamento"
    t.float "voice0_attack"
    t.float "voice0_decay"
    t.float "voice0_sustain"
    t.float "voice0_release"
    t.string "voice1_oscillator"
    t.integer "voice1_volume"
    t.integer "voice1_portamento"
    t.float "voice1_attack"
    t.float "voice1_decay"
    t.float "voice1_sustain"
    t.float "voice1_release"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.integer "age"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
