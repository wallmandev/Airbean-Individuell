Börja med att köra npm init -y, nedb-promises, joi, nodemon, express, uuid



Vi har alla i gruppen bidragit med kod men pga strul med tider så är det bara Alexander och Baran som pushat upp till main. Vi har skickat vår kod över discord och lagt in det separat för att få det att fungera på ett relativt vettigt sätt. 

För registrering:
http://localhost:8080/auth/register
Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

För login : 
http://localhost:8080/auth/login

//ADMIN 
För att logga in som admin måste det skickas med i HEADERS: Key : Authorization
                                                             Value: FwmS996dK8FQFGFw

Gör POST-anrop. Skicka med { "username" : "ditt användarnamn", "password" : "ditt lösenord"}

Menyn:
För att kolla menyn (GET): http://localhost:8080/menu
För att kolla efter specifikt id: http://localhost:8080/menu/  (här skriver du in det långa id som du hittar i airbean.db t.ex. Az3b6aeCng6rbrET)

Varukorgen:
För att kolla innehållet i varukorgen : http://localhost:8080/cart
För att lägga till i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8080/cart
För att ta bort i varukorgen så sätt ett POST anrop och skickar med all data från det kaffet du vill ha som ligger i airbean.db. Detta görs till http://localhost:8080/cart/ (här skriver du det långa id:et. T.ex. http://localhost:8080/cart/XFMyYITYP52LXcYq)

Om oss:
Endpoint för om oss: http://localhost:8080/about



För att lägga en beställning som gäst:
Gå till http://localhost:8080/checkout och gör ett POST-anrop
Gå sedan till http://localhost:8080/status för att se när ditt kaffe levereras

För att lägga en beställning som användare
Gå till http://localhost:8080/checkout därefter skriver du i headers key : Content-Type, Value : application.json
Raden under i headers. Key : user-id, Value : (här skriver du in ditt unika id som du hittar i users.db)
Sen gör du ett POST-anrop.

För att se orderhistory:
http://localhost:8080/orderhistory/ (här skriver du in din användares unika id)

För att se status på din order: 
http://localhost:8080/status

För att lägga till en ny produkt:

(POST) http://localhost:8080/addProduct 
(se till att du är inloggad som användare)
i body måste värdena :"id": , "title": "", "desc": "", "price": skickas med och id får inte vara densamma som någon vara som redan finns i databasen.

För att modifiera en produkt i menyn:
(POST) http://localhost:8080/menu/{id}
i URL så skickar du med det unika {_id} som finns i menu.db. Inte att förväxla med id. 
även här måste värdena "id": , "title": "", "desc": "", "price": skickas med.

För att ta bort en produkt i menyn:
(DELETE) http://localhost:8080/menu/{id}
i URL så skickar du med det unika {_id} som finns i menu.db. Inte att förväxla med {id}. 

För att lägga till kampanjer:
(POST) http://localhost:8080/campaign/create
i BODY så skickar du med det unika {_id} som finns i menu.db. Inte att förväxla med id.
ex: 
{
    "products": ["Az3b6aeCng6rbrET", "XFMyYITYP52LXcYq"], // Ersätt med faktiska produkt-_id
    "price": 40
}