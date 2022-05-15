import { FC } from "react";

const DownloadIcon: FC<{ disabled: boolean }> = ({ disabled }) => {
  return (
	<svg version="1.1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 485 485" fill={disabled ? 'rgba(16, 16, 16, 0.3)' : '#5d5d5d'}>
	  <g>
	    <polygon points="380.926,115.57 321.93,115.57 321.93,0 163.07,0 163.07,115.57 104.074,115.57 242.5,267.252 " />
	    <path d="M0,310v175h485V310H0z M330,412.5c-8.284,0-15-6.716-15-15s6.716-15,15-15c8.284,0,15,6.716,15,15S338.284,412.5,330,412.5
	  		z M400,412.5c-8.284,0-15-6.716-15-15s6.716-15,15-15c8.284,0,15,6.716,15,15S408.284,412.5,400,412.5z" />
	  </g>
	</svg>
  )
} 

export default DownloadIcon;
