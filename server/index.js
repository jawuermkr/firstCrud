const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const mysql = require('mysql');

// this is the conecction to the mysql database
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'cruddatabase',
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Here we take the info from the database
app.get('/api/get', (req, res)=>{
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result)=>{
        res.send(result);
    });
});

// Here for sed to dababase from frontend
app.post('/api/insert', (req, res)=>{

    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?);";
    db.query(sqlInsert, [movieName, movieReview], (err, result)=>{
        console.log(result);
    });
});

// Here we delete
app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, result) =>{
        if (err) console.log(err)
    });
});

// Here we update
app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, result) =>{
        if (err) console.log(err)
    });
});





// This is a direct test for send info to databse  
app.get('/', (req, res)=>{
    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES ('Here Movie Name', 'Here description from movie.');"
    db.query(sqlInsert, (err, result)=>{
        res.send('New database item send');
    })
})

// this is for test the listen fron the port
app.listen(3001, () =>{
    console.log('Running on port 3001')
})