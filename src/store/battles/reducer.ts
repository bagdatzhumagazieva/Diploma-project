import { combineReducers } from 'redux';
import { ActionType, ILoadTypes } from 'src/core/store/types';
import {
  CREATE_BATTLE_TEST,
  GET_BATTLE_TEST,
  GET_EMPLOYMENT_BATTLES,
  GET_BATTLE_EMPLOYEES,
  GET_BATTLES_AGGREGATOR,
  GET_BATTLE_BY_ID,
  CREATE_BATTLE,
  BattlesEmployeeTypes,
  BattleTestTypes,
  AttemptBattleTypes,
  BattleEmployeesTypes,
  BattleAggregatorTypes,
} from 'src/store/battles/types';
import {
  parseAttemptBattle,
  parseBattleEmployees, parseBattlesAggregator,
  parseBattleTest,
  parseEmployeeBattles,
  parseBattle,
} from 'src/store/battles/parsers';

const employeeBattles = (
  state = { data: null, loading: false },
  action: ActionType<BattlesEmployeeTypes.IResponseProps>,
): ILoadTypes<BattlesEmployeeTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_EMPLOYMENT_BATTLES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_EMPLOYMENT_BATTLES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_EMPLOYMENT_BATTLES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseEmployeeBattles(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const battleTests = (
  state = { data: null, loading: false },
  action: ActionType<BattleTestTypes.IResponseProps>,
): ILoadTypes<BattleTestTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_BATTLE_TEST.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BATTLE_TEST.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BATTLE_TEST.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseBattleTest(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const createdBattleState = (
  state = { data: null, loading: false },
  action: ActionType<any>,
): ILoadTypes<any | null> => {
  switch (action.type) {
    case CREATE_BATTLE.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_BATTLE.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_BATTLE.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      return {
        data: action.data,
        loading: false,
      };
    default:
      return state;
  }
};

const attemptBattleResponse = (
  state = { data: null, loading: false },
  action: ActionType<AttemptBattleTypes.IResponseProps[]>,
): ILoadTypes<AttemptBattleTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case CREATE_BATTLE_TEST.started:
      return {
        data: null,
        loading: true,
      };
    case CREATE_BATTLE_TEST.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_BATTLE_TEST.clear:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case CREATE_BATTLE_TEST.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseAttemptBattle(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const battleEmployees = (
  state = { data: null, loading: false },
  action: ActionType<BattleEmployeesTypes.IResponseProps[]>,
): ILoadTypes<BattleEmployeesTypes.IRenderProps[] | null> => {
  switch (action.type) {
    case GET_BATTLE_EMPLOYEES.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BATTLE_EMPLOYEES.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BATTLE_EMPLOYEES.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseBattleEmployees(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const battlesAggregator = (
  state = { data: null, loading: false },
  action: ActionType<BattleAggregatorTypes.IResponseProps>,
): ILoadTypes<BattleAggregatorTypes.IRenderProps | null> => {
  switch (action.type) {
    case GET_BATTLES_AGGREGATOR.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BATTLES_AGGREGATOR.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BATTLES_AGGREGATOR.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseBattlesAggregator(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const battle = (
  state = { data: null, loading: false },
  action: ActionType<BattleAggregatorTypes.IResponseBattle>,
): ILoadTypes<BattleAggregatorTypes.IRenderBattle | null> => {
  switch (action.type) {
    case GET_BATTLE_BY_ID.started:
      return {
        data: null,
        loading: true,
      };
    case GET_BATTLE_BY_ID.failed:
      return {
        data: null,
        errorMessage: action.errorMessage,
        loading: false,
      };
    case GET_BATTLE_BY_ID.success:
      if (!action.data) {
        return {
          data: null,
          loading: false,
        };
      }
      const parsed = parseBattle(action.data);
      return {
        data: parsed,
        loading: false,
      };
    default:
      return state;
  }
};

const battlesReducer = combineReducers({
  employeeBattles,
  battle,
  battleTests,
  attemptBattleResponse,
  battleEmployees,
  battlesAggregator,
  createdBattleState,
});

export default battlesReducer;
