const getUser = () => {
    const courseUser = sessionStorage.getItem('userId');
    if(courseUser){
        return courseUser;
    }
    else{
        const newUser = 'user-'+ new Date().getTime();
        sessionStorage.setItem('userId', newUser);
        return newUser;
    }
}


const setDataKey = () => {
    const user = getUser();
    return `course/app/${user}`
}

export const getFromDataBase = () => {
    const key = setDataKey();
    const data = localStorage.getItem(key) || '{}';
    return JSON.parse(data);

}

export const addToDataBase = (key, count) => {
    const currentCourse = getFromDataBase();;
    currentCourse[key] = count;
    localStorage.setItem(setDataKey(), JSON.stringify(currentCourse));
}

export const deleteFromDataBase = (key) => {
    const currentCourse = getFromDataBase();
    delete currentCourse[key]
    localStorage.setItem(setDataKey(), JSON.stringify(currentCourse) )
}