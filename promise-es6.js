'use strict';

let psuccess = new Promise((resolve, reject) => {
  resolve('OK');
});

let pfailure = new Promise((resolve, reject) => {
  reject('KO');
});

/**
 * successfull promise
 */
// p -> then
// p -> catch
psuccess.then(value => console.log('1a - success, value=', value)); // 1a - success, value= OK
psuccess.catch(reason => console.log('1b - failure, reason=', reason)); // nothing
// p -> then -> catch
psuccess.then(value => console.log('1c - success, value=', value)).catch(reason => console.log('1d - failure, reason=', reason)); // 1c - success, value= OK

/**
 * failed promise
 */
// p -> then
// p -> catch
pfailure.then(value => console.log('2a - success, value=', value)); // UnhandledPromiseRejectionWarning: Unhandled promise rejection
pfailure.catch(reason => console.log('2b - failure, reason=', reason)); // 2b - failure, reason= KO
// p -> then -> catch
pfailure.then(value => console.log('2c - success, value=', value)).catch(reason => console.log('2d - failure, reason=', reason)); // 2d - failure, reason= KO

/**
 * Note sur le chainage "simple" : p -> then -> catch
 */
//le catch recupere la premiere erreur (promise failed => on passe direct au catch, on ne passe pas par le then)
psuccess.then(value => { console.log('3a'); throw 'error'; }) // 3a
.catch(reason => console.log('3a - failure, reason=', reason)); // 3a - failure, reason= error

pfailure.then(value => { console.log('3b'); throw 'error'; }) // nothing (on passe direcr dans le catch)
.catch(reason => console.log('3b - failure, reason=', reason)); // 3b - failure, reason= KO

/**
 * Note sur le double catch
 */
// Le deuxieme catch n'est appele que si le premier relance une erreur
psuccess.then(value => { console.log('4a'); throw 'error4a'; }) // 4a
.catch(reason => { console.log('4b,', reason); throw 'error4b';}) // 4b, error4a
.catch(reason => { console.log('4c,', reason); }); // 4c, error4b

psuccess.then(value => { console.log('5a'); throw 'error5a'; }) // 5 a
.catch(reason => { console.log('5b,', reason); }) // 5b, error5a
.catch(reason => { console.log('5c,', reason); }); // nothing

/**
 * Note sur le chainage de plusieurs then : des la premiere erreur, on passe au premier catch
 */
 psuccess.then(value => { console.log('6a'); throw 'error6a'; }) // 6a
.then(value => { console.log('6b'); throw 'error6b'; }) // nothing
.then(value => { console.log('6c'); throw 'error6c'; }) // nothing
.catch(reason => { console.log('6d,', reason); }) // 6d, error6a
.catch(reason => { console.log('6e,', reason); }); //nothing

 psuccess.then(value => { console.log('7a'); }) // 7a
.then(value => { console.log('7b'); throw 'error7b'; }) // 7b
.then(value => { console.log('7c'); throw 'error7c'; }) // nothing
.catch(reason => { console.log('7d,', reason); }); // 7d, error7b

/*
 * Notes diverses
 */
// You can save a reference to any point in the promise chain.
// Each call to .then or .catch on the promise also creates a promise internally, and those promises depend on their parent when it comes to deciding whether the fulfillment branch or the rejection branch should be executed.
