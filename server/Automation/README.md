The action is the main component which will contain the configuration. 

All filters, outputs and schedules are simply wrappers for pre-defined configurations.

 - Action: a pre-defined action,
    - Schedule: 
      The outputs for this action are triggered based on the schedule. The schedule does things like waiting to the end of the day to send a single batch payment instead of instantly sending single payments.
    - Filter[]: 
      One or more filters, not all actions require a filter
        - Output[]: 
          One or more outputs based on the action
            - Schedule: each output has a schedule: 
               

#### Action
#### Filter
Each filter has a type to identify whether it is use-able by an Action. For example an `EVENT` filter should not show up as an option for a monthly invoice action.

A filter simply returns true or false for one given item/event. Checking if a monetary account is listed, if specific fields are matching a value or if a minimum amount is reached.

#### Schedule

#### Output
Outputs are the final result after the events have been filtered out and scheduled.

An output can be anything but common outputs will be Payments (single or batched), Draft payments and Notifications/Emails.
