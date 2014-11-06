class Comment < ActiveRecord::Base
  attr_accessible :comment, :post_id, :todo_id
  belongs_to :post
	belongs_to :todo
end
