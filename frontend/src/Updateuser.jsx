import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Updateuser = () => {
    const { id } = useParams();
    const [inputUser, setInputUser] = useState({
        name: "", 
        email: "", 
        phonenumber: "", 
        hobbies: ""
    });

   const handleChange = (event) => {
    setInputUser(prevInputUser => ({
        ...prevInputUser,
        [event.target.name]: event.target.value,
    }));
};

    const fetchSingleUser = async () => {
        const res = await axios.get(`http://localhost:5000/read/${id}`);
        setInputUser({
            name: res.data.name, 
            email: res.data.email, 
            phonenumber: res.data.phonenumber, 
            hobbies: res.data.hobbies
        });
    }; 

    useEffect(() => {
        fetchSingleUser();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault(); 
        console.log(inputUser);
        const res = await axios.put(
            `http://localhost:5000/updateuser/${id}`,
            inputUser
        );
        console.log(res);
    };

    return (
        <div className="bg-white p-8 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required value={inputUser.name} 
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required value={inputUser.email}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phonenumber" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                    <input type="text" id="phoneNumber" name="phonenumber" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required value={inputUser.phonenumber}
                    onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="hobbies" className="block text-gray-700 text-sm font-bold mb-2">Hobbies</label>
                    <input type="text" id="hobbies" name="hobbies" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    required value={inputUser.hobbies}
                    onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Updateuser;
