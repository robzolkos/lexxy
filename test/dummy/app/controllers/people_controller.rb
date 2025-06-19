class PeopleController < ApplicationController
  def index
    @people = Person.all

    if params[:filter].present?
      @people = @people.where("name LIKE ?", "%#{params[:filter]}%")
    end

    render layout: false
  end
end
