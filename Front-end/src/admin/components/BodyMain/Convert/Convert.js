import { parse, format } from 'date-fns';


export const ConvertDateTime= (dateArray) =>{
    if (!Array.isArray(dateArray)) {
        return null
    }
    let [year, month, day, hours, minutes, seconds] = dateArray;

    // Chuyển đổi các giá trị thành chuỗi với độ dài cố định
    month = String(month).padStart(2, '0');
    day = String(day).padStart(2, '0');
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');

    // Kết hợp các giá trị vào chuỗi theo định dạng yyyy-MM-dd'T'HH:mm:ss
    let formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return formattedDateTime;
}


export const ConvertDate = (dateArray) => {
    if (!Array.isArray(dateArray)) {
        return null
    }
    //định dạng dateArray = [2024, 6, 13];

    // Tạo đối tượng Date từ mảng ngày
    let date_obj = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    
    // Lấy ngày, tháng, năm từ đối tượng Date
    let day = date_obj.getDate().toString().padStart(2, '0');
    let month = (date_obj.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    let year = date_obj.getFullYear().toString(); // Lấy 2 số cuối của năm

    // Định dạng lại ngày
    let formatted_date = `${day}/${month}/${year}`;
    
    return formatted_date;
}


export const formatNumber = (number) => {
    return number.toLocaleString('de-DE', { minimumFractionDigits: 0 });
}



export function convertDateFormat(dateStr) {
    try {
      const parsedDate = parse(dateStr, 'dd-MM-yyyy', new Date());
      const newFormattedDate = format(parsedDate, 'yyyy-MM-dd');
      return newFormattedDate;
    } catch (error) {
      return 'Invalid date format';
    }
  }


  export function formatDatePut(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}