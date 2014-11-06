class AddPrjctIdFieldInProjects < ActiveRecord::Migration
  def up
  	add_column :projects, :prjct_id, :string
  end

  def down
  	remove_column :projects, :prjct_id, :string
  end
end
