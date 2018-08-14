class Api::ItemsController < Api::BaseController
  before_action :find_item, only: %i[update destroy]

  def index
    items = Item.all
    render json: items
  end

  def create
    item = Item.new(item_params)
    if item.save
      render json: item, status: :created
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def update
    if @item.update(item_params)
      render json: @item
    else
      render json: item.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @item.destroy
    head :no_content
  end

  private

  def find_item
    @item = Item.find(params[:id])
  end

  def item_params
    params.require(:item).permit(:name, :price)
  end
end
