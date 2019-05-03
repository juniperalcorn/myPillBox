class CreateDosages < ActiveRecord::Migration[5.2]
  def change
    create_table :dosages do |t|
      t.references :user, foreign_key: true
      t.references :pill, foreign_key: true
      t.integer :am_dose
      t.integer :mid_dose
      t.integer :pm_dose
      t.integer :bed_dose

      t.timestamps
    end
  end
end
