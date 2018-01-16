import {
  SET_PAGE_TITLE,
  // SET_USER_PLATFORM,
  // EULA_ACCEPTED,
  T2_APP_MESSAGE_START,
  T2_APP_MESSAGE_CLEAR,
  // EULA_REJECTED,

  eulaAccepted,
  setUserPlatform,
  setPageTitle,
  eulaRejected,
  sendMessage,
  messageClear,
  messageStart
} from '../../actions';

import reducer from '../../reducers';
/**
 * Tests for index actions
 */
jest.useFakeTimers();

export const initState = (type: string = 'initial test action') => {
  return reducer(undefined,{type});
}
describe("Index reducers tests",() => {
  it("Accepts the EULA",() =>  {
      let currentState: any = initState("Accepts the EULA");
      expect(currentState.settings.eulaAccepted).toBe(false);
      currentState = reducer(currentState,eulaAccepted());
      expect(currentState.settings.eulaAccepted).toBe(true);
  });

  it("Rejects the EULA",() =>  {
      let currentState: any = initState("Rejects the EULA");
      const dispatchMock = jest.fn();
      currentState = reducer(currentState,eulaAccepted());
      expect(currentState.settings.eulaAccepted).toBe(true);
      const eulaRejectedThunk = eulaRejected();
      eulaRejectedThunk(dispatchMock,() => currentState,{platform: 'browser'});
      expect(dispatchMock.mock.calls.length).toBe(1);
      const eulaRejectedAction = dispatchMock.mock.calls[0][0];
      currentState = reducer(currentState,eulaRejectedAction);
      expect(currentState.settings.eulaAccepted).toBe(false);
  });

  it("Sets the user platform",() =>  {
      let currentState: any = initState("Sets the user platform");
      expect(currentState.user.platform).toBe("unknown");
      currentState = reducer(currentState,setUserPlatform("android"));
      expect(currentState.user.platform).toBe("android");
  })

  it("Should set the redux page title",() => {
    let currentState: any = initState("Should set the redux page title");
    expect(currentState.view.page.title).toBe("");
    const setPageTitleAction = setPageTitle("Fow sheezay");
    expect(setPageTitleAction).toEqual({
      type: SET_PAGE_TITLE,
      title: "Fow sheezay"
    });

    currentState = reducer(currentState,setPageTitleAction);
    expect(currentState.view.page.title).toBe("Fow sheezay");
  });

  it('Should set and clear the system flash message state', () => {
    const dispatchMock = jest.fn();
    let currentState: any = initState("Should set and clear the system flash message state");
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

    jest.runAllTimers();

  });


});
