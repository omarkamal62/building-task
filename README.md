# frontend-task

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### DESCRIPTION FOR THE APPLICATION
In this app we can add buildings for users (by specifing the name and the country of the building),
we can also update the building and delete it. The app also implements map container using (Leaflet)
that allows the user to see the location of the building in the map with a tooltip ono hovering that 
show the buildingg name and the country is located in.

### Some info regarding the application
This app doesn't add users, but there are a 4 users inside the store with data (name, id). You can add 
buildings to those users.

### the application cycle
(FIRST) You will find a dropdown that has all the users, so you can select among them and see the buildings for each one.
like the photo.

![Screenshot (344)](https://github.com/omarkamal62/building-task/assets/49999117/45419ac5-f97e-4820-b56d-069a7542e27a)


(SECOND) After selecting a user if that user has some buildings the screen will be split up to two parts, the left part is the 
list of the buildings that this user has in the system. the second part will be the map for this location.
like shown below:

![Screenshot (345)](https://github.com/omarkamal62/building-task/assets/49999117/4d52887b-8bf7-4c64-8379-7a6c70e81eed)


(Third) If that user or the selected user doesn't have any buildings in the system. so an alert will be shown that indicate 
that this user doesn't have any buildings in the system.
liek below:

![Screenshot (350)](https://github.com/omarkamal62/building-task/assets/49999117/b9f9c764-14b0-4ec9-aa0d-dbd6e1569499)

(4th) Like we mentio in the description this app can add, edit or delete the buildings. so we need a form for adding and editing,
and by clicking on the add building button in the building list:

![Screenshot (347)](https://github.com/omarkamal62/building-task/assets/49999117/e302be75-946c-47ed-81eb-2efe9db35511)

you will be send to the form page or the map page will change to be the form (to be more precise). the image below shows the form in case we need to add the data of the building.

![Screenshot (348)](https://github.com/omarkamal62/building-task/assets/49999117/d4e9ecb6-9c35-40f7-b0de-6356fbe0f2a6)

like shown in the image the inputs are empty, on the contrary of the editing form that will show the data of the building that should be updated.

![Screenshot (346)](https://github.com/omarkamal62/building-task/assets/49999117/37b50c6f-3879-4a28-93a5-2bf8dedd4850)


another important part here in the form, is that we cannot leave the inputs empty or we will get an error and the submitting won't complete.
like below:

![Screenshot (351)](https://github.com/omarkamal62/building-task/assets/49999117/678018d7-117e-4464-8d14-502c2edeb086)

(5th) Like we mention the I can show the location of the building on which country and with the help of Leaflet

![Screenshot (349)](https://github.com/omarkamal62/building-task/assets/49999117/0c6eb5ca-4148-4fa9-9c63-b13d13d2c46e)

![Screenshot (353)](https://github.com/omarkamal62/building-task/assets/49999117/0a2f7fae-c2ee-447b-ba54-9060dd38f6c8)

as shwon in the second image when you hover over it (you can see a tooltip that shows the building name assoicated with the country).

### The tools used in this application

1) Vue 3 (the framework for the task)
2) Leaflet for implemntaion of the map.
