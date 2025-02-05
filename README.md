# SarahaAPP_Node.js
this backend app like Saraha application that users can make comments to other without knowing them

### To Start the Project

1. download the hole project in your server
2. create "config.env" file to put environment variables in it
2.1. put in it 
    - PORT=3000 || your port
    - ENV_MODE=development || prod
    - HOST=localhost || your host
    - DB_ENGINE=mysql || or any rational db
    - DB_PASSWORD=db_password
    - DB_USERNAME=db_username
    - DB_SCHEMA=db_schema
    - TOKEN_EXPIRATION_TIME=time (1d) for token expiration
    SECRET_KEY=secret key of the project
    SERVICE=mail services
    SENDER_EMAIL
    EMAIL_APP_PASSWORD
    CODE_EXPIRED_IN=time for expire the reset code
3. goto db engine and make schema of the project, and put that's name in config.env file 
4. goto your mail service (ex. gmail) and make email app, and put it's data in the config.env

5. un-comment line 15 in index file
5.1 ``` sequelize.sync({force: true});```

6. run this code in cmd: ```npm run dev```

7. then commnet the line of db again




