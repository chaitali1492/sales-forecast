import React from 'react';

import { StackChart } from './components';
import { getSalesData } from './utils/utils';

const App:React.FC = () => {

  return <StackChart data= {getSalesData()}/>
}

export default App;
