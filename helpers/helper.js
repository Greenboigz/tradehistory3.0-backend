const MS_PER_SEC = 1000;
const SEC_PER_MIN = 60;
const MIN_PER_HOUR = 60;
const HOURS_PER_DAY = 24;
const NUMBER_OF_DAYS = 120;
const EXPERIMENT_DURATION = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY * NUMBER_OF_DAYS;
const EXPERIMENT_START_DATE = Date.now() - EXPERIMENT_DURATION;
const A_DAY = MS_PER_SEC * SEC_PER_MIN * MIN_PER_HOUR * HOURS_PER_DAY;

var transaction_id = 0;

/**
 * Initializes a product
 * @param {{id: !number, name: !string, createdDate: ?Date, description: ?string, value: ?number}} id 
 * @return {{id: number, createDate: Date, name: string, description: string, value: number}}
 */
function initialize_product(
        {
            id, 
            name, 
            createdDate, 
            description, 
            value
        }
    ) {
    return {
        id,
        name,
        createdDate: createdDate || new Date(EXPERIMENT_START_DATE + (Math.random() * EXPERIMENT_DURATION)),
        description: description || "This is an example of a product.",
        value: value || Math.random() * 20
    }
}

/**
 * Initializes a Purchase
 * @param {{productId: !Number, purchaseDate: ?Date, quantity: Number}} product 
 * @param {Date} purchaseDate 
 * @return {{id: number, productId: number, quantity: number, purchaseDate: Date}}
 */
function initialize_purchase({productId, purchaseDate, quantity}) {
    return {
        id: transaction_id++,
        productId,
        purchaseDate: purchaseDate || new Date(),
        quantity: quantity || Math.ceil(Math.random() * 20)
    }
}

const FRUITS = [
    "apple",
    "apricot",
    "avocado",
    "banana",
    "bell pepper",
    "bilberry",
    "blackberry",
    "blackcurrant",
    "blood orange",
    "blueberry",
    "boysenberry",
    "breadfruit",
    "canary melon",
    "cantaloupe",
    "cherimoya",
    "cherry",
    "chili pepper",
    "clementine",
    "cloudberry",
    "coconut",
    "cranberry",
    "cucumber",
    "currant",
    "damson",
    "date",
    "dragonfruit",
    "durian",
    "eggplant",
    "elderberry",
    "feijoa",
    "fig",
    "goji berry",
    "gooseberry",
    "grape",
    "grapefruit",
    "guava",
    "honeydew",
    "huckleberry",
    "jackfruit",
    "jambul",
    "jujube",
    "kiwi fruit",
    "kumquat",
    "lemon",
    "lime",
    "loquat",
    "lychee",
    "mandarine",
    "mango",
    "mulberry",
    "nectarine",
    "nut",
    "olive",
    "orange",
    "pamelo",
    "papaya",
    "passionfruit",
    "peach",
    "pear",
    "persimmon",
    "physalis",
    "pineapple",
    "plum",
    "pomegranate",
    "pomelo",
    "purple mangosteen",
    "quince",
    "raisin",
    "rambutan",
    "raspberry",
    "redcurrant",
    "rock melon",
    "salal berry",
    "satsuma",
    "star fruit",
    "strawberry",
    "tamarillo",
    "tangerine",
    "tomato",
    "ugli fruit",
    "watermelon"
];

function load_products() {
    return FRUITS.map((item, index) => initialize_product({id: index, name: item}));
}

/**
 * Randomly choose an item out of a list
 * @param {[Object]} aList 
 * @return {Object}
 */
function choose_random(aList) {
    return aList[Math.floor(Math.random() * aList.length)];
}

function add_daily_purchases(day, products) {
    var purchases = [];
    for (var p = 0; p < 5000; p++) {
        var product = choose_random(products);
        if (product.createdDate < day) {
            var purchase = initialize_purchase({
                productId: product.id, 
                purchaseDate: new Date(day + Math.random() * A_DAY)
            });
            purchases.push(purchase);
        }
    }
    return purchases;
}

function load_purchases(products) {
    var purchases = [];
    var today = EXPERIMENT_START_DATE;
    while (today < Date.now()) {
        var todays_purchases = add_daily_purchases(today, products);
        todays_purchases.forEach(purchase => purchases.push(purchase));
        today += A_DAY;
    }
    return purchases;
}

module.exports = {
    load_products,
    load_purchases
}