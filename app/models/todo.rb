class Todo < ActiveRecord::Base
  attr_accessible :project_id, :todo_thread, :user_id
	has_many :comments
end
