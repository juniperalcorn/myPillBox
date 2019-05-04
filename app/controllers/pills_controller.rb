class PillsController < ApplicationController
    before_action :set_pill, only: [:show, :update, :destroy]

    # GET /pills
  def index
    @pills = Pill.all

    render json: @pills
  end

  # GET /pills/1
  def show
    render json: @pill
    # render json: @pill, include: :???
  end

  # POST /pills
  def create
    @pill = Pill.new(pill_params)

    if @pill.save
      render json: @pill, status: :created, location: @pill
    else
      render json: @pill.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /pills/1
  def update
    if @pill.update(pill_params)
      render json: @pill
    else
      render json: @pill.errors, status: :unprocessable_entity
    end
  end

  # DELETE /pills/1
  def destroy
    @pill.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_pill
      @pill = Pill.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def pill_params
      params.require(:pill).permit(:name, :mg)
    end

end
