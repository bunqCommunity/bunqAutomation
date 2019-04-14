export default object => ({
    id: object.id,
    description: object.description,
    disabled: object.disabled,
    options: object.options,
    type: object.type,
    filters: object.filters,
    outputs: object.outputs,
    schedule: object.schedule
});
