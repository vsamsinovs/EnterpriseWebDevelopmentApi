Web Api Application

Application supports full CRUD support for posts, relative support for comments and has 1 to many relationship between posts and comments.
Application uses MongoDB with Mongoose for data storage. Application is deployed on bluemix: https://vs-enterpriseweb-api.eu-gb.mybluemix.net i.e. /api/posts.
Automatic deployment is done using trevis
Validation and verification of data is done using mongoose. 
Testing is done using mocha, but unfortunately was commented out due to issues with bluemix.
Number of 3rd party libraries are used such as Crud, cfenv and babel-preset-stage-0
Full integration with React-Redux app

https://github.com/vsamsinovs/EnterpriseWebDevelopmentApi