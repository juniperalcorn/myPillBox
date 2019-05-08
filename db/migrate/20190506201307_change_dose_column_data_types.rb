class ChangeDoseColumnDataTypes < ActiveRecord::Migration[5.2]
  def change
    change_column :doses, :am_dose, :string
    change_column :doses, :mid_dose, :string
    change_column :doses, :pm_dose, :string
    change_column :doses, :bed_dose, :string
  end
end
