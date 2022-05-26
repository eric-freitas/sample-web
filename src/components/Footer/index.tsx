import React from 'react';

import './index.scss';

const Footer:React.FC<any> = ({ children, className, ...props }) => {
    
	return (<footer className={`footer ${className || ""}`} {...props}>
                {children}
            </footer>);
}
  
export default Footer;