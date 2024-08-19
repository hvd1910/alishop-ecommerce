export function calculateAverageRating(comments) {
    if (Array.isArray(comments) && comments.length > 0) {
        // Bước 1: Lấy tất cả các giá trị của cột rating từ mảng comment
        const ratings = comments.map(comment => comment.rating);

        // Bước 2: Cộng tất cả các giá trị rating lại
        const totalRating = ratings.reduce((sum, rating) => sum + rating, 0);

        // Bước 3: Tính trung bình rating
        const averageRating = totalRating / comments.length;

        return Math.floor(averageRating);
    } else {
        // Trường hợp mảng comments không phải là mảng hoặc rỗng
        return 0;
    }
}



export function calculatestock(product_details) {
    
    if(  Array.isArray(product_details)) {
 // Bước 1: Lấy tất cả các giá trị của cột rating từ mảng comment
    const stock = product_details.map(product_detail => product_detail.qty);
    
 // Bước 2: Cộng tất cả các giá trị rating lại
    const totalStock = stock.reduce((sum, qty) => sum + qty, 0);
    return totalStock;
    }
   
   
}




