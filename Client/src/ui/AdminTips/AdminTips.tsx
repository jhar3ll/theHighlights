import "./AdminTips.css";
import { useEffect, useRef, useState } from 'react'
import { Tip } from '../../models';
import { TipsAPI } from '../../api/TipsAPI';
import { Library } from "../../lib/library";
import { monthNames } from "../../data/staticData";
const { Chip } = Library;

type chipType = {
  active: boolean
  field: string
  label: string|number
  value: string|number
}

type tipsArrayType = Tip[]|null;

const AdminTips = () => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const [chips, setChips] = useState<chipType[]>([
    {active: false, field: "createdAt", label: "Today", value: today.getDay()},
    {active: false, field: "type", label: "Requests", value: "REQUEST"},
    {active: false, field: "type", label: "Tips", value: "DONATION"},
    {active: false, field: "createdAtMonth", label: monthNames[todayMonth], value: todayMonth},
    {active: false, field: "createdAtYear", label: todayYear, value: todayYear}
  ]);
  const [tips, setTips] = useState<tipsArrayType>(null);
  const tipsBackup = useRef<tipsArrayType>(null);

  useEffect(() => {
    async function getTips(){
      const allTips = await TipsAPI.listTips();
      // console.log(allTips);
      if (allTips){
        setTips(allTips);
        tipsBackup.current = allTips;
      }
    }

    getTips();
  },[]);

  function handleChip(index: number, chip:chipType){
    const chipsCopy = [...chips];
    chipsCopy[index].active = !chip.active;
    setChips(chipsCopy);
    handleChipFilter(chip);
  }

  function handleChipFilter(chip: chipType){
    if (!tipsBackup.current) return;
    const appliedChips = chips.filter(chip => chip.active);
    if (appliedChips.length === chips.length) return setTips(tipsBackup.current);

    const tipsToFilter = [...tipsBackup.current];
    //take all tips and filter by appliedChips array
  }

  return (
    <div className="adminTipsMain">
      <div className="tipFilterChipContainer">
        {chips.map((chip, index) => 
          <Chip 
            key={index} 
            clickable
            color={chip.active ? "info" : "default"} 
            label={chip.label} 
            onClick={() => handleChip(index, chip)}
          />
        )}
      </div>
      <div className='tipListContainer'>
        {tips && tips.map((tip, index) => (
          <div className="tipListItem"key={index}>
            <h2 className='tipValue'>{tip.type === "DONATION" ? "Donation" : "Song Request"}</h2>
            <span className='tipField'>Name: 
              <span className='tipValue'>{tip.name.charAt(0).toUpperCase() + tip.name.slice(1)}</span> 
            </span>
            <span className='tipField'>Tip Amount: 
              <span className='tipAmount'>${tip.amount.toFixed(2)}</span>
            </span>
            { tip.type === "REQUEST" && <span className='tipField'>Song Requested: 
                <span className='tipValue'>{tip.requestInfo}</span>
              </span>
            }
            { tip.email && tip.email !== "null" && <span className='tipField'>Email: 
                <span className='tipValue'>{tip.email}</span>
              </span>
            }
            { tip.message && tip.message !== "null" && <span className='tipField'>Message: 
                <span className='tipValue'>{tip.message}</span>
              </span>
            }
            <span className='tipField'>Date: 
              <span className='tipAmount'>{new Date(tip.createdAt || "").toLocaleString()}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminTips;