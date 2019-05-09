class DosesController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_dose, only: [:show, :destroy]
#   before_action :authenticate_user, only: [:update]

  # GET /doses
  def index
    @dose = Dose.all

    render json: @dose, include: :pill
  end

  # GET /doses/1
  def show
    # render json: @dose, include: :pill

    @user = User.find(params[:user_id])
    render json: @user.doses, include: :pill
  end

  # POST /doses
  def create
    if params[:user_id]
      @dose = Dose.new(dose_params)
      @user = User.find(params[:user_id])
      @user.doses << @dose
      if @dose.save
        render json: @dose
      else
        render json: @dose.errors, status: :unprocessable_entity
      end
    elsif params[:id]
      @dose = Dose.new(dose_params)
      if @dose.save
        render json: @user, include: :doses
      else
        render json: @dose.errors, status: :unprocessable_entity
      end
    else
      render json: @dose.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /dose/1
  def update
    if params[:user_id]
      @user = User.find(params[:user_id])
      @dose = Dose.find(params[:id])
      @dose.update(dose_params)
      render json: @user, include: :doses
    elsif params[:id]
      @dose = Dose.find(params[:id])
      @dose.update(dose_params)
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
      params.require(:dose).permit(:pill_id, :am_dose, :mid_dose, :pm_dose, :bed_dose)
    end
end
