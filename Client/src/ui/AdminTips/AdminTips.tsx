import "./AdminTips.css";
import { useEffect, useRef, useState } from 'react'
import { Tip } from '../../models';
import { TipsAPI } from '../../api/TipsAPI';
import { Library } from "../../lib/library";
import { monthNames } from "../../data/staticData";
const { Chip } = Library;

type chipType = {
  active: boolean
  label: string|number
  value: string|number
}

type tipsArrayType = Tip[]|null;

const AdminTips = () => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const todayMonthLabel = monthNames[todayMonth];
  const [chips, setChips] = useState<chipType[]>([
    {active: false, label: "Today", value: today.getDay()},
    {active: false, label: "Requests", value: "REQUEST"},
    {active: false, label: "Tips", value: "DONATION"},
    {active: false, label: todayMonthLabel, value: todayMonth},
    {active: false, label: todayYear, value: todayYear}
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
    setTips([...tipsBackup.current].filter(tip => appliedChips.every(chip => filterTip(chip, tip))));
    //take all tips and filter by appliedChips array
  }

  function filterTip(chip: chipType, tip: Tip){
    if (["Today", todayMonthLabel, todayYear].includes(chip.label)){
      if (!tip.createdAt){
        return true;
      } else {
        const createdAt = new Date(tip.createdAt);
        const chipMap = {
          Today: createdAt.toDateString() === today.toDateString(),
          [todayMonthLabel]: `${createdAt.getMonth()}-${createdAt.getFullYear()}` === `${todayMonth}-${todayYear}`,
          [todayYear]: createdAt.getFullYear() === todayYear
        }
        return chipMap[chip.label];
      } 
    } else return chip.label === "Requests" ? tip.type === "REQUEST" : tip.type === "DONATION";
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
      <table className='tipListContainer'>
        <thead>
          <th>Type</th>
          <th>Amount</th>
          <th>Name</th>
          <th>Song</th>
          <th>Message</th>
          <th>Date</th>
        </thead>
        {tips && tips.map((tip, index) => (
          <tbody>
            <tr>
              <td>{tip.type[0] + tip.type.slice(1).toLowerCase()}</td>
              <td>${tip.amount.toFixed(2)}</td>
              <td>{tip.name}</td>
              <td>{tip.type === "REQUEST" && !!tip.requestInfo && tip.requestInfo !== "null" ? tip.requestInfo : "-"}</td>
              <td>{tip.message && tip.message !== "null" ? tip.message :  "-"}</td>
              <td>{tip.createdAt ? new Date(tip.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  )
}

export default AdminTips;