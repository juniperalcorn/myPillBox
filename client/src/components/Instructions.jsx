import React from 'react';
import {withRouter} from 'react-router'

const Instructions = (props) => {

  return (
    <div className="instructions">
    
        <div className='instructions-content'>

            <h2 className='instructions-title'>About <span className='instructions-title-logo'>myPillBox</span></h2>
            {/* <p>myPillBox is a digital pill box and daily medication organizer app.</p> */}
        
            <p><span className='instructions-logo'>myPillBox</span> provides a digital representation of the contents of your pill box, a master list of what you need to take and when.</p> 

            <p>If you take many medications a day, or multiple doses of the same prescription, it can sometimes be confusing to set up daily or weekly pill boxes. If you or a caretaker have prepared pill boxes in advance, but a prescription changes mid-week, it can be difficult to figure out what needs to change.</p>
            
            <p>At a glance, <span className='instructions-logo'>myPillBox</span> provides the time of day and intuitive navigation to a list of the pills you should be taking at which time of day, or a complete list of the doses assocated with a particular prescription.</p>
        </div>

        <div className='instructions-content'>
            <h2 className='instructions-title'>How To Use <span className='instructions-title-logo'>myPillBox</span></h2>

            <p>Click on <span className='highlight'>Pillbox</span> anytime to return to the home page.</p>

            <p>On the <span className='highlight'>home page</span>, users can view <span className='instructions-logo'>myPillBox</span>, with segments for Morning, Midday, Evening, and Bedtime medications.</p>

            <p>To add a new pill, click on the <span className='highlight'>"Add a New Pill"</span> button at the top of the page. Choose a pill/dosage from the drop down menu, and enter the number of pills you should take for each time of day. If you don't take any pills, don't enter a number. Click <span className='highlight'>"Submit"</span> to save the pill information.</p>

            <p>Click on the pillbox time-of-day sections to see a list of the pills you should take, with images. Click on any pill listed to view the complete dosing schedule for that pill.</p>

            <p>From the individual pill view, click on <span className='highlight'>"Update"</span> to update your doses for that pill, or to delete that pill from myPillBox.</p>
        </div>
    </div>
  );
}

export default withRouter(Instructions);