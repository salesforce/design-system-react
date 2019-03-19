import React from 'react';
import ActivityTimeline from '~/components/activity-timeline';
import Activity from '~/components/activity-timeline/activity';


class Example extends React.Component {
	render() {
		return (
			<ActivityTimeline>
				<Activity
					type="task"
					title={<a href="javascript:void(0);"><strong>Review proposals for EBC deck with larger team and have marketing review this</strong></a>}
					action={<span><a href="javascript:void(0);">You</a> created a task with <a href="javascript:void(0);">Charlie Gomez</a></span>}
					time="9:00am | 3/20/17"
					name={<a href="javascript:void(0);">Charlie Gomez</a>}
					related={<a href="javascript:void(0);">Tesla Cloudhub + Anypoint Connectors</a>}
					description="Adam seemed interested in closing this deal quickly! Let’s move."
					isRecurring
				/>
				<Activity
					type="call"
					title={<a href="javascript:void(0);"><strong>Mobile conversation on Monday</strong></a>}
					action={<span><a href="javascript:void(0);">You</a> logged a call with <a href="javascript:void(0);">Adam Chan</a></span>}
					time="10:00am | 3/23/17"
					name={<a href="javascript:void(0);">Adam Chan</a>}
					related={<a href="javascript:void(0);">Tesla Cloudhub + Anypoint Connectors</a>}
					description="Adam seemed interested in closing this deal quickly! Let’s move."
				/>
				<Activity
					type="email"
					title={<a href="javascript:void(0);"><strong>Re: Mobile conversation on Monday with the new global team</strong></a>}
					action={<span><a href="javascript:void(0);">You</a> emailed <a href="javascript:void(0);">Lea Chan</a></span>}
					time="10:00am | 3/24/17"
					sender={<a href="javascript:void(0);">Jackie Dewar</a>}
					recipient={<a href="javascript:void(0);">Lea Chan</a>}
					description="Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed."
					groupEmail
					hasAttachment
				/>
				<Activity
					type="event"
					title={<a href="javascript:void(0);"><strong>EBC Follow up call</strong></a>}
					action={<span><a href="javascript:void(0);">You</a> created an event with <a href="javascript:void(0);">Aida Lee</a> and 5 others</span>}
					time="10:30am | 3/24/17"
					location={<a href="javascript:void(0);">Westen St. Francis, San Francisco, CA, 94622</a>}
					attendees={<a href="javascript:void(0);">Jason Dewar (Organizer) + 5 others</a>}
					when={<a href="javascript:void(0);">March 26, 10:00 AM - 11:00 AM</a>}
					description="Let's discuss the 2017 product roadmap and address any questions"
				/>
			</ActivityTimeline>
		);
	}
}

Example.displayName = 'ActivityTimelineDefault';

export default Example; // export is replaced with `ReactDOM.render(<Example />, mountNode);` at runtime
