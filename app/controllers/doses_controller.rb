class DosesController < ApplicationController

  before_action :set_dose, only: [:show, :update, :destroy]
#   before_action :authenticate_user, only: [:update]

  # GET /doses
  def index
    @dose = Dose.all

    render json: @dose
  end

  # GET /doses/1
  def show
    render json: @dose, include :pills
  end

  # POST /doses
  def create
    @dose = Dose.new(dose_params)

    if @dose.save
      render json: @dose, status: :created, location: @dose
    else
      render json: @dose.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dose/1
  def update
    if params[:user_id]
      @user = User.find(params[:user_id])
      @user.doses<< @dose
      render json: @user, include: :doses
    elsif @dose.update(dose_params)
      render json: @dose
    else
      render json: @dose.errors, status: :unprocessable_entity
    end
  end

  # DELETE /dose/1
  def destroy
    @dose.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dose
      @dose = Dose.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def dose_params
      params.require(:dose).permit(:name, :am_dose, :mid_dose, :pm_dose, :bed_dose)
    end
end
