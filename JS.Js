let image = document.getElementById("I");
        let images = ["./Images/History_of_CS.jpg", "./Images/Logic Gates.png" ,"./Images/webdev.jpg", "./Images/database.png", "./Images/AI_data_Science.jpg"]
        setInterval(function() {
            let random = Math.floor(Math.random() * 5);
            image.src = images[random];
        }, 4350 );