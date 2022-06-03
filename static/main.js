
const getAllProducts = async () => {
    const response = await fetch('/products')
    const data = await response.json()
    return data
}


getAllProducts().then(data => console.log(data))

const addProductForm = document.querySelector('#new-product')
const productName = document.querySelector('#name')
const productCategory = document.querySelector('#category')

addProductForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    await fetch('/products', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: productName.value,
            category: productCategory.value
        })
    })
})

// render shopping list on start

const shoppingList = document.querySelector('.shopping-list')

getAllProducts().then(array => {
    const productsToBuy = array.filter(product => product.inShoppingList == true)
    console.log(productsToBuy)

    productsToBuy.forEach(product => {
        const newListItem = document.createElement('li')
        newListItem.innerHTML = `
        <p>${product.name}</p>
        <button class="remove-btn" data-id="${product._id}" onclick="removeItem(this)">Remove</button>
        `
        shoppingList.append(newListItem)
    })
})

// remove item from list

const removeItem = async (e) => {
    console.log(e)
    console.log(e.dataset.id)
    await fetch(`/products/remove/${e.dataset.id}`)
}