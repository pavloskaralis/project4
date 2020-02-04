class AddImgToCandidates < ActiveRecord::Migration[6.0]
  def change
    add_column :candidates, :img, :string
  end
end
