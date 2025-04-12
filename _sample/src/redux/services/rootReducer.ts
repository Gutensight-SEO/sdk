/** @format */

import { combineReducers } from "redux";

import authReducer from "../features/auth/slice.auth.ts";
import homeReducer from "../features/dashboard/home/slice.home.ts";
import feedReducer from "../features/dashboard/feeds/slice.feeds.ts";
import profileReducer from "../features/dashboard/profile/slice.profile.ts";
import messageReducer from "../features/dashboard/communications/messages/slice.messages.ts";
import notificationReducer from "../features/dashboard/communications/notifications/slice.notifications.ts";
import settingReducer from "../features/dashboard/settings/slice.setting.ts";
import updateProfileReducer from "../features/dashboard/settings/updateProfile/slice.updateProfile.ts";
import subscriptionReducer from "../features/dashboard/subscription/slice.subscription.ts";

const appReducer = combineReducers({
  auth: authReducer,
  home: homeReducer,
  feeds: feedReducer,
  profile: profileReducer,
  messages: messageReducer,
  notifications: notificationReducer,
  setting: settingReducer,
  updateProfile: updateProfileReducer,
  subscription: subscriptionReducer,
});

const rootReducer = (state: any, action: any) => {
  // When RESET_APP_STATE action is dispatched, reset all states to initial
  if (action.type === 'RESET_APP_STATE') {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
