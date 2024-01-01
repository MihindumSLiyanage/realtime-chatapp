export const host = "http://localhost:5000";

export const loginRoute = `${host}/api/user/login`;
export const registerRoute = `${host}/api/user/register`;
export const logoutRoute = `${host}/api/user/logout`;
export const allUsersRoute = `${host}/api/user`;
export const setAvatarRoute = `${host}/api/user/setavatar`;

export const sendMessageRoute = `${host}/api/messages/addMessage`;
export const recieveMessageRoute = `${host}/api/messages/getMessages`;