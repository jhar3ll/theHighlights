import "./Confirm.css";

const Confirm = () => {
  const { amount, artist, email, message, name, paymentId, redirect_status, song } = Object.fromEntries(new URLSearchParams(window.location.search).entries());

  const Failure = () => {
    return (
      <div className="confirmContainer">
        <h3 className='tipError'>There was an error processing your payment.</h3>
        <h3 className='tipError'>Please try again.</h3>
      </div>
    )
  }
  const Success = () => {
    return (
      <div className="confirmContainer">
        <h2 className='tipThanks'>{`Thank you for the Tip, ${name}`}!</h2>
        <div className="tipReviewContainer">
          <div className="songRequestedInfoContainer">
              <h3>Payment ID: </h3>
              &nbsp;
              <h3 className="songRequestedSongInfo">{paymentId}</h3>
          </div>
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
              <h3 className="songRequestedSongInfo">${(Number(amount) / 100).toFixed(2)}</h3>
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
    )
  }
  return (
    <div className="confirmMain">
      {
        !redirect_status || redirect_status === "succeeded" ? <Success /> : <Failure />
      }
    </div>
  )
}

export default Confirm
