import axios from 'axios'


const userList = document.querySelector('#user-list')
const carList = document.querySelector('#car-list')
const saleList = document.querySelector('#sale-list')



const renderUsers = (users) =>{
    const html = users.map(user =>{
        return(`
            <li>
                <a href='#${user.id}'>
                ${user.name}
                </a>
            </li>
        `)
    }).join('')
    userList.innerHTML = html;
}


const renderCars = (cars) =>{
    const html = cars.map(car =>{
        return(`
            <li>
                <a href='#${car.id}'>
                    ${car.name}
                </a>
            </li>
        `)
    }).join('');
    carList.innerHTML = html;
}



const init = async () =>{
    try{
        const users = (await axios.get('/api/users')).data;
        const cars = (await axios.get('/api/cars')).data;
        console.log(users)

        renderUsers(users);
        renderCars(cars);

    }
    catch(err){
        console.log(err);
    }
}

init();