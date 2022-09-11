import axios from 'axios'


const init = async () =>{
    try{
        const users = (await axios.get('/api/users')).data;
        console.log(users)
        const cars = (await axios.get('/api/cars')).data;
        console.log(cars)
    }
    catch(err){
        console.log(err);
    }
}

init();