import axios from '../cutom-axios/axios'
import qs from 'qs'

const AuthorService={
    getAllAuthors:()=>{
        return axios.get("/author");
    },
    addNewAuthor:(author)=>{

        const formParams = qs.stringify(author);
        return axios.post("/author",formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    },
    deleteAuthorTerm:(id)=>{
        return axios.delete(`/author/${id}`)
    }
    ,
    updateAuthorTerm : (author) => {

        const authorId=author.id;
        const formParams = qs.stringify(author);
        return axios.patch("/author/"+authorId,formParams, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
    }
}
export default AuthorService;