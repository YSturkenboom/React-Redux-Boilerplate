// const initialState = [
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'IT companies',
//     amount: 37
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Real estate agencies',
//     amount: 11
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Hairdressers',
//     amount: 4
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'IT companies',
//     amount: 37
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Real estate agencies',
//     amount: 11
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Hairdressers',
//     amount: 4
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'IT companies',
//     amount: 37
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Real estate agencies',
//     amount: 11
//   },
//   {
//     id: '123456789dsfasdfewr32',
//     date: '22/03/18',
//     name: 'Hairdressers',
//     amount: 4
//   },
//   {
//     date: '22/03/18',
//     name:
//       'List with a really long  really really really really really really really really really really really really',
//     amount: 4
//   }
// ];

const initialState = {
  data: [],
  isLoading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LISTS_LIST_REQUEST_SUCCESS': {
      console.log('halloo', action);
      const { data } = action.result;
      return { data, isLoading: false };
    }
    case 'LISTS_LIST_REQUEST_FAIL': {
      return {};
    }
    case 'SINGLE_LIST_REQUEST_SUCCESS': {
      return {};
    }

    case 'SINGLE_LIST_REQUEST_FAIL': {
      return {};
    }

    default:
      return state;
  }
};
