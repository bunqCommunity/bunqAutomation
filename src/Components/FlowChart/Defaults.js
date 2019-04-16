export const standardNodeStyles = {
    position: "absolute",
    borderRadius: 10
};

export const getSelectedStyle = isSelected => {
    return isSelected
        ? {
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 10px 20px"
          }
        : {};
};

export const standardLeftPort = id =>
    Object.assign(
        {},
        {
            id: id,
            type: "left",
            properties: {
                icon: "arrow-left"
            }
        }
    );

export const standardRightPort = id =>
    Object.assign(
        {},
        {
            id: id,
            type: "right",
            properties: {
                icon: "arrow-right"
            }
        }
    );
