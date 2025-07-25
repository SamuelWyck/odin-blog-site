import {format} from "date-fns";



function readableDate(date) {
    const formatString = "MMM dd yyyy";
    return format(date, formatString);
};



export default readableDate;