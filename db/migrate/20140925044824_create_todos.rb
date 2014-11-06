class CreateTodos < ActiveRecord::Migration
  def change
    create_table :todos do |t|
      t.integer :project_id
      t.string :todo_thread
      t.integer :user_id

      t.timestamps
    end
  end
end
