import axios from '../cutom-axios/axios'
import qs from 'qs'


const BookService={

    getAllBooksNewest:()=>{
        return axios.get("/books/getNewestBooks");
    },

    fetchBooksTermsPaged:(page,pageSize,id)=>{

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

        return axios.get("/books/getAllBooksUser?id="+id,{
            headers: {
                'page':page,'page-size':pageSize
            }
        })
},

    searchBookByNamePage:(search,pageSize,id, page)=>{
        return axios.get("/books/searchBookPage?name="+search+"&id="+id,{
            headers: {
                'page':page, 'page-size':pageSize
            }
        })
    },

    addNewBookWithImg:(book)=>{
        return axios.post("/books/uploadBook",book, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    },

    deleteBook:(id)=>{
        return axios.delete(`/books/${id}`)
    },

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

    getAuthorBook:(bookName)=>{
        return axios.get("/books/"+bookName+"/authorBook");
    },

    getAllBooksByAuthor: (nameAndSurname) => {
        return axios.get("/books/getAllBooksByAuthor/"+nameAndSurname);
    },

    getBookById: (name) => {
        return axios.get("/books?name="+name);
    }
};
export default BookService;