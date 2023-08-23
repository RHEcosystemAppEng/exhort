import { useCallback, useReducer } from 'react';
import { IExtraColumnData, SortByDirection } from '@patternfly/react-table';

import { Page, SortBy } from '../common/types';

// Actions
enum ActionType {
  SET_PAGE,
  SET_SORT_BY,
}

// An interface for our actions
type Action = {
  type: ActionType;
  payload: Page | SortBy;
};

// State
type State = Readonly<{
  changed: boolean;

  currentPage: Page;
  sortBy?: SortBy;
}>;

const defaultState: State = {
  changed: false,

  currentPage: {
    page: 1,
    perPage: 10,
  },
  sortBy: undefined,
};

// Reducer

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SET_PAGE: {
      const payload = action.payload as Page;
      return {
        ...state,
        changed: true,
        currentPage: {
          page: payload.page,
          perPage: payload.perPage,
        },
      };
    }
    case ActionType.SET_SORT_BY: {
      const payload = action.payload as SortBy;
      return {
        ...state,
        changed: true,
        sortBy: {
          index: payload.index,
          direction: payload.direction,
        },
      };
    }
    default:
      return state;
  }
};

// Hook

interface HookArgs {
  page?: Page;
  sortBy?: SortBy;
}

interface HookState {
  page: Page;
  sortBy?: SortBy;
  changePage: (page: { page: number; perPage?: number }) => void;
  changeSortBy: (
    event: React.MouseEvent,
    index: number,
    direction: SortByDirection,
    extraData: IExtraColumnData,
  ) => void;
}

export const useTableControls = (args?: HookArgs): HookState => {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    currentPage: args && args.page ? { ...args.page } : { ...defaultState.currentPage },
    sortBy: args && args.sortBy ? { ...args.sortBy } : defaultState.sortBy,
  });

  const handlePageChange = useCallback((newPage: { page: number; perPage?: number }) => {
    dispatch({
      type: ActionType.SET_PAGE,
      payload: {
        page: newPage.page >= 1 ? newPage.page : 1,
        perPage: newPage.perPage ?? defaultState.currentPage.perPage,
      },
    });
  }, []);

  const handleSortByChange = useCallback(
    (
      event: React.MouseEvent,
      index: number,
      direction: SortByDirection,
      extraData: IExtraColumnData,
    ) => {
      dispatch({
        type: ActionType.SET_SORT_BY,
        payload: {
          index: index,
          direction: direction,
        },
      });
    },
    [],
  );

  return {
    page: state.currentPage,
    sortBy: state.sortBy,
    changePage: handlePageChange,
    changeSortBy: handleSortByChange,
  };
};
