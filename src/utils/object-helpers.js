export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {

    return items.map(user => {
        if (user[objPropName] === itemId) {
            return {...user, ...newObjProps};
        } else return user;
    })
};
