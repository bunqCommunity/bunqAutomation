The action is the main component which will contain the configuration.

All filters, outputs and schedules are simply wrappers for pre-defined configurations within an action

#### Action

An action can be anything but has access to certain pre-defined options contained in the filters, schedules and outputs.

#### Filter

Each filter has a type to identify whether it is use-able by an Action. For example a `MUTATION` filter should not show up as an option for a monthly invoice action.

A filter simply returns true or false for one given item/event. Checking if a monetary account is listed, if specific fields are matching a value or if a minimum amount is reached.

If no filters are set for an action, it will run on every event for the given Action type. If the Action type is EVENT, it will run every time a new event is sent through the pipeline for example.

#### Output

Outputs are the final result after the events have been filtered out and scheduled.

An output can be anything but common outputs will be Payments (single or batched), Requests, Draft payments, Notifications and Emails.

#### Schedule

Each output has a Schedule. Any Schedule that isn't `INSTANT` will be stored in a store with the Output type. Every minute all stored outputs which are still pending are checked if they should be completed.

It is the Output's responsibility to store, update and delete any pending updates.

For example: This also means that a Output output with a DAILY schedule is responsible for collecting multiple pending payments and doing a single BatchPayment

#### Options

Options are key => type combinations to keep them somewhat generic and make the front-end components more re-usable.

A defaultOptions property can be used to set default values for each option.
