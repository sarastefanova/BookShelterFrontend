import axios from '../cutom-axios/axios'
import qs from 'qs'

const AuthorService={
    getAllAuthors:()=>{
        return axios.get("/author");
    },
    fetchAuthorsTermsPaged:(page,pageSize)=>{
    return axios.get("/author/allAuthorsPaginate",{
        headers: {
            'page':page,'page-size':pageSize
        }
    })
},
    addNewAuthor:(author)=>{

        const formParams = qs.stringify(author);
        return axios.post("/author",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    addNewAuthorWithImg:(author)=>{
        return axios.post("/author/addAuthor",author, {
            headers: {
                'Content-Type': 'multipart/form-data; boundary=${form._boundary}'
            }
        });
    }
    ,
    deleteAuthor(nameAndSurname,isDeleted){
        return axios.delete("/author/delete/"+nameAndSurname+"?isDeleted="+isDeleted);
    },

    updateAuthorTerm : (author) => {

        const authorId=author.nameAndSurname;
        const formParams = qs.stringify(author);
        return axios.patch("/author/"+authorId,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    },

    getAuthorById: (nameAndSurname) => {
        return  axios.get("/author?nameAndSurname="+nameAndSurname);
    }
};
export default AuthorService;