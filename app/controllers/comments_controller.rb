class CommentsController < ApplicationController
  # GET /comments
  # GET /comments.json
	before_filter :authenticate_user!
	
  respond_to :json
  def index
    puts params.inspect
    todo = Todo.find(params[:id])
    respond_with(@comments = todo.comments)
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
		@post = Post.find(params[:id])
		puts "########################################"
		puts @post.id
		puts @post.comments.size
    #@comment = Comment.find(params[:id])
    respond_with(@post.comments)
  end

  
  # POST /comments
  # POST /comments.json
  def create
		puts "########################################"
		puts params.inspect
		params[:comment] = params[:comment].gsub("\n","<br>")
    todo = Todo.find(params[:todo_id])
		puts todo.inspect
    @comment = todo.comments.new();
		@comment.comment = params[:comment]
    @comment.save
    respond_with(@comment)
  end

  # PUT /comments/1
  # PUT /comments/1.json
  def update
    @comment = Comment.find(params[:id])

    respond_to do |format|
      if @comment.update_attributes(params[:comment])
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    respond_to do |format|
      format.html { redirect_to comments_url }
      format.json { head :no_content }
    end
  end
end
