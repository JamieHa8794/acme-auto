import axios from 'axios'


const userList = document.querySelector('#user-list')
const carList = document.querySelector('#car-list')
const saleList = document.querySelector('#sale-list')



const renderUsers = (users) =>{
    const html = users.map(user =>{

        if(user.id === window.location.hash.slice(1)){
            return(`
            <li class='selected'>
                <a href='#${user.id}'>
                ${user.name}
                </a>
            </li>
            `)
        }
        else{
            return(`
                <li>
                    <a href='#${user.id}'>
                    ${user.name}
                    </a>
                </li>
            `)
        }
    }).join('')
    userList.innerHTML = html;
}


const renderCars = (cars) =>{
    const html = cars.map(car =>{
        return(`
            <li>
                    ${car.name}
            </li>
        `)
    }).join('');
    carList.innerHTML = html;
}

const renderSales = (sales) =>{
    const html = sales.map(sale =>{
        return(`
            <li>
                ${sale.car.name}
            </li>
        `)
    }).join('');
    saleList.innerHTML = html;
}


const init = async () =>{
    try{
        const users = (await axios.get('/api/users')).data;
        const cars = (await axios.get('/api/cars')).data;
        console.log(users)

        renderUsers(users);
        renderCars(cars);
        const userId = window.location.hash.slice(1);
        const url = `/api/users/${userId}/sales`;
        const sales = (await axios(url)).data
        console.log(sales)
        renderSales(sales)

    }
    catch(err){
        console.log(err);
    }
}

window.addEventListener('hashchange', async ()=>{
    const userId = window.location.hash.slice(1);
    const url = `/api/users/${userId}/sales`;
    const sales = (await axios(url)).data
    console.log(sales)
    renderSales(sales)

    const users = (await axios.get('/api/users')).data;
    renderUsers(users)
})




init();