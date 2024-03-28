import React from 'react';

function ActivityCard({ startDate, endDate, title, description, imageUrl, details }) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-xl-7 h-100 containerCARD" style={{ paddingTop: '100px' }}>
          <div className="cardEffect" style={{ width: '80%' }}>
            <img className="card-img" src={imageUrl} alt="活動圖片" style={{ width: '100%' }} />
          </div>
        </div>
        <div className="col-xl-5 mt-5 pt-5" style={{ marginLeft: '50px' }}>
          <p>{startDate} - {endDate}</p>
          <h1><b>{title}</b></h1>
          <h4><b>{description}</b></h4>
          <div>
            {details.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityCard;
