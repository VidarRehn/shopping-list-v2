
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
    console.log(productName.value)
    console.log(productCategory.value)

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