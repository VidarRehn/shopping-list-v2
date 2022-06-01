
const getAllProducts = async () => {
    const response = await fetch('https://vidars-shopping-list-api.herokuapp.com/products')
    const data = await response.json()
    return data
}


getAllProducts().then(data => console.log(data))