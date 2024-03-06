const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
const PORT = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb+srv://arpitchaudhary2003:NyPM6ivUHQIf3Wv7@cluster0.byoohl5.mongodb.net/Inter-Project').then(() => {
    console.log("Database is Connected Successfully");
}).catch((error) => {
    console.log(error);
});

// user schema 
const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true, 
    },
    phonenumber: {
        type: String, 
        required: true, 
    },
    email: {
        type: String, 
        required: true, 
    },
    hobbies: {
        type: String, 
        required: true, 
    },
}, {timestamps: true});

const User = mongoose.model("User", userSchema)

app.get('/read/:id', async(req, res) => {
    try {
        const id = req.params.id; 
        const user = await User.findById({_id:id})
        res.send(user);
    } catch (error) {
        res.send(error)
    }
});

app.get('/readuserdata', async(req, res) => {
    try {
        const userData = await User.find({})
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

app.post('/createuser', async(req, res) => {
    try {
        const bodyData = req.body; 
        const user = new User(bodyData);
        const userData = await user.save();
        res.send(userData);
    } catch (error) {
        res.send(error);
    }
});

app.put("/updateuser/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndUpdate({_id: id}, req.body, { new: true });
        res.send(user);
    } catch(error) {
        res.send(error);
    }
});

app.delete("/delete/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete({_id:id});
        res.send(user);
    } catch (error) {
        res.send(error);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
