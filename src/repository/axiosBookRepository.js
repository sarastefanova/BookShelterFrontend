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
    },
    // fetchBooksTermsPagedFavouriteBookUser:(page,pageSize)=>{
    //     return axios.get("/books/getAllBooksAuthorFavourite",{
    //         headers: {
    //             'page':page,'page-size':pageSize
    //         }
    //     })
    // },
    searchBookByNamePage:(search,pageSize)=>{
        return axios.get("/books/searchBookPage?name="+search,{
            headers: {
                'page':0,'page-size':pageSize
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
    deleteBook:(id)=>{
        return axios.delete(`/books/${id}`)
    }
    ,
    updateBook : (book) => {

        const bookId=book.name;
        const formParams = qs.stringify(book);
        console.log(book.name)
        return axios.patch("/books/"+bookId,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    searchBookByName: (search,pageSize) => {

        return axios.get(`/books/searchBook?name=${search}`);
    }
}
export default BookService;