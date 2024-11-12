import React from 'react';
import './Table.css';
import { HiDotsHorizontal } from "react-icons/hi";


const Table = ({ lst }) => {
  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Candidate Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Experience</th>
            <th>Skill / Technology</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {lst.map((candidate, index) => {
            return (
              <tr key={index}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>+91 - {candidate.phone}</td>
                <td>{candidate.experience}</td>
                <td>{candidate.skills.join(', ')}</td> 
                <td>
                  <button>{<HiDotsHorizontal size={24}/>}</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
