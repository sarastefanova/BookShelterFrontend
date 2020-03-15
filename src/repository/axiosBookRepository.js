import axios from '../cutom-axios/axios'
import qs from 'qs'


const BookService={
    getAllBooks:()=>{
        return axios.get("/books");
    },
    getAllBooksNewest:()=>{
        return axios.get("/books/getNewestBooks");
    },

    addNewBook:(book)=>{

        const formParams = qs.stringify(book);
        return axios.post("/books",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },fetchBooksTermsPaged:(page,pageSize,id)=>{
       // debugger;
        if(id===0){
            return axios.get("/books?id="+id,{
                headers: {
                    'page':page,'page-size':pageSize
                }
            })
        }else{
            return axios.get("/books?id="+id,{
                headers: {
                    'page':page,'page-size':pageSize
                }
            })
        }

    },
    fetchBooksTermsPagedUser:(page,pageSize,id)=>{
        //debugger;
        return axios.get("/books/getAllBooksUser?id="+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
},
    fetchBooksTermsPagedFavouriteBookUser:(page,pageSize,id)=>{
        debugger;
        return axios.get("/books/getAllBooksAuthorFavourite/"+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
    },
    searchBookByNamePage:(search,pageSize,id)=>{
        return axios.get("/books/searchBookPage?name="+search+"&id="+id,{
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