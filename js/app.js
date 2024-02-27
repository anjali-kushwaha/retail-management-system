document.addEventListener('DOMContentLoaded', function() {
    const addInventoryForm = document.getElementById('addProductForm');
    const itemListTableBody = document.getElementById('itemListTableBody')
    const updateInventoryForm = document.querySelector("#updateInventoryForm");
    const updateItemListTableBody = document.getElementById('updateItemListTableBody');
    const viewCategoryForm = document.getElementById('viewCategoryForm');
    const supplierForm = document.getElementById('supplierForm');
    const emailInput = document.getElementById("supplierEmail");
    const phoneInput = document.getElementById("supplierPhone");

    // Email validation
    emailInput.addEventListener("input", function(event) {
        if (!emailInput.validity.valid) {
            emailInput.setCustomValidity("Please enter a valid email address");
        } else {
            emailInput.setCustomValidity("");
        }
    });

    // Phone number validation
    phoneInput.addEventListener("input", function(event) {
        const phoneNumberPattern = /^\d{10}$/;
        // if(phoneNumberPattern.test(phoneInput.value)){

        // }
        phoneInput.setCustomValidity("Please enter a valid 10-digit phone number");
        console.log(phoneInput.value);
        if (!phoneNumberPattern.test(phoneInput.value)) {
        } else {
            phoneInput.setCustomValidity("");
        }
    });

    addInventoryForm.addEventListener('submit', function(event) {
        event.preventDefault();

        console.log("Supplier ID:", document.getElementById('inventorySupplierId').value);
        console.log("Item Name:", document.getElementById('itemName').value);
        console.log("Item Category:", document.getElementById('itemCategory').value);
        console.log("Item Quantity:", document.getElementById('itemQuantity').value);
        console.log("Item Price:", document.getElementById('itemPrice').value);
    
        
        const idofsupplier = document.getElementById('inventorySupplierId').value;
        const itemName = document.getElementById('itemName').value;
        const itemCategory = document.getElementById('itemCategory').value;
        const itemQuantity = document.getElementById('itemQuantity').value;
        const itemPrice = document.getElementById('itemPrice').value;
        
        if (!idofsupplier || !itemName || !itemCategory || !itemQuantity || !itemPrice) {
            alert("Please fill in all fields.");
            return;
        }

        const newProduct = new Product(
            inventory.products.length + 1,
            idofsupplier,
            itemName,
            itemCategory,
            itemQuantity,
            itemPrice
        )

        try {
            inventory.addInventoryItem(newProduct);
            inventory.updateItemListTableBody();
            localStorage.setItem('Inventory', JSON.stringify(inventory.products));
        } catch (error) {
            alert(error.message);
        }
        addInventoryForm.reset();
    })

    const storedInventory = localStorage.getItem('Inventory');
if (storedInventory) {
    const parsedInventory = JSON.parse(storedInventory);
    if (Array.isArray(parsedInventory)) {
        inventory.products = parsedInventory;
        inventory.updateItemListTableBody();
    } else {
        console.error('Stored inventory data is not an array:', parsedInventory);
    }
}


    const button = document.getElementById('updateBtn');
    button.addEventListener('click', function(event){
        event.preventDefault();

        const updateItemId = document.getElementById('updateItemId').value;
        const newPrice = document.getElementById('newPrice').value;

        if (!updateItemId || !newPrice) {
            alert("Please fill in all fields.");
            return;
        }
        const updateProduct = new NewProduct(updateItemId, newPrice)

        try {
            inventory.updateInventoryPrice(updateProduct);
            inventory.updatedItemListTable();
            localStorage.setItem('Inventory', JSON.stringify(inventory));
        } catch(err){
            alert(err.message);
        }
        updateInventoryForm.reset();
    })

    const viewBtn = document.getElementById('viewInventory');
    viewBtn.addEventListener('click', function(event){
        event.preventDefault(); 

        const viewCategory = document.getElementById('viewCategory').value;
        if (!viewCategory){
            alert('Please fill in all fields');
            return;
        }
        const viewProduct = new ViewCategory(viewCategory);
        try {
            inventory.viewInventoryByCategory(viewProduct);
            inventory.viewItemListTableBody();
        } catch (err) {
            alert(err.message);
        }
        viewCategoryForm.reset();
    });
    
    supplierSubmit.addEventListener('click', async function(event) {
            event.preventDefault();
            const supplierId = document.getElementById('idofsupplier').value;  
            const supplierName = document.getElementById('supplierName').value;
            const contactInfo = document.getElementById('contactInfo').value;
            const supplierEmail = document.getElementById('supplierEmail').value;
            const supplierPhone = document.getElementById('supplierPhone').value;
        
            if (!supplierId|| !supplierName || !contactInfo || !supplierEmail || !supplierPhone) {
                alert("Please fill in all fields.");
                return;
            }
        
            const newSupplier = new Supplier(
                supplierId,
                supplierName,
                contactInfo,
                supplierEmail,
                supplierPhone
            );
    
            // this.supplier = newSupplier;
        
            try {
                await supplier.addSupplier(newSupplier);
                await supplier.updateSupplierListTableBody();
                console.log
                localStorage.setItem('Supplier', JSON.stringify(supplier.suppliers));
            } catch (error) {
                alert(error.message);
            }
            supplierForm.reset();
        });
        

})

class Product {
    constructor(id,supplierId, itemName, itemCategory, itemQuantity, itemPrice) {
        this.id = id;
        this.supplierId = supplierId;
        this.itemName = itemName;
        this.itemCategory = itemCategory;
        this.itemQuantity = itemQuantity;
        this.itemPrice = itemPrice;
    }
}

class NewProduct {
    constructor(updateItemId, newPrice){
        this.updateItemId = updateItemId;
        this.newPrice = newPrice;
    }
}

class ViewCategory {
    constructor(viewCategory){
        this.viewCategory = viewCategory;
    }
}

class Inventory {
    constructor() {
        this.products = [];
        this.categories;
    }


    addInventoryItem(product) {
        if (product.itemQuantity < 0) {
            throw new Error("Item quantity must be greater than 0");
        }
        this.products.push(product);
        setTimeout(() => {
            alert("Inventory added successfully");
        }, 1000);
    }

    updateInventoryPrice(product) {
        inventory.products.forEach(item => {
            if(item.id == parseInt(product.updateItemId,10)){
                item.itemPrice = product.newPrice;
            }
        });
        setTimeout(() => {
            alert("Inventory Price updated successfully");
        }, 1000);
    }

    viewInventoryByCategory(product) {
        const categories = inventory.products.filter(item => item.itemCategory == product.viewCategory);
        this.categories = categories;
    }

    updateItemListTableBody() {
        const itemListTableBody = document.getElementById('itemListTableBody');
        itemListTableBody.innerHTML = '';
    
        this.products.forEach(product => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${product.id}</td>
                <td>${product.itemName}</td>
                <td>${product.itemCategory}</td>
                <td>${product.itemQuantity}</td>
                <td>${product.itemPrice}</td>
            `;
            itemListTableBody.appendChild(newRow);
        });
    }

    updatedItemListTable(){
        const updateItemListTableBody = document.getElementById('updateItemListTableBody');
        updateItemListTableBody.innerHTML = '';

        this.products.forEach(product => {
            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${product.id}</td>
                <td>${product.itemName}</td>
                <td>${product.itemPrice}</td>
            `;
            updateItemListTableBody.appendChild(newRow);
        })
    }

    async viewItemListTableBody(){
        const viewItemListTableBody = await document.getElementById('ViewItemListTableBody');
        viewItemListTableBody.innerHTML = '';
        await this.categories.forEach(async category =>{
            const newRow = await document.createElement('tr');
            newRow.innerHTML = await `
                <td>${category.id}</td>
                <td>${category.itemName}</td>
                <td>${category.itemCategory}</td>
                <td>${category.itemQuantity}</td>
                <td>${category.itemPrice}</td>
            `;
            await viewItemListTableBody.appendChild(newRow);
        })
    }
}

const inventory = new Inventory();

class Supplier {
        constructor(supplierId,supplierName, contactInfo, supplierEmail, supplierPhone) {
            this.suppliers = [];
            this.supplierId = supplierId;
            this.supplierName = supplierName;
            this.contactInfo = contactInfo;
            this.supplierEmail = supplierEmail;
            this.supplierPhone = supplierPhone;
        }
        
        // Method to add a supplier
        async addSupplier(supplier) {
            // Validate supplier data
            if (!supplier) {
                throw new Error("Invalid supplier data.");
            }
            
            // Simulate asynchronous delay
            await new Promise(resolve => setTimeout(resolve, 1000));
    
            // Add supplier to list
            this.suppliers.push(supplier);
            setTimeout(() => {
                alert("Supplier added successfully");
            }, 1000);
        }
    
        // Method to update supplier list table in the UI
        updateSupplierListTableBody() {
            const supplierListTableBody = document.getElementById('supplierListTableBody');
            supplierListTableBody.innerHTML = '';
        
            this.suppliers.forEach(supplier => {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>${supplier.supplierId}</td>
                    <td>${supplier.supplierName}</td>
                    <td>${supplier.contactInfo}</td>
                    <td>${supplier.supplierEmail}</td>
                    <td>${supplier.supplierPhone}</td>
                `;
                supplierListTableBody.appendChild(newRow);
            });
        }
        
}

const supplier = new Supplier();

// const supplier1 = new Supplier("Supplier 1", "Contact 1", "supplier1@example.com", "1234567890");
// const supplier2 = new Supplier("Supplier 2", "Contact 2", "supplier2@example.com", "0987654321");

// supplier.addSupplier(supplier1);
// supplier.addSupplier(supplier2);


const generate=document.querySelector(".generate")

// Function to generate the report
function generateInventorySupplierReport(suppliers) {
    // Create a table element
    const table = document.createElement("table");
    table.innerHTML = `
        <thead>
            <tr>
                <th>Item ID</th>
                <th>Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Supplier Name</th>
                <th>Contact Info</th>
                <th>Email</th>
                <th>Phone Number</th>
            </tr>
        </thead>
        <tbody id="report-body">
            <!-- Report rows will be displayed here -->
        </tbody>
    `;

    // Populate table with inventory items and supplier details
    const tbody = table.querySelector("#report-body");
    inventory.products.forEach(item => { // Iterate over products array
        // Find the supplier corresponding to the item
        const supplier = suppliers.find(supplier => supplier.supplierId === item.supplierId);
        if (supplier) {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.itemName}</td>
                <td>${item.itemCategory}</td>
                <td>${item.itemQuantity}</td>
                <td>${item.itemPrice}</td>
                <td>${supplier.supplierName}</td>
                <td>${supplier.contactInfo}</td>
                <td>${supplier.supplierEmail}</td>
                <td>${supplier.supplierPhone}</td>
            `;
            tbody.appendChild(row);
        }
    });

    // Append the table to the document body
    document.body.appendChild(table);
}



// Example usage:
// Example usage:
generate.addEventListener("click", () => generateInventorySupplierReport(supplier.suppliers));

