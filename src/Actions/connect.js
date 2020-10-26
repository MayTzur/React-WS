import { firestore } from "../firebase";
const managersRef = firestore.collection("/managers");

const checkMember = async (values) => {
    console.log("*** checkMember function! ***");

    try{
        let obj = {
            confirmed: false,
            status: 0
        }
        await managersRef.get().then((snap) => {
            snap.forEach((doc) => {
                
                if(doc.data().email === values.email && doc.data().password == parseInt(values.password)){
                    obj = {
                        confirmed: true,
                        status: doc.data().status,
                        name: doc.data().name
                    }         
                }              
            })                       
        })
        return obj;     
    }catch(err){
        console.log('err inside "checkMember" function=', err);
    }    
}

const searchMember = async (values) => {
    console.log("*** checkMember function! ***");

    try{
        let password = true;
        let email = true;

        await managersRef.get().then((snap) => {
            snap.forEach((doc) => {
                if(doc.data().email === values.email){
                    email = false;
                }  

                if(doc.data().password === values.password){
                    password = false;
                }              
            })                       
        })
        return {
            password: password,
            email: email
        };     
    }catch(err){
        console.log('err inside "checkMember" function=', err);
    }    
}

export { checkMember, searchMember };