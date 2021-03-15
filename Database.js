import Realm from "realm";

// Declare Book Schema
const syncClient = {
    name: 'syncClient',
    properties: {
        phone:'string',
        name:'string'
    }
};

const syncProduct = {
    name: 'syncProduct',
    properties: {
        product_id:'int',
        quantity:'int',
        price:'int',
        name:'string'

    }
};
const syncInvoice = {
    name: 'syncInvoice',
    properties: 'string'
}

class Sync extends Realm.Object {}
Sync.schema = {
    name: 'Sync',
    properties: {
        ref: 'string',
        invoice_no:  'string?[]',
        sales_location_id: 'int',
        performed_at:  'string',
        amount_paid:  'int',
        total:  'string',
        owe:  'string',
        synced:{type:'bool', default:false},
        date:'string',
        client:{
            type: 'list',
            objectType: 'syncClient'
        },
        products: {
            type: 'list',
            objectType: 'syncProduct'
        },

    }
};

class Client extends Realm.Object {}
Client.schema = {
    name: 'Client',
    properties: {
        id:'int',
        phone: 'string',
        name: 'string',
        owe:'string',
        amountD:'int'
    }
};

class Product extends Realm.Object {}
Product.schema = {
    name: 'Product',
    properties: {
        name: 'string',
        quantity: 'string',
    }
};

class BookSchema extends Realm.Object {}
BookSchema.schema = {
    name: 'Book',
    properties: {
        title: 'string',
        pages:  'int',
        edition: 'int?',
        author: 'Author?'
    }
};

// Author schema
class AuthorSchema extends Realm.Object {}
AuthorSchema.schema = {
    name: 'Author',
    primaryKey: 'id',
    properties: {
        id: 'int',
        firstName: 'string',
        lastName:  'string'
    }
};

// Create realm
// let realm = new Realm.open({ schema: [Sync], deleteRealmIfMigrationNeeded: true, })
let realm = new Realm({schema: [BookSchema, AuthorSchema,Sync,syncProduct,syncClient,Client,Product], schemaVersion: 4});


// Functions
// Return all books
let getAllBooks = () => {
    return realm.objects('Book');
};

// Add a single book using parameters
let addBook = (_title, _pages, _edition = null, _author) => {
    realm.write(() => {
        const book = realm.create('Book', {
            title: _title,
            pages:  _pages,
            edition: _edition,
            author: _author
        });
    });
}

// Remove all books from Realm database
let deleteAllBooks = () => {
    realm.write(() => {
        realm.delete(getAllBooks());
    });
};

// Update all books that have a null value as edition and update it to 1
let updateAllBookEditions = () => {
    realm.write(() => {
        let books = getAllBooks()
        books.map((item, index) => {
            if (item.edition === null){
                item.edition = 1
            }
        })
    });
};

// Get all books with more than 400 pages using .filtered()
let getBigBooks = () => {
    return realm.objects('Book').filtered('pages > 400');
}

// Get all authors
let getAllAuthors = () => {
    return realm.objects('Author');
};

// Add a single author using parameters
let addAuthor = (_firstName, _lastName) => {
    realm.write(() => {
        let _id = 0;
        if (getAllAuthors().length > 0) _id = realm.objects('Author').max('id')+1;

        const book = realm.create( 'Author',{
            id: _id,
            firstName: _firstName,
            lastName:  _lastName
        });
    });
}

// Remove all authors from Realm database
let deleteAllAuthors = () => {
    realm.write(() => {
        realm.delete(getAllAuthors());
    });
};

// Get author by id
let getAuthorById = (_id) => {
    return realm.objects('Author').filtered(`id = ${_id}`);
}

//Clients

let getAllClients = () => {
    // console.log(realm.objects('Client'))
    return realm.objects('Client');
};

let updateClient = (_phone,_name,_owe,_amountD) => {
    console.log('lonely')
    var itemsProcessed = 0;
    var edit = false;
    let clientData = getAllClients();

    if(clientData.length == 0){
        console.log('no client')
        addClient(_phone,_name,_owe,_amountD)
    }else{
        realm.write(() => {
                clientData.map((item, index, array) => {
                console.log('Im in')
                if  (item.phone === _phone){
                    item.name = _name;
                    item.amountD =  item.amountD +_amountD;
                    edit = true
    
                    if(item.amountD >= 0){
                        item.owe = "false";
                    }else{
                        item.owe = "true";
                    }
                }
    
                itemsProcessed++;
                if(itemsProcessed === array.length) {
                    console.log('Im pushing')
                    if(edit == false){
                        //insert after checking
                        let _id = 0;
                        if (getAllClients().length > 0) _id = realm.objects('Client').max('id')+1;

                        const book = realm.create( 'Client',{
                            id:_id,
                            phone: _phone,
                            name:  _name,
                            owe:  _owe,
                            amountD:  _amountD
                        });
                        
                     }
                  }
            })
        
            }) 
        }
}



let getClientByPhone = (_phone) => {
    
    return realm.objects('Client').filtered(`phone = ${_phone}`);
}

let deleteAllClient = () => {
    realm.write(() => {
        realm.delete(getAllClients());
    });
};

let addClient = (_phone,_name,_owe,_amountD) => {
    realm.write(() => {
        let _id = 0;
        if (getAllClients().length > 0) _id = realm.objects('Client').max('id')+1;

        const book = realm.create( 'Client',{
            id:_id,
            phone: _phone,
            name:  _name,
            owe:  _owe,
            amountD:  _amountD
        });
    });
}

//Sync

let setSync = (_ref, _invoice_no,_sales_location_id,_performed_at,_amount_paid,_total,_owe,_synced,_date,_client,_products) => {
   
    realm.write(() => {
        console.log("_client")
        console.log(_products)
        let products = _products.map(item=>{
            let products = realm.create('syncProduct', {
                product_id: item.product_id,
                quantity:item.quantity,
                price:item.price,
                name:item.name
            }, true);

            return item;
        })
        let client = realm.create('syncClient', _client, true);
        let sync = realm.create('Sync', {
            ref: _ref,
            invoice_no:  _invoice_no,
            sales_location_id: _sales_location_id,
            performed_at: _performed_at,
            amount_paid: _amount_paid,
            total: _total,
            owe: _owe,
            synced: _synced,
            date: _date,
        },true);
        sync.client.push(client);
        products.forEach(item => {
            sync.products.push(item);
        });

    });
    let clients = realm.objects('syncClient');
    console.log('clients.length', clients.length);       
}

let getSync = () => {
    // console.log(realm.objects('Client'))
    return realm.objects('Sync');
};

let deleteAllSync = () => {
    realm.write(() => {
        realm.delete(getSync());
    });
};
let updateSync = (_ref) => {
    realm.write(() => {
        let syncData = getSync()
        syncData.map((item, index) => {
            if (item.ref === _ref){
                item.synced = true
            }
        })
    });
};






// Exports
// Export the realm so other files can access it
export default realm;

// Export other functions so other files can access it
export {
    getAllBooks,
    addBook,
    deleteAllBooks,
    updateAllBookEditions,
    getBigBooks,
    getAllAuthors,
    addAuthor,
    getAuthorById,
    deleteAllAuthors,
    getClientByPhone,
    addClient,
    getAllClients,
    setSync,
    getSync,
    deleteAllSync,
    deleteAllClient,
    updateSync,
    updateClient
}