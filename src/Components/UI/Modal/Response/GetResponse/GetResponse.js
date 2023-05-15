import React, { useState, useEffect } from 'react';
import axios from '../../../../../config/axios-firebase';
import moment from 'moment';

function GetResponse() {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axios.get('/responses.json')
      .then(response => {
        const responseData = response.data;
        const fetchedResponses = [];
        for (let key in responseData) {
          fetchedResponses.push({
            ...responseData[key],
            id: key,
          });
        }
        fetchedResponses.reverse();
        setResponses(fetchedResponses);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);



  return (
    <div>
        {responses.map(response => (
            <div key={response.id}>
                <p>{response.contenu}</p>
                <p>{response.auteur}</p>
                <p>{moment(response.date).fromNow()}</p>
            </div>
        ))}
     
    </div>
  );
}

export default GetResponse;
