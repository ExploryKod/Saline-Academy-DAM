import './TabMenu.css'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Tabmenu () {
	const [value, setValue] = React.useState('one');

	const pageChange = () => {
		if (value === "one") {
			return "Summary"
		}
		if (value === "two") {
			return "Document"
		}
		
		if (value === "three") {
			return "Rush"
		}
		if (value === "four") {
			return "Planning"
		}
		console.log(value);
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

export default Tabmenu