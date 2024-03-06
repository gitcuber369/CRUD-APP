import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const ReadUser = () => {

    const { id } = useParams()
    const [userData, setUserData] = useState({})
    
    const fetchSingleUser = async () => {
        const res = await axios.get(`https://crud-app-6.onrender.com/read/${id}`);
        console.log(res);
        setUserData(res.data);
    }; 
    
    useEffect(() => {
        fetchSingleUser();
    }, [id]); // Added id to the dependency array to refetch data when id changes

    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"></th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Hobbies</th>
                        <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200"></td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{userData?.name}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{userData?.email}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{userData?.phonenumber}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{userData?.hobbies}</td>
                        <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{1}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ReadUser
