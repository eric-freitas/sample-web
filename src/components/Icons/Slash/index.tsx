import React from 'react';
import BaseIcon from '../Icon/BaseIcon';

import './index.scss';

export default class IconSlash extends BaseIcon {
    width     = 246;
    height    = 246;
    className = "icon-slash";
    content   = ( 
        <g>
            <path 
                className   = "slash-light"  
                d           = "m 32.4075,40.5526 c -2.249,-2.249 -2.249,-5.8961 0,-8.1451 2.249,-2.249 5.8961,-2.249 8.1451,0 l 172.8,172.8 c 2.249,2.249 2.249,5.8961 0,8.1451 -2.249,2.249 -5.8961,2.249 -8.1451,0 z" 
            /> 
            <path 
                className   = 'slash-dark' 
                d           = "m 20.1902,60.9144 c -4.498,-4.498 -4.498,-11.7915 0,-16.2896 4.498,-4.498 11.7915,-4.498 16.2896,0 L 201.135,209.28 c 4.498,4.4981 4.498,11.7916 0,16.2896 -4.498,4.498 -11.7916,4.498 -16.2896,0 z"
            />
        </g>
    )
}
  
