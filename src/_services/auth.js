import AsyncStorage from '@react-native-community/async-storage';

export const USER_KEY = 'auth-demo-key';
export const TOKEN = 'jwt-auth-token';

export const onSignIn = user => {
  console.log('onSignIn');
  console.log(user);
  const token = JSON.parse(user).token;
  AsyncStorage.multiSet(
    [[USER_KEY, 'true'], ['user', user], [TOKEN, token]],
    err => {
      console.log(user);
      if (err) {
        console.log(err);
      }
    },
  );
};

export const onSignOut = () => {
  AsyncStorage.multiRemove([USER_KEY, 'user'], err => {
    if (err) {
      console.log(err);
    }
  });
};

export const isSignedIn = () =>
  new Promise((resolve, reject) => {
    AsyncStorage.getItem('user')
      .then(res => {
        if (res !== null) {
          console.log(res);
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
