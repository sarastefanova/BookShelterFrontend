import axios from '../cutom-axios/axios'
import qs from 'qs'


const BookService={
    getAllBooks:()=>{
        return axios.get("/books");
    },
    addNewBook:(book)=>{

        const formParams = qs.stringify(book);
        return axios.post("/books",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },fetchBooksTermsPaged:(page,pageSize)=>{
        return axios.get("/books",{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    }
    ,
    addNewBookWithImg:(book)=>{

        //const formParams = qs.stringify(book);
       console.log(book);
        return axios.post("/books/upload",book, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },
    deleteBookTerm:(id)=>{
        return axios.delete(`/books/${id}`)
    }
    ,
    updateBookTerm : (book) => {

        const bookId=book.id;
        const formParams = qs.stringify(bookId);
        return axios.patch("/books/"+bookId,formParams, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }
}
export default BookService;