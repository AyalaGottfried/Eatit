(function (exports) {
    exports.EmailAddressValidation = (EmailAddress) => {
        if (EmailAddress.length == 0) return "שדה נדרש";
        if (EmailAddress.length > 25) return "כתובת מייל ארוכה מידי";
        if (!/^[.a-zA-Z0-9]+@[.a-zA-Z0-9]+$/.test(EmailAddress))
            return "כתובת מייל לא תקינה";
        return "";
    };

    exports.nameValidation = (name) => {
        if (name.length == 0) return "שדה נדרש";
        if (name.length == 1) return "שם קצר מידי";
        if (name.length > 30) return "שם ארוך מידי";
        return "";
    };

    exports.passwordValidation = (password) => {
        if (password.length == 0) return { message: "שדה נדרש", color: "red" };
        if (!/^[\u0590-\u05FFa-zA-Z0-9!@#^$%&\/=?_.,*:;\\-]+$/.test(password))
            return {
                message:
                    "הסיסמא יכולה לכלול רק אותיות בעברית או באנגלית, ספרות או סימנים מיוחדים",
                color: "red",
            };
        if (password.length < 6)
            return { message: "הסיסמא צריכה להכיל לפחות 6 תוים", color: "red" };
        return "";
    };

    exports.shippingCostValidation = (shippingCost) => {
        if (shippingCost.length == 0) return "שדה נדרש";
        if (
            /[^0-9]/.test(shippingCost) ||
            (shippingCost[0] == 0 && shippingCost != "0")
        )
            return "עלות שגויה";
        if (shippingCost < 0) return "עלות שלילית";
        if (shippingCost > 100) return "עלות גבוהה מידי";
        return "";
    };

    exports.typeValidation = (type) => {
        if (type.length == 0) return "שדה נדרש";
        if (/[^\u0590-\u05FF ]/.test(type))
            return "סוג המסעדה יכול להכיל אותיות בעברית בלבד";
        if (type.length == 1) return "סוג המסעדה קצר מידי";
        if (type.length > 20) return "סוג המסעדה ארוך מידי";
        return "";
    };

    exports.phoneNumberValidation = (phoneNumber) => {
        if (phoneNumber.length == 0) return "שדה נדרש";
        if (!/^[0-9]{9,10}$/.test(phoneNumber)) return "מספר טלפון לא תקין";
        return "";
    };

    exports.resturantAddressValidation = (resturantAddress) => {
        if (resturantAddress.length == 0) return "שדה נדרש";
        if (resturantAddress.length > 25) return "כתובת ארוכה מידי";
        if (/[^\u0590-\u05FF 0-9",'*)(\\./]/.test(resturantAddress))
            return "כתובת לא תקינה";
        return "";
    };

    exports.courseNameValidation = (name) => {
        if (name.length == 0) return "שדה נדרש";
        if (/[^\u0590-\u05FF ]/.test(name))
            return "שם המנה נדרש להיות בעברית בלבד";
        if (name.length > 35) return "שם ארוך מידי";
        if (name.length < 2) return "שם קצר מידי";
        return "";
    };

    exports.coursePriceValidation = (price) => {
        if (price.length == 0) return "שדה נדרש";
        if (/[^0-9]/.test(price) || price[0] == 0) return "מחיר שגוי";
        if (price.length > 5) return "מחיר גבוה מידי";
        return "";
    };

    exports.cartValidation = (cart) => {
        if (
            typeof cart !== "object" ||
            !Object.keys(cart).every(
                (resId) =>
                    !isNaN(resId) &&
                    resId >= 0 &&
                    Object.keys(cart[resId]).every(
                        (key) =>
                            !isNaN(key) &&
                            key >= 0 &&
                            !isNaN(cart[resId][key]) &&
                            cart[resId][key] >= 0
                    )
            )
        )
            return "invalid cart";
        return "";
    };

    exports.orderStatusValidation = (status) => {
        if (status in ["ordered", "packeded", "sent", "finished"])
            return "invalid status";
        return "";
    };

    exports.orderAddressValidation = (address) => {
        let addressProperties = ["name", "phone", "address"];
        if (
            typeof address !== "object" ||
            !Object.keys(address).every((x) => addressProperties.includes(x)) ||
            !addressProperties.every((x) => address.hasOwnProperty(x)) ||
            exports.resturantAddressValidation(address.address) != "" ||
            exports.nameValidation(address.name) != "" ||
            exports.phoneNumberValidation(address.phone) != ""
        )
            return "invalid address";
        return "";
    };

    exports.coursesValidation = (courses) => {
        const courseProperties = ["name", "price", "image"];
        if (typeof courses !== "object") return "invalid courses";
        if (
            !courses.every(
                (course) =>
                    Object.keys(course).every((key) =>
                        courseProperties.includes(key)
                    ) &&
                    courseProperties.every((x) => course.hasOwnProperty(x)) &&
                    this.courseNameValidation(course.name) != "" &&
                    this.coursePriceValidation(course.price) != ""
            )
        )
            return "invalid courses";
        return "";
    };
})(typeof exports === "undefined" ? (this.share = {}) : exports);
