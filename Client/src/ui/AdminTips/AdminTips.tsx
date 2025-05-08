import "./AdminTips.css";
import { useEffect, useRef, useState } from 'react'
import { Tip } from '../../models';
import { TipsAPI } from '../../api/TipsAPI';
import { Icons, Library } from "../../lib/library";
import { monthNames } from "../../data/staticData";
import { removeAndLowercase } from "../../util/removeAndLowercase";
const { Chip, DateCalendar, TextField } = Library;
const { CalendarMonthIcon, SearchIcon } = Icons;

type chipType = {
  active: boolean
  label: string|number
  toggleType: "date"|"type"
  value: string|number
}

type tipsArrayType = Tip[]|null;

const AdminTips = () => {
  const today = new Date();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();
  const todayMonthLabel = monthNames[todayMonth];
  const [calendarDate, setCalendarDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [chips, setChips] = useState<chipType[]>([
    {active: false, label: "Requests", toggleType: "type", value: "REQUEST"},
    {active: false, label: "Donations", toggleType: "type", value: "DONATION"},
    {active: false, label: "Today", toggleType: "date", value: today.getDay()},
    {active: false, label: todayMonthLabel, toggleType: "date", value: todayMonth},
    {active: false, label: todayYear, toggleType: "date", value: todayYear},
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [tips, setTips] = useState<tipsArrayType>(null);
  const tipsBackup = useRef<tipsArrayType>(null);

  useEffect(() => {
    async function getTips(){
      if (tips) return;
      const allTips = await TipsAPI.listTips();
      // console.log(allTips);
      if (allTips){
        setTips(allTips);
        tipsBackup.current = allTips;
      }
    }

    getTips();
  },[tips]);

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

  function getChipToToggleIndex(allChips: chipType[], appliedChips: chipType[], currentChip: chipType): [number, number] {
    const indices = [allChips, appliedChips].map(chipArray => chipArray.findIndex(ac => (ac.toggleType === currentChip.toggleType) && ac.active && (ac.label !== currentChip.label)));
    return [indices[0], indices[1]];
  }

  function handleChip(index: number, chip: chipType){
    if (!tipsBackup.current) return;
    if (searchValue) setSearchValue("");
    const updatedChips = [...chips];
    updatedChips[index].active = !chip.active;

    const appliedChips = updatedChips.filter(chip => chip.active);
    let updatedTips = [...tipsBackup.current];

    if (appliedChips.length !== chips.length){ 
      const [allChipsToToggleIndex, appliedChipsToToggleIndex] = getChipToToggleIndex(updatedChips, appliedChips, chip);
      if ((appliedChips.length > 1) && (appliedChipsToToggleIndex >= 0)){
        updatedChips[allChipsToToggleIndex].active = false;
        appliedChips.splice(appliedChipsToToggleIndex, 1);
      } 
      updatedTips = [...tipsBackup.current].filter(tip => appliedChips.every(chip => filterTip(chip, tip)))
    }
    setChips(updatedChips);
    setTips(updatedTips);
  }

  function handleTipSearch(event: React.ChangeEvent<HTMLInputElement>){
    const { value } = event.target;
    const arrayToCheck = !value || value.length < searchValue.length ? tipsBackup.current || [] : tips ? [...tips] : [];
    setSearchValue(value);
    setTips(arrayToCheck.filter(tip => {
      const checker = (tip.type === "REQUEST" ? (String(tip.requestInfo)).toLowerCase() : "") + tip.name.toLowerCase() + (tip.message ? tip.message.toLowerCase() :  "");
      return checker.includes(value);
    }));
  }

  function resetChips(){
    if (chips.some(chip => chip.active))
    setChips(prevState => prevState.map(chip => ({...chip, active: false})));
    setTips(tipsBackup.current);
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
      <div className="tipsSearchAndDateContainer">
        <TextField 
          onChange={handleTipSearch}
          onFocus={resetChips}
          placeholder="Search..."
          slotProps={{ input: { startAdornment: <SearchIcon /> }}}
          value={searchValue}
        />
        <CalendarMonthIcon fontSize="large" htmlColor="white" />
      </div>
      <table className='tipListContainer'>
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Name</th>
            <th>Song</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
        {tips && tips.map((tip, index) => (
          <tr key={index}>
            <td>{tip.type[0] + tip.type.slice(1).toLowerCase()}</td>
            <td>${tip.amount.toFixed(2)}</td>
            <td>{tip.name}</td>
            <td>{tip.type === "REQUEST" && !!tip.requestInfo && tip.requestInfo !== "null" ? tip.requestInfo : "-"}</td>
            <td>{tip.message && tip.message !== "null" ? tip.message :  "-"}</td>
            <td>{tip.createdAt ? new Date(tip.createdAt).toLocaleDateString() : new Date().toLocaleDateString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTips;