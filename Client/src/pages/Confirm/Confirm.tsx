import "./Confirm.css";

const Confirm = () => {
  const { amount, artist, email, message, name, song } = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  return (
    <div className="confirmMain">
      <div className="confirmContainer">
      <h2 className='tipThanks'>Thank you for the Tip, {name}!</h2>
      <div className="tipReviewContainer">
        {!!song && 
            <div className="songRequestedInfoContainer">
                <h3>Song Requested: </h3>
                &nbsp;
                <h3 className="songRequestedSongInfo">{artist} - {song}</h3>
            </div>
        }
        <div className="songRequestedInfoContainer">
            <h3>Tip Amount: </h3>
            &nbsp;
            <h3 className="songRequestedSongInfo">${amount}</h3>
        </div>
        {email !== "null" && 
          <div className="songRequestedInfoContainer">
            <h3>Email: </h3>
            &nbsp;
            <h3 className="songRequestedSongInfo">{email}</h3>
          </div>
        }
        {message && 
          <div className="songRequestedInfoContainer">
            <h3>Message: </h3>
            &nbsp;
            <h3 className="songRequestedSongInfo">{message}</h3>
          </div>
        }
    </div>
    </div>
    </div>
  )
}

export default Confirm
