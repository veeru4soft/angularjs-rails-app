class ProjectsController < ApplicationController
  # GET /projects
  # GET /projects.json
	before_filter :authenticate_user!, :except => [:upload_image, :upload_image_from_ckeditor]

	respond_to :json 

  def index
    @projects = Project.includes(:tasks)
    respond_with(@projects)
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
    @project = Project.find(params[:id])
    respond_with(@project)
  end

  # POST /projects
  # POST /projects.json
  def create
		puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
		#puts params[:file][:name].inspect
    @project = Project.new(params[:project])
		@project.user_id = current_user.id
		@project.photo_file_name = params[:file][:name] 
		@project.photo_content_type = params[:file][:type]
		@project.photo_file_size = params[:file][:size]
		@project.photo_updated_at = Time.now
		@project.save
		respond_with(@project)
  end

  # PUT /projects/1
  # PUT /projects/1.json
  def update
    @project = Project.find(params[:id])

    respond_to do |format|
      if @project.update_attributes(params[:project])
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project = Project.find(params[:id])
    @project.destroy

    respond_to do |format|
      format.html { redirect_to projects_url }
      format.json { head :no_content }
    end
  end


	def upload_image
		name =  params[:file].original_filename
    directory = "public/data"
    # create the file path
    path1 = File.join(directory, name)
    if path1 =~ /^.*\.(jpg|png|gif|jpeg|JPG|PNG|GIF|JPEG|doc|docx||pdf|PDF)$/
		  # write the file
		   File.open(path1, "wb") { |f| f.write(params[:file].read) }
    else
    end
	end

	def upload_image_from_ckeditor
		puts "#############################################"
		puts params.inspect

		name =  params[:upload].original_filename
    directory = "public/data"
    # create the file path
    path1 = File.join(directory, name)
    if path1 =~ /^.*\.(jpg|png|gif|jpeg|JPG|PNG|GIF|JPEG|doc|docx||pdf|PDF)$/
		  # write the file
		   File.open(path1, "wb") { |f| f.write(params[:upload].read) }
    else
    end	
	end

  
end
