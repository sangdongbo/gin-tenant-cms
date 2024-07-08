const handleFormLibraryValues = (formList: any[]) => {
    return formList.map(item => {
        if (!item.id) {
            if (!item.type) {
                delete item.name;
            };
            delete item.type;
        }
        delete item.contacts_field_name;
        return item;
    });
};

export default handleFormLibraryValues;
