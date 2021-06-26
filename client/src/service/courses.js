export const deleteCourse = async (resId, courseId) => {
    let res = await fetch(
        "http://localhost:4030/resturants-details/deleteCourse/" + resId,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                courseId: courseId,
            }),
        }
    );
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
};

export const editCourse = async (resId, newCourseData) => {
    let res = await fetch(
        "http://localhost:4030/resturants-details/editCourse/" + resId,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourseData),
        }
    );
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
};

export const addCourse = async (resId, newCourseData) => {
    let res = await fetch(
        "http://localhost:4030/resturants-details/addCourse/" + resId,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newCourseData),
        }
    );
    if (!res.ok) {
        let err = await res.json();
        console.log(res.status, err.error);
    }
};
