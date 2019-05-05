class CreatePills < ActiveRecord::Migration[5.2]
  def change
    create_table :pills do |t|
      t.string :name
      t.string :img
      t.integer :mg

      t.timestamps
    end
  end
end
