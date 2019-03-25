The action is the main component which will contain the configuration. 

All filters, outputs and schedules are simply wrappers for pre-defined configurations within an action

#### Action
An action can be anything but has access to certain pre-defind options contained in the filters, schedules and outputs.

#### Filter
Each filter has a type to identify whether it is use-able by an Action. For example an `EVENT` filter should not show up as an option for a monthly invoice action.

A filter simply returns true or false for one given item/event. Checking if a monetary account is listed, if specific fields are matching a value or if a minimum amount is reached.

If no filters are set for an action, it will run on every event for the given Action type. If the Action type is EVENT, it will run every time a new event is sent through the pipeline for example.

#### Schedule
When each action should be checked and triggered. A daily schedule will run every day at 23:59 and any events that happened since the last run will be included.

The default is instant, where an incoming event will be handled as soon as it is received in the pipeline.

#### Output
Outputs are the final result after the events have been filtered out and scheduled.

An output can be anything but common outputs will be Payments (single or batched), Draft payments and Notifications/Emails.
