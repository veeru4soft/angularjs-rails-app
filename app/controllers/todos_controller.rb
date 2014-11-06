class TodosController < ApplicationController
  # GET /todos
  # GET /todos.json

  before_filter :authenticate_user!
  respond_to :json

  def index
    @todos = Todo.all
    respond_with(@todos)
  end

  # GET /todos/1
  # GET /todos/1.json
  def show
    @todo = Todo.find(params[:id])

    respond_with(@todo)
  end

  # POST /todos
  # POST /todos.json
  def create
    puts "$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"
    puts params.inspect

    @todo = Todo.new(params[:todo])
		@todo.todo_thread = params[:name]
    @todo.save
    respond_with(@todo)
  end

  # PUT /todos/1
  # PUT /todos/1.json
  def update
    @todo = Todo.find(params[:id])

    respond_to do |format|
      if @todo.update_attributes(params[:todo])
        format.html { redirect_to @todo, notice: 'Todo was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @todo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    @todo = Todo.find(params[:id])
    @todo.destroy

    respond_to do |format|
      format.html { redirect_to todos_url }
      format.json { head :no_content }
    end
  end

  def assigned_todos
      @todos = current_user.todos.includes(:comments)
      respond_with(@todos)
  end
end
