import { firestore, storage } from "../firebase";
const managersRef = firestore.collection("/managers");
const paintingsRef = firestore.collection("/paintings");
const imagesRef = storage.ref('Images');

const getImagesList = async () => {
    console.log("*** getImagesList function! ***");
    try{
        let data = [];
        await paintingsRef.get().then((snap) => {
            snap.forEach((doc) => {  
                data.push(doc.data().file);                        
            })                       
        })
        return data;     
    }catch(err){
        console.log('err inside "checkMember" function=', err);
    }    
}

const handleFireBaseUpload = async (imageAsFile) => {
    console.log("*** handleFireBaseUpload function! ***");
    try{
        if(imageAsFile === '') {
            console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
        } else{
            return await imagesRef.child(imageAsFile.name).getDownloadURL().then(fireBaseUrl => {
                return {
                    fireBaseUrl: fireBaseUrl,
                    exist: true
                };
            })                        
        }
    }
    catch(err){
        console.log('handleFireBaseUpload err=',err)
        if(err.code_ == 'storage/object-not-found'){
            await storage.ref(`/Images/${imageAsFile.name}`).put(imageAsFile);
            return await imagesRef.child(imageAsFile.name).getDownloadURL().then(fireBaseUrl => {
                return {
                    fireBaseUrl: fireBaseUrl,
                    exist: false
                };
            })  
        }
    }
}

const getManagersList = async () => {
    console.log("*** getManagersList function! ***");
    try{
        let data = [];
        await managersRef.get().then((snap) => {
            snap.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                data.push({
                    id: doc.id,
                    email: doc.data().email,
                    password: doc.data().password,
                    name: doc.data().name,
                    status: doc.data().status
                });                       
            })                       
        })
        console.log('data before return=', data);
        return data;     
    }catch(err){
        console.log('err inside "checkMember" function=', err);
    }      
}

const getPaintingsList = async () => {
    console.log("*** getPaintingsList function! ***");
    try{
        let data = [];
        await paintingsRef.get().then((snap) => {
            snap.forEach((doc) => {   
                data.push({
                    id: doc.id,
                    file: doc.data().file,
                    height: doc.data().height,
                    width: doc.data().width,
                    name: doc.data().name,
                    price: doc.data().price,
                    serial_num: doc.data().serial_num,
                    vailable: doc.data().vailable
                });                        
            })                       
        })
        return data;     
    }catch(err){
        console.log('err inside "checkMember" function=', err);
    }      
}

export { getPaintingsList, handleFireBaseUpload, getManagersList, getImagesList };
