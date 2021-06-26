export const nameValidation = (name) => {
    if (name.length == 0) return "שדה נדרש";
    if (name.length == 1) return "שם קצר מידי";
    if (name.length > 30) return "שם ארוך מידי";
    return "";
};

export const resturantAddressValidation = (resturantAddress) => {
    if (resturantAddress.length == 0) return "שדה נדרש";
    if (resturantAddress.length > 25) return "כתובת ארוכה מידי";
    if (/[^\u0590-\u05FF 0-9/]/.test(resturantAddress)) return "כתובת לא תקינה";
    return "";
};

export const EmailAddressValidation = (EmailAddress) => {
    if (EmailAddress.length == 0) return "שדה נדרש";
    if (EmailAddress.length > 25) return "כתובת מייל ארוכה מידי";
    if (!/^[.a-zA-Z0-9]+@[.a-zA-Z0-9]+$/.test(EmailAddress))
        return "כתובת מייל לא תקינה";
    return "";
};

export const phoneNumberValidation = (phoneNumber) => {
    if (phoneNumber.length == 0) return "שדה נדרש";
    if (!/^[0-9]{9,10}$/.test(phoneNumber)) return "מספר טלפון לא תקין";
    return "";
};

export const passwordPowerAndValidation = (password) => {
    //validate the password
    if (password.length == 0) return { message: "שדה נדרש", color: "red" };
    if (!/^[\u0590-\u05FFa-zA-Z0-9!@#^$%&\/=?_.,*:;\\-]+$/.test(password))
        return {
            message:
                "הסיסמא יכולה לכלול רק אותיות בעברית או באנגלית, ספרות או סימנים מיוחדים",
            color: "red",
        };
    if (password.length < 6)
        return { message: "הסיסמא צריכה להכיל לפחות 6 תוים", color: "red" };

    //check the power of the password
    //check if it a very weak password
    if (/^[0-9]+$/.test(password)) {
        for (let i = 0; i < password.length - 2; i++) {
            if (Number(password[i]) == Number(password[i + 1]) + 1) {
                if (Number(password[i + 1]) == Number(password[i + 2]) + 1)
                    return { message: "סיסמא חלשה מאד", color: "orangered" };
            }
            if (Number(password[i]) == Number(password[i + 1]) - 1) {
                if (Number(password[i + 1]) == Number(password[i + 2]) - 1)
                    return { message: "סיסמא חלשה מאד", color: "orangered" };
            }
        }
    }

    //check if it a weak password
    if (/((^[0-9]+$)|(^[a-z]+$|^[A-Z]+$)|(^[\u0590-\u05FF]+$))/.test(password))
        return { message: "סיסמא חלשה", color: "orange" };

    //check if it a enough password
    if (
        /((^[a-zA-Z]+$)|(^[a-z0-9]+$)|(^[a-z!@^#$*%&\/=?_.,:;\\-]+$)|(^[a-z\u0590-\u05FF]+$)|(^[A-Z0-9]+$)|(^[A-Z!@#^*$%&\/=?_.,:;\\-]+$)|(^[A-Z\u0590-\u05FF]+$)|(^[0-9^!@#$*%&\/=?_.,:;\\-]+$)|(^[0-9\u0590-\u05FF]+$)|(^[!@#$^%*&\/=?_.,:;\\-\u0590-\u05FF]+$))/.test(
            password
        )
    )
        return { message: "סיסמא מספקת", color: "lemonchiffon" };

    //check if it a very strong password
    if (password.length >= 8 && /[!@#$%*^&\/=?_.,:;\\-]/.test(password))
        return { message: "סיסמא חזקה מאד", color: "yellowgreen" };

    //else it must be a strong password
    return { message: "סיסמא חזקה", color: "lightgreen" };
};

export const confirmPasswordValidation = (confirmPassword) => {
    if (confirmPassword.length == 0) return "שדה נדרש";
    return "";
};

export const shippingCostValidation = (shippingCost) => {
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

export const typeValidation = (type) => {
    if (type.length == 0) return "שדה נדרש";
    if (/[^\u0590-\u05FF ]/.test(type))
        return "סוג המסעדה יכול להכיל אותיות בעברית בלבד";
    if (type.length == 1) return "סוג המסעדה קצר מידי";
    if (type.length > 20) return "סוג המסעדה ארוך מידי";
    return "";
};

export const accountNumberValidation = (accountNumber) => {
    if (accountNumber.length == 0) return "שדה נדרש";
    if (/[^0-9]/.test(accountNumber)) return "מספר חשבון שגוי";
    if (accountNumber.length > 13) return "מספר חשבון שגוי";
    return "";
};

export const streetNumberValidation = (number) => {
    if (number.length == 0) return "שדה נדרש";
    if (number.length > 5) return "מספר בית שגוי";
    if (/[^0-9]/.test(number) || number[0] == 0) return "מספר בית שגוי";
    if (number <= 0) return "מספר בית שגוי";
    return "";
};

export const courseNameValidation = (name) => {
    if (name.length == 0) return "שדה נדרש";
    if (/[^\u0590-\u05FF ]/.test(name)) return "שם המנה נדרש להיות בעברית בלבד";
    if (name.length > 35) return "שם ארוך מידי";
    if (name.length < 2) return "שם קצר מידי";
    return "";
};

export const coursePriceValidation = (price) => {
    if (price.length == 0) return "שדה נדרש";
    if (/[^0-9]/.test(price) || price[0] == 0) return "מחיר שגוי";
    if (price.length > 5) return "מחיר גבוה מידי";
    return "";
};
