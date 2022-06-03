
const getAllProducts = async () => {
    const response = await fetch('/products')
    const data = await response.json()
    return data
}


getAllProducts().then(array => {
    array.sort((a,b) => a.category - b.category)
    console.log(array)
})

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

    location.reload()
})

// render shopping list on start

const shoppingList = document.querySelector('.shopping-list')

const renderItems = () => {
    getAllProducts().then(array => {
        const productsToBuy = array.filter(product => product.inShoppingList == true)
        productsToBuy.sort((a,b) => a.category - b.category)
        productsToBuy.forEach(product => {
            const newListItem = document.createElement('li')
            newListItem.innerText = product.name
            newListItem.classList.add(product.category)
            const removeButton = document.createElement('button')
    
            // remove item from list
            removeButton.innerText = 'Remove'
            removeButton.dataset.id = product._id
            removeButton.addEventListener('click', async (e) => {
                await fetch(`/products/remove/${e.target.dataset.id}`, {
                    method: 'put'
                })

                const parentListItem = e.target.parentElement
                parentListItem.remove()
            })
            newListItem.append(removeButton)
            shoppingList.append(newListItem)
        })
    })
}

renderItems()


// automcomplete during search input

const searchInput = document.querySelector('#search-input')
const autocompleteContainer = document.querySelector('#autocomplete')

getAllProducts().then(array => {
    const notInList = array.filter(product => product.inShoppingList == false)

    searchInput.addEventListener('input', (e) => {
        e.preventDefault()
        autocompleteContainer.innerHTML = ''

        notInList.forEach(product => {
            const productName = product.name
            if (e.target.value != ''){
                if (productName.includes(e.target.value)){
                    const newListItem = document.createElement('li')
                    newListItem.innerText = productName
                    newListItem.dataset.id = product._id
                    autocompleteContainer.append(newListItem)

                    //add item to shopping list

                    newListItem.addEventListener('click', async (e) => {
                        await fetch(`/products/add/${e.target.dataset.id}`, {
                            method: 'put'
                        })

                        searchInput.value = ''
                        autocompleteContainer.innerHTML = ''
                        shoppingList.innerHTML = ''

                        renderItems()
                    })
                }
            }
        })

        const enterNewProductButton = document.createElement('button')
        enterNewProductButton.innerText = "Hittar inte? Lägg till vara"
        enterNewProductButton.addEventListener('click', (e) => {
            e.preventDefault()
            addProductForm.classList.remove('hidden')
            searchInput.classList.add('hidden')
            shoppingList.classList.add('hidden')
            autocompleteContainer.innerHTML = ''
        })
        autocompleteContainer.append(enterNewProductButton)

        if (e.target.value == '') {
            autocompleteContainer.innerHTML = ''
        }
    })
})