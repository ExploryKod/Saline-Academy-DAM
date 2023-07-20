import './TabMenu.css'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function TabMenu ({ givePage }) {
	const [value, setValue] = React.useState('one');


	const pageChange = () => {
		if (value === "one") {
			return givePage(value)
		}
		if (value === "two") {
			return givePage(value)
		}
		
		if (value === "three") {
			return givePage(value)
		}
		if (value === "four") {
			return givePage(value)
		}
	}

	const handleChange = (event, newValue) => {
	  setValue(newValue);
	};
	
  
	return (
		<div className='tabMenu'>
		<Box sx={{ width: '100%' }}>
		<Tabs
		  onClick={pageChange}
		  value={value}
		  onChange={handleChange}
		  textColor="secondary"
		  indicatorColor="secondary"
		  aria-label="secondary tabs example"
		>
		  <Tab value="one" label="Summary" />
		  <Tab value="two" label="Document" />
		  <Tab value="three" label="Rush" />
		  <Tab value="four" label="Planning" />
		</Tabs>
	  	</Box>
		</div>

	);
  };

export default TabMenu