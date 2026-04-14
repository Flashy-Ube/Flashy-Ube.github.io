function item(id, name, price)
{
    this.id = id;
    this.name = name;
    this.price = price;
}

var items = [];

items[0] = new item(1, "Necro SpellBook", 49.99);
items[1] = new item(2, "Palantir", 99.99);
items[2] = new item(3, "Mandrake Root", 14.99);
items[3] = new item(4, "Tarot Cards", 49.99);
items[4] = new item(5, "Ouija Board", 99.99);
items[5] = new item(6, "Scrying Mirror", 14.99);

function updateCheckout()
{
    document.getElementById("cart-link").innerHTML = "Checkout (" + sessionStorage.length + ")";
}

function getID(arg)
{
    var id;
    var counter = 0;
    while( items[counter].name != arg)
    {
        counter++;
    }

    return (counter + 1);
}

function add(arg)
{
    sessionStorage.setItem(items[arg].name, items[arg].price);
    updateCheckout();
    //console.log("Checkout (" + sessionStorage.length + ")");
}

function remove(arg)
{
    sessionStorage.removeItem(arg);
    displayCart();
    updateCheckout();
}

function displayCart()
{

    var total = 0;
    var output = "<table class='table table-hover'>";

    if(sessionStorage.length == 0)
    {
        document.getElementById("cart").innerHTML = "<h3>Cart is empty!</h3>";
    }
    else
    {
        output += "<tr><th>Image</th><th>Name</th><th>Price</th><th>Delete</th>";

        for( var x = 0; x < sessionStorage.length; x++)
        {
            var key = sessionStorage.key(x);
            output += "<tr><td><img src='images/img" + getID(key) + ".jpg' width='50px' height='50px'></td>";
            output += "<td>" + key + "</td><td>" + sessionStorage.getItem(key) + "</td>";
            output += "<td><input type='button' class='btn btn-primary' value='Delete' onclick='remove(\"" + key + "\")'></td></tr>";
            total += parseFloat(sessionStorage.getItem(key));

        }        
     
        document.getElementById("cart").innerHTML = output;
        document.getElementById("total").innerHTML = "<h3> TOTAL: " + total + "</h3>";
    }

}

    //var cart = Object.keys(sessionStorage);

/*        for (var key of cart)
        {
            output += "<tr><td>" + key + "</td><td>" + sessionStorage.getItem(key) + "</td>";
            output += "<td><input type='button' class='btn btn-primary' value='Delete' onclick='remove(\"" + key + "\")'></td></tr>";
            total += parseFloat(sessionStorage.getItem(key));
        }
*/   