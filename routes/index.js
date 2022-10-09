import postRoute from './post.js';
import userRoute from './user.js';
import emailRoute from './email.js';

function route(app){
    app.get('/', (req, res)=>{
        res.send("API")
    })
    app.use('/posts',postRoute);
    app.use('/users',userRoute);
    app.use('/email',emailRoute);
}

export default route;