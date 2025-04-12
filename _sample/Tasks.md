
# CLIENT
I want to finish the UI to my seo manager app. please help with these tasks:

1. create a beautiful landing page with contents that can be updated about the site and tools
2. create authentication pages: 
    a. register: password, confirmPassword, email, phone (optional)
    b. login: email, password
3. dashboard home where they get to see their activities and analytics (that can be a minimal design right now, we'll grow it later)
4. a profile page where they see their details like email, phone (if added), profile picture (if added), subscription details etc
5. a profile update page (to update email, password, phone, profilepic, etc)
6. a subscription listing page where they see different recurring subscription packages (with paystack or crypto, btc, eth, bnb, payment option), amount associated api calls in total. subscription is yearly. these list are gotten from the server.
7. a paystack/crypto subscribe page where they make final payment and if paystack, are redirected to subscription details page. a validity is done first to see if payment amount is available in the list of payment options (for both crypto and paystack payments)
8. if crypto payment, they are asked to send a transaction hash to the admin email
9. once payment is successful (in both cases), they are redirected to the successful subscription page where they see subscription details like api key, api secret, amount of api calls, subscription starting date, subscription ending date. 
10. there is also an api keys page where all their subscription api keys are listed; active, expired, free. the api keys are obstructed which can be clicked upon to show the api key and api secret.
11. users have the option to create a new subscription from that page (which takes them back tot he subscription listing page).


# SERVER
1. I want there to be a subscrition db to list all possible subscriptions, amount in usd, total api requests available, etc. every new user gets a free tier subscription keys with 100 requests total.
2. when a user wants to make subscription, after their payment, if paystack, and it is successful, their subscription with api keys (key and secret) is aut created for them
3. if payment is through crypto, the admin creates this subscription for them. and it auto displays on their subscriptions page.
4. users can not send the qouta of api requests to the server, the server uses their payment amount to determine their subscription api qouta.
5. each subscription option has with it paystack amount, eth amount, btc amount, and bnb amounts to pay. which is confirmed before every subscription payment is done.
6. each user account can have more than one api keys sets, but only 1 free tier subscription is allowed per account. you can have multiple subscription keys for paid subscriptions running at any time, but only 1 must be free tier.


# ADMIN
1. admin app (ui and server) and dashboard for viewing all users details, all subscriptions available, all current subscribed users and their subscription details, and an aggregation of revenue generated 
2. a dashboard to update subscriptions details, add new ones, and remove old ones 
