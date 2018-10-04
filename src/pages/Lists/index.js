import React, { PureComponent } from 'react';
// import Helmet from 'react-helmet';

import './styles.scss';
import ListsOverview from '../../components/ListsOverview';
import Button from '../../components/FloatingCircleButton';

const LISTS = [
  { date: '22/03/18', name: 'IT companies', amount: 37 },
  { date: '22/03/18', name: 'Real estate agencies', amount: 11 },
  { date: '22/03/18', name: 'Hairdressers', amount: 4 },
  { date: '22/03/18', name: 'IT companies', amount: 37 },
  { date: '22/03/18', name: 'Real estate agencies', amount: 11 },
  { date: '22/03/18', name: 'Hairdressers', amount: 4 },
  { date: '22/03/18', name: 'IT companies', amount: 37 },
  { date: '22/03/18', name: 'Real estate agencies', amount: 11 },
  { date: '22/03/18', name: 'Hairdressers', amount: 4 },
  {
    date: '22/03/18',
    name:
      'List with a really long  really really really really really really really really really really really really',
    amount: 4
  }
];

export default class Lists extends PureComponent {
  addNewList = () => {
    // do stuff
    console.log('clicked');
  };

  render() {
    return (
      <div className="Lists">
        <ListsOverview data={LISTS} />
        <Button className="button-primary">+ Analyze URL(&#39;s)</Button>
      </div>
    );
  }
}
