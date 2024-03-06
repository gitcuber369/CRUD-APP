import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const Home = () => {
    // Whole Data Fetching  
    const [inputUser, setInputUser] = useState({
        name: "", 
        email: "", 
        phonenumber: "", 
        hobbies: ""
    })

    const handleChange = (event) => {
        if (event && event.target) {
            setInputUser({
                ...inputUser,
                [event.target.name]: event.target.value,
            });
        }
    };
    
    const  handleSubmit= async(event) => {
        event.preventDefault(); 
        const res = await axios.post("https://crud-app-6.onrender.com/createuser",inputUser )
        console.log(res);
        fetchAllUser();

    }

    const [userData, setUserData] = useState([])
    const fetchAllUser = async () => {
        const res = await axios.get("https://crud-app-6.onrender.com/readuserdata");
        console.log(res);
        setUserData(res.data);
    }; 
    useEffect(() => {
        fetchAllUser();
    }, []);

    const handleDelete=async(id) => {
        const res = await axios.delete(`https://crud-app-6.onrender.com/delete/${id}`)
        if(res.status===200){
            fetchAllUser();
        }
    }

    const [showForm, setShowForm] = useState(false);

    const handleAddUserClick = () => {
        setShowForm(true);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
                 <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Hobbies</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {userData.map((item, index) => (
    <tr key={item.id}>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"></td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item?.name}</td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item?.email}</td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item?.phonenumber}</td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{item?.hobbies}</td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{index + 1}</td>
        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
        <NavLink onClick={() => handleDelete(item._id)} className="w-10 md:w-32 lg:w-48 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-1 sm:w-24 md:w-32 lg:w-48">Delete </NavLink>
        <NavLink to={`/updateuser/${item._id}`} className="w-10 md:w-32 lg:w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-1 sm:w-24 md:w-32 lg:w-48">Update</NavLink>
        <NavLink to={`/readuser/${item._id}`} className="w-10 md:w-32 lg:w-48 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full sm:w-24 md:w-32 lg:w-48">View </NavLink>

        </td>
    </tr>
))}



                </tbody>
            </table>
            <div className="flex justify-center">
    <button onClick={handleAddUserClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 sm:w-auto">Add User</button>

</div>
            {showForm && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-8 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Add New User</h2>
                        <form onSubmit={handleSubmit} className="w-full sm:w-96">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                                <input type="text" id="name" name="name" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required value = {inputUser.name} 
                                onChange={handleChange}/>
                    
                            </div>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                                <input type="email" id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                required value = {inputUser.email}
                                onChange={handleChange}/>
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
                                required value = {inputUser.hobbies}
                                onChange={handleChange}/>
                            </div>
                            <div className="flex items-center justify-between">
                            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                            <button type="button" onClick={() => setShowForm(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Back</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
