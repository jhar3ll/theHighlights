import React, { useEffect, useState } from 'react'
import { Tip } from '../../models';
import { TipsAPI } from '../../api/TipsAPI';

const AdminTips = () => {
  const [tips, setTips] = useState<Tip[]|null>(null);

  useEffect(() => {
    async function getTips(){
      const allTips = await TipsAPI.listTips();
      console.log(allTips);
      allTips && setTips(allTips);
    }

    getTips();
  },[]);

  return (
    <div>
      <ul>
        {tips && tips.map((tip, index) => (
          <li key={index} style={{gap: "10px", listStyle: "inside"}}>
              <span>Name: {tip.name} </span>
              <span>Amount: {tip.amount} </span>
              <span>Type: {tip.type.charAt(0) + tip.type.slice(1).toLowerCase()} </span>
              <span>Request {String(tip.requestInfo)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminTips;