# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_06_201307) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "doses", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "pill_id"
    t.string "am_dose"
    t.string "mid_dose"
    t.string "pm_dose"
    t.string "bed_dose"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["pill_id"], name: "index_doses_on_pill_id"
    t.index ["user_id"], name: "index_doses_on_user_id"
  end

  create_table "pills", force: :cascade do |t|
    t.string "name"
    t.string "img"
    t.string "mg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "doses", "pills"
  add_foreign_key "doses", "users"
end
