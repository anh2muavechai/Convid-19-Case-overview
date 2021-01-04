import React from "react";
 
const CaseItem = function(props) {
  return (
    <div className="case-item">
		<div className="row">
			<div className="col-4 item">
				Total cases <br/>
				<span id="case-confirmed" className="text-primary">
					<b>{ props.status.Confirmed }</b>
				</span>
			</div>
			<div className="col-4 item">
				Recovered <br/>
				<span id="case-recovered" className="text-success">
					<b>{ props.status.Recovered }</b>
				</span>
			</div>
			<div className="col-4 item">
				Deaths <br/>
				<span id="case-deaths" className="text-danger">
					<b>{ props.status.Deaths }</b>
				</span>
			</div>
		</div>
	</div>
  )
}
 
export default CaseItem;