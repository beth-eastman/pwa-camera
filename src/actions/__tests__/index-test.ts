import {
  SET_PAGE_TITLE,
  SET_USER_PLATFORM,
  EULA_ACCEPTED,
  T2_APP_MESSAGE_START,
  T2_APP_MESSAGE_CLEAR,
  EULA_REJECTED,

  eulaAccepted,
  setUserPlatform,
  setPageTitle,
  messageStart,
  messageClear,
  eulaRejected,
  sendMessage
} from '../'

import reducer from '../../reducers';
/**
 * Tests for index actions
 */
jest.useFakeTimers();

export const initState = (type: string = 'initial test action') => {
  return reducer(undefined,{type});
}
describe("Index actions tests",() => {

  beforeEach(() => {
    Object.defineProperty((global as any).navigator, 'app',
      {
          value: {exitApp: jest.fn()},
          configurable: true,
          writable: true
      });

    Object.defineProperty((global as any), 'clearTimeout',
      {
          value: jest.fn(),
          configurable: true,
          writable: true
      });
  });

  /**
   * Standard redux actions are trivial so I'm lumping them into one test
   */
  it('Tests all simple actions return correct objects',() => {

     expect(eulaAccepted()).toEqual({type: EULA_ACCEPTED});
     expect(setUserPlatform('marklar')).toEqual({type: SET_USER_PLATFORM,platform: 'marklar'});
     expect(setPageTitle("Rad title")).toEqual({type: SET_PAGE_TITLE,title: 'Rad title'});
     expect(messageStart("Hey Hey Hey")).toEqual({type: T2_APP_MESSAGE_START,message: 'Hey Hey Hey'});
     expect(messageClear()).toEqual({type: T2_APP_MESSAGE_CLEAR});

  });

  it("Should dispatch all correct eulaRejected actions and navigator.app.exitApp",() => {
      const dispatchMock = jest.fn();
      let currentState = initState("Should dispatch all correct eulaRejected actions and side effects");
      const eulaRejectedThunk = eulaRejected();
      expect((global as any).navigator.app.exitApp.mock.calls.length).toBe(0);
      eulaRejectedThunk(dispatchMock,() => currentState,{platform: 'android'});
      expect((global as any).navigator.app.exitApp.mock.calls.length).toBe(1);
      expect(dispatchMock.mock.calls.length).toBe(1);
      const rejectAction = dispatchMock.mock.calls[0][0];

      expect(rejectAction.type).toBe(EULA_REJECTED);


  });

  it("Should dispatch all correct eulaRejected actions and NOT navigator.app.exitApp",() => {
      const dispatchMock = jest.fn();
      let currentState = initState("Should dispatch all correct eulaRejected actions and side effects");
      const eulaRejectedThunk = eulaRejected();
      expect((global as any).navigator.app.exitApp.mock.calls.length).toBe(0);
      eulaRejectedThunk(dispatchMock,() => currentState,{platform: 'ios'});
      expect((global as any).navigator.app.exitApp.mock.calls.length).toBe(0);
      expect(dispatchMock.mock.calls.length).toBe(1);
      const rejectAction = dispatchMock.mock.calls[0][0];

      expect(rejectAction.type).toBe(EULA_REJECTED);


  });


  it('Should set and clear the system flash message', () => {
    const dispatchMock = jest.fn();
    let currentState: any = initState("Should set and clear the system flash message");
    expect(currentState.view.flash.message).toBe("");
    expect(currentState.view.flash.open).toBe(false);
    const messageStartAction = messageStart("It's a message!");
    expect(messageStartAction).toEqual({
      type: T2_APP_MESSAGE_START,
      message: "It's a message!"
    });
    currentState = reducer(currentState,messageStartAction);
    expect(currentState.view.flash.message).toBe("It's a message!");
    expect(currentState.view.flash.open).toBe(true);

    const messageClearAction = messageClear();
    expect(messageClearAction).toEqual({
      type: T2_APP_MESSAGE_CLEAR
    });

    currentState = reducer(currentState,messageClearAction);
    expect(currentState.view.flash.message).toBe("");
    expect(currentState.view.flash.open).toBe(false);

    sendMessage("Holy flurking snit")(dispatchMock,() => currentState);

    expect(dispatchMock.mock.calls.length).toBe(1);
    const messageStartAction2 = dispatchMock.mock.calls[0][0];
    expect(messageStartAction2).toEqual({
      type: T2_APP_MESSAGE_START,
      message: "Holy flurking snit"
    });
    
    expect((setTimeout as any).mock.calls.length).toBe(1);
    expect((setTimeout as any).mock.calls[0][1]).toBe(3000);
    jest.runAllTimers();

    expect(dispatchMock.mock.calls.length).toBe(2);
    const messageClearAction2 = dispatchMock.mock.calls[1][0];

    expect(messageClearAction2).toEqual({
      type: T2_APP_MESSAGE_CLEAR
    });
    expect((global as any).clearTimeout.mock.calls.length).toBe(0);
    sendMessage("Holy flurking snit #2")(dispatchMock,() => currentState);
    expect((global as any).clearTimeout.mock.calls.length).toBe(1);
  });


});