class Project < ActiveRecord::Base
  attr_accessible :description, :name, :user_id, :prjct_id, :photo
	belongs_to :user
	has_many :tasks

	has_attached_file :photo, :styles => 
           { :medium => "300x300>", :thumb => "100x100>" }
end
