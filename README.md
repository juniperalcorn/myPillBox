# myPillBox

myPillBox is a digital pill box and daily medication organizer app built in React and Ruby on Rails, with HTML, CSS, JS, and 
PostgreSQL, with custom bycrypt auth.

## About
If you take many medications a day, or multiple doses of the same prescription, it can sometimes be confusing to set up daily or
weekly pill boxes. If you or a caretaker have prepared pill boxes in advance, but a prescription changes mid-week, it can be
difficult to figure out what needs to change.

At a glance, myPillBox provides the time of day and intuitive navigation to a list of the pills you should be taking at which 
time of day, or a complete list of the doses assocated with a particular prescription.

Users can add a prescription to myPillBox using a dropdown selection menu, and inputting the doses for different times of day. 
Users can then view their Morning, Noon, Evening, and Bed boxes, with a complete list of medications and doses for that time. 
From there a user can click on any dose to view a single pill and all its associated doses, or to update or delete that
prescription.

## Set-up
myPillBox is deployed to [Heroku](http://pill-organizer-ja.herokuapp.com/pills) on the backend and [Surge](http://mypillbox.surge.sh/) on the frontend.

## ERD
View myPillBox's [ERD](https://drive.google.com/file/d/1QdyqI9vpnDTiUgplUFALovA1FuRo3XyY/view?ts=5cce2692).

## Wireframes
View myPillBox's [wireframes](https://drive.google.com/file/d/1_DSxFVCjLo_xqGmO6mS8S5P8jAsbdvYr/view?usp=sharing).

## Code snippet
This is a selection of code from the doses controller, the function for creating a dose, or a new prescription for the pillbox.
```    def create
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
  end```
