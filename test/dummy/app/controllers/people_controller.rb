class PeopleController < ApplicationController
  def index
    @people = Person.all

    render layout: false
  end
end
