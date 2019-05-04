class ChangeColumnDosesMgToString < ActiveRecord::Migration[5.2]
  def change
    change_column :pills, :mg, :string
  end
end
